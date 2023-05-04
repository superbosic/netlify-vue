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

export class Portfolio<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> required
   *
   * @tags portfolio
   * @name PortfolioList
   * @request GET:/portfolio
   * @secure
   */
  portfolioList = (params: RequestParams = {}) =>
    this.request<
      {
        data: {
          /** @format int64 */
          id?: number;
          /**
           * @format timestamptz
           * @default "now"
           */
          created_at?: number;
          /** @format int64 */
          fundraising_round_id?: number;
          /** @format int64 */
          investor_id?: number;
          email?: string;
          wallet_address?: string;
          /** @format int64 */
          investment_allocation?: number;
          state?: "pending" | "signed";
          fundraising_round?: {
            /** @format int64 */
            id: number;
            /**
             * @format timestamptz
             * @default "now"
             */
            created_at?: number;
            /** @format int64 */
            project_id?: number;
            name: string;
            status: "draft" | "ongoing" | "completed";
            token_percentage: number;
            /** @format int64 */
            token_amount: number;
            token_price_usd: number;
            /** @format int64 */
            raise_usd: number;
            signnow_documet_id?: string;
            project?: {
              /** @format int64 */
              id: number;
              /**
               * @format timestamptz
               * @default "now"
               */
              created_at?: number;
              name: string;
              /** @format int64 */
              tokentable?: number;
              /** @format int64 */
              max_token_supply: number;
              token_ticker: string;
              token_network: "polygon" | "ethereum" | "fantom" | "binance_smart_chain" | "avalanche";
            } | null;
            unlock_scheme?: {
              /** @format int64 */
              id: number;
              /**
               * @format timestamptz
               * @default "now"
               */
              created_at?: number;
              /** @format int64 */
              fundraising_round_id: number;
              type: "onetime" | "liner";
              /** @format int64 */
              month_after_tge: number;
              percent?: number;
              /** @format int64 */
              vesting_months?: number;
            }[];
          };
        }[];
      },
      void
    >({
      path: `/portfolio`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
}
