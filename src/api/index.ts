import ky, { Options } from 'ky';
import { HttpClient } from '@/api/http-client';
import { useAccountStore } from '@/store/account';

let httpClient: typeof ky | null = null;

export function init(defaultOptions: Options) {
  httpClient = ky.extend(defaultOptions);
}

export const TykAuthorization = 'eyJvcmciOiI2NDFkZjRmZTEyNjQ5ZTAwMDFkMmVmZjIiLCJpZCI6IjIzZmEzNjIwMjA0YzRmNTU4MjI5MzcyZjI5NTM2NmM2IiwiaCI6Im11cm11cjEyOCJ9';

export function createApiInstance<C extends typeof HttpClient>(ApiConstructor: C): C['prototype'] {
  const { getToken } = useAccountStore();
  const baseUrl = process.env.NODE_ENV === 'development' ? document.location.origin : import.meta.env.VITE_API_PATH;

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

export function getHttpClient() {
  return httpClient!;
}
