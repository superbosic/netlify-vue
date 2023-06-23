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

export class User<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Get the user record belonging to the authentication token <br /><br /> <b>Authentication:</b> required
   *
   * @tags user
   * @name UserList
   * @summary Get the user record belonging to the authentication token
   * @request GET:/user
   * @secure
   */
  userList = (params: RequestParams = {}) =>
    this.request<object, void>({
      path: `/user`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Get the user record belonging to the authentication token <br /><br /> <b>Authentication:</b> required
   *
   * @tags user
   * @name UserCreate
   * @summary Get the user record belonging to the authentication token
   * @request POST:/user
   * @secure
   */
  userCreate = (
    data: {
      name?: string | null;
      email?: string | null;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        data?: {
          /** @format int64 */
          id?: number;
          /**
           * @format timestamptz
           * @default "now"
           */
          created_at?: number;
          name?: string;
          Web3AuthWalletChain?: string;
          Web3AuthWalletAddress?: string;
          Web3AuthId?: string;
          /** @format email */
          email?: string | null;
          /** @format password */
          password?: string | null;
          /** @format int64 */
          project_id?: number;
        };
      },
      void
    >({
      path: `/user`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
