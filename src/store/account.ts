import { ref } from 'vue';
import { useQuasar } from 'quasar';

export interface IUser {
    name: string;
    lastname: string;
}

const APP_TOKEN_KEY = 'APP_TOKEN_KEY';

const user = ref<IUser | null>(null);
const token = ref<string | null>(null);

export function useAccountStore() {
  const { localStorage } = useQuasar();

  function setUser(value: IUser) {
    user.value = value;
  }

  function getToken() {
    return token.value ?? localStorage.getItem<string>(APP_TOKEN_KEY);
  }

  function setToken(value: string) {
    token.value = value;
    localStorage.set(APP_TOKEN_KEY, value);
  }

  return {
    setUser,
    getToken,
    setToken,
    user,
  };
}
