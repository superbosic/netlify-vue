import { AfterResponseHook } from 'ky/distribution/types/hooks';
import router from '@/router';
import { RouteNames } from '@/router/routeNames';
import { HttpError } from '@/types/error';

export const noneAuthorizeHook: AfterResponseHook = (request, options, response) => {
  if (
    (response.status === 401)
    && router.currentRoute.value.name !== RouteNames.AccountLogin
  ) {
    router.replace({
      name: RouteNames.AccountLogin,
      query: { redirect: router.currentRoute.value.fullPath },
    });
  }
};

export const createHttpErrorHook: AfterResponseHook = async (request, options, response) => {
  if (!response.ok) {
    const errorObj = await response.json();

    throw new HttpError(errorObj.message, response.status);
  }
};
