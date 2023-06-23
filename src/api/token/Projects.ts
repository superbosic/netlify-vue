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

import { HttpClient, RequestParams } from "./http-client";

export class Projects<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> required
   *
   * @tags projects
   * @name ProjectsList
   * @request GET:/projects
   * @secure
   */
  projectsList = (
    query: {
      /** @format int64 */
      curPage: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        data?: {
          /** @format int64 */
          itemsReceived?: number;
          /** @format int64 */
          curPage?: number;
          /** @format int64 */
          nextPage?: number | null;
          /** @format int64 */
          prevPage?: number | null;
          /** @format int64 */
          offset?: number;
          /** @format int64 */
          itemsTotal?: number;
          /** @format int64 */
          pageTotal?: number;
          items?: {
            /** @format int64 */
            id?: number;
            /**
             * @format timestamptz
             * @default "now"
             */
            created_at?: number;
            /** @format int64 */
            tokentable?: number;
            icon?: string;
            name?: string;
            token_network?: "polygon" | "ethereum" | "fantom" | "binance_smart_chain" | "avalanche";
            token_ticker?: string;
            /** @format int64 */
            max_token_supply?: number;
            /** @format int64 */
            current_market_price_usd?: number;
          }[];
        };
      },
      void
    >({
      path: `/projects`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
}
