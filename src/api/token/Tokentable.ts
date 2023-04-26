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
   * @name TokenAllocationUnlockSchemeDelete
   * @request DELETE:/tokentable/token_allocation/unlock_scheme
   * @secure
   */
  tokenAllocationUnlockSchemeDelete = (
    query: {
      /** @format int64 */
      tokentable_allocation_id: number;
      /** @format int64 */
      id: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        data: string;
      },
      void
    >({
      path: `/tokentable/token_allocation/unlock_scheme`,
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
   * @name TokenAllocationUnlockSchemeCreate
   * @request POST:/tokentable/token_allocation/unlock_scheme
   * @secure
   */
  tokenAllocationUnlockSchemeCreate = (
    data: {
      /** @format int64 */
      tokentable_allocation_id: number;
      /** @format int64 */
      id?: number;
      type: string;
      /** @format int64 */
      month_after_tge: number;
      percent?: number;
      /** @format int64 */
      vesting_months?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        data: string;
      },
      void
    >({
      path: `/tokentable/token_allocation/unlock_scheme`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
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
        data: string;
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
            token_allocation?: {
              /** @format int64 */
              id: number;
              /**
               * @format timestamptz
               * @default "now"
               */
              created_at?: number;
              /** @format int64 */
              tokentable_id?: number;
              round: string;
              token_percent: number;
              price_usd?: number;
              /** @format int64 */
              tge_percent: number;
              /** @format int64 */
              token_amount?: number;
              /** @format int64 */
              tge_amount?: number;
              /** @format int64 */
              post_tge_amount?: number;
              /** @format int64 */
              raise_usd?: number;
              /** @format int64 */
              fdv_usd?: number;
              unlock_scheme?: {
                /** @format int64 */
                id: number;
                /**
                 * @format timestamptz
                 * @default "now"
                 */
                created_at?: number;
                /** @format int64 */
                tokentable_allocation_id: number;
                type: "onetime" | "liner";
                /** @format int64 */
                month_after_tge: number;
                percent?: number;
                /** @format int64 */
                vesting_months?: number;
              }[];
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
      round: string;
      price_usd?: number;
      /** @format int64 */
      tge_percent?: number;
      /** @format int64 */
      id?: number;
      token_percent: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        data: string;
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
