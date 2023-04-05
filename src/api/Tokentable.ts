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

export class Tokentable<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> required
   *
   * @tags tokentable
   * @name ProjectInformationList
   * @request GET:/tokentable/project_information
   * @secure
   */
  projectInformationList = (params: RequestParams = {}) =>
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
          tokentable?: {
            /**
             * @format timestamptz
             * @default "now"
             */
            created_at?: number;
            /** @format int64 */
            max_token_supply?: number;
            /** @format int64 */
            vesting_period?: number;
          } | null;
        };
      },
      void
    >({
      path: `/tokentable/project_information`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description <br /><br /> <b>Authentication:</b> required
   *
   * @tags tokentable
   * @name TokenAllocationDelete
   * @request DELETE:/tokentable/token_allocation
   * @secure
   */
  tokenAllocationDelete = (
    query: {
      /** @format int64 */
      id: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        data?: string;
      },
      void
    >({
      path: `/tokentable/token_allocation`,
      method: "DELETE",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description <br /><br /> <b>Authentication:</b> required
   *
   * @tags tokentable
   * @name TokenAllocationList
   * @request GET:/tokentable/token_allocation
   * @secure
   */
  tokenAllocationList = (params: RequestParams = {}) =>
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
          tokentable?: {
            /**
             * @format timestamptz
             * @default "now"
             */
            created_at?: number;
            /** @format int64 */
            max_token_supply?: number;
            /** @format int64 */
            vesting_period?: number;
            token_allocation?: {
              /** @format int64 */
              id?: number;
              round?: string;
              /** @format int64 */
              token_percent?: number;
              /** @format int64 */
              token_amount?: number;
              price_usd?: number;
              /** @format int64 */
              raise_usd?: number;
              /** @format int64 */
              fdv_usd?: number;
              /** @format int64 */
              tge_percent?: number;
              /** @format int64 */
              tge_amount?: number;
              /** @format int64 */
              post_tge_percent?: number;
              /** @format int64 */
              post_tge_amount?: number;
              /** @format int64 */
              cliff_months?: number;
              /** @format int64 */
              vesting_months?: number;
            }[];
          } | null;
        };
      },
      void
    >({
      path: `/tokentable/token_allocation`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description <br /><br /> <b>Authentication:</b> required
   *
   * @tags tokentable
   * @name TokenAllocationCreate
   * @request POST:/tokentable/token_allocation
   * @secure
   */
  tokenAllocationCreate = (
    data: {
      round?: string;
      /** @format int64 */
      token_percent?: number;
      price_usd?: number;
      /** @format int64 */
      tge_percent?: number;
      /** @format int64 */
      cliff_months?: number;
      /** @format int64 */
      vesting_months?: number;
      /** @format int64 */
      id?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        data?: string;
      },
      void
    >({
      path: `/tokentable/token_allocation`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
