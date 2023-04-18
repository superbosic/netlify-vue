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

export class Fundraising<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description <br /><br /> <b>Authentication:</b> required
   *
   * @tags fundraising
   * @name AvailableUnlockSchemesList
   * @request GET:/fundraising/available_unlock_schemes
   * @secure
   */
  availableUnlockSchemesList = (params: RequestParams = {}) =>
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
          tokentable_id?: number;
          round?: string;
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
      },
      void
    >({
      path: `/fundraising/available_unlock_schemes`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description <br /><br /> <b>Authentication:</b> required
   *
   * @tags fundraising
   * @name RoundDelete
   * @request DELETE:/fundraising/round
   * @secure
   */
  roundDelete = (
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
      path: `/fundraising/round`,
      method: "DELETE",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description <br /><br /> <b>Authentication:</b> required
   *
   * @tags fundraising
   * @name RoundList
   * @request GET:/fundraising/round
   * @secure
   */
  roundList = (
    query: {
      /** @format int64 */
      id: number;
    },
    params: RequestParams = {},
  ) =>
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
          /** @format int64 */
          project_id: number;
          name: string;
          status: "draft" | "ongoing" | "completed";
          token_percentage: number;
          /** @format int64 */
          token_amount: number;
          token_price_usd: number;
          /** @format int64 */
          raise_usd: number;
          unlock_scheme: {
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
          investors: {
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
          }[];
        };
      },
      void
    >({
      path: `/fundraising/round`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description <br /><br /> <b>Authentication:</b> required
   *
   * @tags fundraising
   * @name RoundCreate
   * @request POST:/fundraising/round
   * @secure
   */
  roundCreate = (
    data: {
      name: string;
      token_percentage: number;
      token_price_usd: number;
      /** @format int64 */
      allocation_id: number;
    },
    params: RequestParams = {},
  ) =>
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
          /** @format int64 */
          project_id: number;
          name: string;
          status: "draft" | "ongoing" | "completed";
          token_percentage: number;
          /** @format int64 */
          token_amount: number;
          token_price_usd: number;
          /** @format int64 */
          raise_usd: number;
        };
      },
      void
    >({
      path: `/fundraising/round`,
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
          /**
           * @format timestamptz
           * @default "now"
           */
          created_at: number;
          name: string;
          /** @format int64 */
          tokentable: number;
          /** @format int64 */
          max_token_supply: number;
          token_ticker: string;
          token_network: "polygon" | "ethereum" | "fantom" | "binance_smart_chain" | "avalanche";
          fundraising_rounds: {
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
                /** @format int64 */
                id: number;
                /**
                 * @format timestamptz
                 * @default "now"
                 */
                created_at?: number;
                name: string;
                /** @format email */
                email: string | null;
                /** @format int64 */
                project_id?: number;
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
