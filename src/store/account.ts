import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { Auth } from '@/api/Auth';
import { ExtractHttpResponseType } from '@/types/http';

// export type IUser = ExtractHttpResponseType<ReturnType<Auth['getAuth']>>;
export interface IUser {
  id: number
  name: string
  email: string
  created_at: string
  project_id: number
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
    return token.value ?? localStorage.getItem<string>(APP_TOKEN_KEY) ?? '';
  }

  function setToken(value: string) {
    token.value = value;
    localStorage.set(APP_TOKEN_KEY, value);
  }

  function logout() {
    localStorage.remove(APP_TOKEN_KEY);
    user.value = null;
    token.value = null;
  }

  return {
    setUser,
    getToken,
    setToken,
    logout,
    user,
  };
}
