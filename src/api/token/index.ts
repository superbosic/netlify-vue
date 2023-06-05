import ky, { Options } from 'ky';
import { LocalStorage } from 'quasar';
import { HttpClient } from '@/api/token/http-client';
import { HttpClient as SingNowHttpClient } from '@/api/singNow/http-client';
import { useAccountStore } from '@/store/account';

let httpClient: typeof ky | null = null;

export const BearerTokenKey = 'SIGNNOW_BEARER_TOKEN';

const httpSignNowClient = ky.extend({
  retry: 1,
  timeout: 60000,
  hooks: {
    beforeRequest: [
      (req) => {
        if (!req.headers.has('Authorization')) {
          req.headers.set('Authorization', `Bearer ${LocalStorage.getItem(BearerTokenKey)}`);
        }
      },
    ],
    afterResponse: [
      async (req, opt, res) => {
        if (!res.ok) {
          const { error } = await res.json();

          if (error === 'invalid_token') {
            LocalStorage.remove(BearerTokenKey);
          }
        }
      },
    ],
  },
});

export function init(defaultOptions: Options) {
  httpClient = ky.extend(defaultOptions);
}

export const TykAuthorization = 'eyJvcmciOiI2NDFkZjRmZTEyNjQ5ZTAwMDFkMmVmZjIiLCJpZCI6IjIzZmEzNjIwMjA0YzRmNTU4MjI5MzcyZjI5NTM2NmM2IiwiaCI6Im11cm11cjEyOCJ9';

export function createApiInstance<C extends typeof HttpClient>(ApiConstructor: C): C['prototype'] {
  const { getToken } = useAccountStore();
  // const baseUrl = process.env.NODE_ENV === 'development' ? document.location.origin : import.meta.env.VITE_API_PATH;
  const baseUrl = document.location.origin;

  return new ApiConstructor({
    customFetch: httpClient!,
    baseUrl: `${baseUrl}/api`,
    baseApiParams: {
      headers: {
        'Tyk-Authorization': TykAuthorization,
        Authorization: `Bearer ${getToken()}`,
      },
    },
  });
}
export function createSignNowApiInstance<C extends typeof SingNowHttpClient>(ApiConstructor: C): C['prototype'] {
  return new ApiConstructor({
    customFetch: httpSignNowClient!,
    baseUrl: `${document.location.origin}/signnow`,
    baseApiParams: {
      headers: {
        'Tyk-Authorization': TykAuthorization,
      },
    },
  });
}

export function getHttpClient() {
  return httpClient!;
}
