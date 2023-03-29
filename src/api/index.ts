import ky, { Options } from 'ky';
import { HttpClient } from '@/api/http-client';
import { useAccountStore } from '@/store/account';

let httpClient: typeof ky | null = null;

export function init(defaultOptions: Options) {
  httpClient = ky.extend(defaultOptions);
}

export function createApiInstance<C extends typeof HttpClient>(ApiConstructor: C): C['prototype'] {
  const { getToken } = useAccountStore();
  const baseUrl = process.env.NODE_ENV === 'development' ? document.location.origin : import.meta.env.VITE_API_PATH;

  return new ApiConstructor({
    customFetch: httpClient!,
    baseUrl: `${baseUrl}/api`,
    baseApiParams: {
      headers: {
        'Tyk-Authorization': 'eyJvcmciOiI2NDFkZjRmZTEyNjQ5ZTAwMDFkMmVmZjIiLCJpZCI6IjcyMTM5ZWRkOTE1YTQwYTI5MjY1NDNmOWU5M2Y1ODZiIiwiaCI6Im11cm11cjEyOCJ9',
        Authorization: `Bearer ${getToken()}`,
      },
    },
  });
}
