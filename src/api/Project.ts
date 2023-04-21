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

export class Project<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> required
   *
   * @tags project
   * @name ProjectDelete
   * @request DELETE:/project
   * @secure
   */
  projectDelete = (params: RequestParams = {}) =>
    this.request<
      {
        data: {
          /** @format int64 */
          id: number;
          /**
           * @format timestamptz
           * @default "now"
           */
          created_at: number;
          name: string;
          /** @format email */
          email: string | null;
          /** @format password */
          password: string | null;
          /** @format int64 */
          project_id: number;
        };
      },
      void
    >({
      path: `/project`,
      method: "DELETE",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description <br /><br /> <b>Authentication:</b> required
   *
   * @tags project
   * @name ProjectList
   * @request GET:/project
   * @secure
   */
  projectList = (params: RequestParams = {}) =>
    this.request<
      {
        data: {
          /** @format int64 */
          id: number;
          /**
           * @format timestamptz
           * @default "now"
           */
          created_at: number;
          name: string;
          /** @format int64 */
          max_token_supply: number;
          token_ticker: string;
          token_network: "polygon" | "ethereum" | "fantom" | "binance_smart_chain" | "avalanche";
          tokentable: {
            /** @format int64 */
            id: number;
            /**
             * @format timestamptz
             * @default "now"
             */
            created_at?: number;
          } | null;
        };
      },
      void
    >({
      path: `/project`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description <br /><br /> <b>Authentication:</b> required
   *
   * @tags project
   * @name ProjectCreate
   * @request POST:/project
   * @secure
   */
  projectCreate = (
    data: {
      name: string;
      /** @format int64 */
      max_token_supply: number;
      token_ticker: string;
      token_network: "polygon" | "ethereum" | "fantom" | "binance_smart_chain" | "avalanche";
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        data: string;
      },
      void
    >({
      path: `/project`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
