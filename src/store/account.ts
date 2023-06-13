import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { Web3Auth } from '@web3auth/modal';
import type { Web3AuthOptions } from '@web3auth/modal';
import { UserInfo } from '@web3auth/base';
import { Auth } from '@/api/token/Auth';
import { createApiInstance } from '@/api/token';
import { APP_TOKEN_KEY } from '@/constants';

export interface IUser {
  id: number
  name: string
  email: string
  created_at: string
  project_id: number
}

const web3AuthOptions:Web3AuthOptions = {
  clientId: import.meta.env.VITE_WEB3OAUTH_CLIENT_ID, // Get your Client ID from Web3Auth Dashboard
  chainConfig: {
    chainNamespace: 'eip155',
    chainId: '0x1',
  },
};

const user = ref<IUser | null>(null);
const userInfo = ref<Partial<UserInfo> | null>(null);
const token = ref<string | null>(null);

export function useAccountStore() {
  const { localStorage } = useQuasar();
  const authApi = createApiInstance(Auth);

  function setUser(value: IUser) {
    user.value = value;
  }

  function getToken() {
    return token.value ?? localStorage.getItem<string>(APP_TOKEN_KEY) ?? '';
  }

  function setToken(value: string) {
    token.value = value;
    localStorage.set(APP_TOKEN_KEY, value);
  }

  async function logout() {
    const web3auth = new Web3Auth(web3AuthOptions);

    await web3auth.initModal();
    await web3auth.connect();
    await web3auth.logout();

    localStorage.remove(APP_TOKEN_KEY);
    user.value = null;
    token.value = null;
  }

  async function login() {
    const web3auth = new Web3Auth(web3AuthOptions);

    await web3auth.initModal();
    const c = await web3auth.connect();

    userInfo.value = await web3auth.getUserInfo();
    let { idToken } = userInfo.value;

    if (!idToken) {
      const authUser = await web3auth.authenticateUser();

      idToken = authUser.idToken;
    }

    return authApi.web3LoginCreate({
      JWT: idToken,
      Method: web3auth.connectedAdapterName!,
    }).then((data) => data.data).then(({ authToken }) => setToken(authToken!));
  }

  return {
    setUser,
    getToken,
    logout,
    login,
    user,
    userInfo,
  };
}
