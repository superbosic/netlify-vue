/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Oauth2<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Verify an access token for a user
   *
   * @tags Oauth2
   * @name VerifyAccessToken
   * @summary Verify access token
   * @request GET:/oauth2/token
   */
  verifyAccessToken = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/oauth2/token`,
      method: "GET",
      ...params,
    });
  /**
   * @description Returns an `access_token`, its' type, scope, expiration time, and `refresh_token` for a user By deafult token expires in 30 days Check out other supported grant types [here](https://docs.signnow.com/authentication).
   *
   * @tags Oauth2
   * @name GenerateAccessToken
   * @summary Generate access token
   * @request POST:/oauth2/token
   */
  generateAccessToken = (
    data: {
      /** @example "" */
      expiration_time?: string;
      /** @example "password" */
      grant_type?: string;
      /** @example "{{password}}" */
      password?: string;
      /** @example "*" */
      scope?: string;
      /** @example "{{user}}" */
      username?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/oauth2/token`,
      method: "POST",
      body: data,
      type: ContentType.FormData,
      ...params,
    });
}
