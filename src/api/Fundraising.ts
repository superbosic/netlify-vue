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

export class Fundraising<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> required
   *
   * @tags fundraising
   * @name FundraisingList
   * @request GET:/fundraising
   * @secure
   */
  fundraisingList = (params: RequestParams = {}) =>
    this.request<
      {
        data: {
          /** @format int64 */
          id: number;
          name: string;
          tokentable: {
            /** @format int64 */
            max_token_supply: number;
          } | null;
          fundraising_rounds: {
            /** @format int64 */
            id: number;
            /**
             * @format timestamptz
             * @default "now"
             */
            created_at?: number;
            name: string;
            status: "draft" | "ongoing" | "completed";
            token_percentage: number;
            /** @format int64 */
            token_amount: number;
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
            investors?: {
              /** @format int64 */
              id: number;
              /**
               * @format timestamptz
               * @default "now"
               */
              created_at?: number;
              /** @format int64 */
              fundraising_round_id?: number;
              /** @format int64 */
              investor_id?: number;
              wallet_address: string;
              /** @format int64 */
              investment_allocation: number;
              profile?: {
                name: string;
                /** @format email */
                email: string | null;
              };
            }[];
          }[];
        };
      },
      void
    >({
      path: `/fundraising`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
}
