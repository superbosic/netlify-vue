import { LocalStorage } from 'quasar';
import { getHttpClient, TykAuthorization } from '@/api/index';

const httpClient = getHttpClient();
const BasicToken = 'ZDVlMTkzMzZmYmM0ZmY4YzgxY2UyZWMyOTczZTM4YTU6MDZkNTQ5M2IxNDI4ZDk5MTQyY2EzM2FhYmZlOTA1NjY=';

export interface ISignNowGenerateAccessTokenParams {
    username: string
    password: string
    grant_type: 'password' | 'refresh_token' | 'authorization_code'
    scope?: string
    /** the amount of time till the token expires in seconds; the expiration_time parameter must be greater than 0. */
    expiration_time?: string
    /** required if 'grant_type: refresh_token' */
    refresh_token?: string
    /** required if 'grant_type: authorization_code' */
    code?: string
}

const username = 'bagfaq.innocode@gmail.com';
const password = 'w52S5nPHSJciEP4#';

export const BearerTokenKey = 'BearerToken';

function getBasicToken() {
  return `Bearer ${LocalStorage.getItem(BearerTokenKey)}`;
}

export async function generateAccessToken(params: ISignNowGenerateAccessTokenParams = {
  username,
  password,
  grant_type: 'password',
}) {
  const body = new FormData();

  Object.keys(params).forEach((key) => body.append(key, params[key as keyof ISignNowGenerateAccessTokenParams]!));

  const { access_token } = await httpClient.post('signnow/oauth2/token', {
    body,
    headers: {
      Accept: 'application/json,',
      'Tyk-Authorization': TykAuthorization,
      Authorization: `Basic ${BasicToken}`,
    },
    redirect: 'follow',
  })
    .then((result) => result.json() as any)
    .catch((error) => console.error('error', error));

  console.log(access_token);

  LocalStorage.set(BearerTokenKey, access_token);
}

export function uploadDocument(file: Blob) {
  const body = new FormData();

  body.append('file', file);

  return httpClient.post('signnow/document', {
    body,
    headers: {
      Accept: 'application/json,',
      'Tyk-Authorization': TykAuthorization,
      Authorization: getBasicToken(),
    },
    redirect: 'follow',
  })
    .then((result) => result.json())
    .catch((error) => console.error('error', error));
}
