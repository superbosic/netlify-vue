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

export class Auth<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Login and retrieve an authentication token <br /><br /> <b>Authentication:</b> not required
   *
   * @tags auth
   * @name LoginCreate
   * @summary Login and retrieve an authentication token
   * @request POST:/auth/login
   */
  loginCreate = (
    data: {
      /**
       * email
       * @format email
       */
      email?: string;
      /** password */
      password?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        authToken?: string;
      },
      void
    >({
      path: `/auth/login`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Get the user record belonging to the authentication token <br /><br /> <b>Authentication:</b> required
   *
   * @tags auth
   * @name GetAuth
   * @summary Get the user record belonging to the authentication token
   * @request GET:/auth/me
   * @secure
   */
  getAuth = (params: RequestParams = {}) =>
    this.request<object, void>({
      path: `/auth/me`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Login and retrieve an authentication token <br /><br /> <b>Authentication:</b> not required
   *
   * @tags auth
   * @name Web3LoginCreate
   * @summary Login and retrieve an authentication token
   * @request POST:/auth/web3login
   */
  web3LoginCreate = (
    data: {
      JWT: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        authToken?: string;
      },
      void
    >({
      path: `/auth/web3login`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
