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
            _token_allocation?: {
              /** @format int64 */
              id?: number;
              /**
               * @format timestamptz
               * @default "now"
               */
              created_at?: number;
              /** @format int64 */
              tokentable_id?: number;
              round?: string;
              /** @format int64 */
              token_percent?: number;
              /** @format int64 */
              token_amount?: number;
              price_usd?: number;
              /** @format int64 */
              raise_usd?: number;
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
}
