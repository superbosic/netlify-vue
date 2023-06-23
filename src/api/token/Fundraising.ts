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
        data?: {
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
          price_usd?: number;
          /** @format int64 */
          tge_percent?: number;
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
            id?: number;
            /**
             * @format timestamptz
             * @default "now"
             */
            created_at?: number;
            /** @format int64 */
            tokentable_allocation_id?: number;
            type?: "onetime" | "liner";
            /** @format int64 */
            month_after_tge?: number;
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
   * @name RoundDocumentCreate
   * @request POST:/fundraising/round/document
   * @secure
   */
  roundDocumentCreate = (
    data: {
      /** @format int64 */
      id: number;
      signnow_document_id: string;
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
          /** @format int64 */
          project_id?: number;
          name?: string;
          status?: "draft" | "ongoing" | "completed";
          token_percentage?: number;
          /** @format int64 */
          token_amount?: number;
          token_price_usd?: number;
          /** @format int64 */
          raise_usd?: number;
          signnow_documet_id?: string;
        };
      },
      void
    >({
      path: `/fundraising/round/document`,
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
   * @name RoundInvestorCreate
   * @request POST:/fundraising/round/investor
   * @secure
   */
  roundInvestorCreate = (
    data: {
      /** @format int64 */
      id: number;
      email: string;
      /** @format int64 */
      investment_allocation: number;
      wallet_address: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        data?: string;
      },
      void
    >({
      path: `/fundraising/round/investor`,
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
   * @name RoundDelete
   * @request DELETE:/fundraising/round
   * @secure
   */
  roundDelete = (
    data: {
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
      path: `/fundraising/round`,
      method: "DELETE",
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
        data?: {
          /** @format int64 */
          id?: number;
          /**
           * @format timestamptz
           * @default "now"
           */
          created_at?: number;
          /** @format int64 */
          project_id?: number;
          name?: string;
          status?: "draft" | "ongoing" | "completed";
          token_percentage?: number;
          /** @format int64 */
          token_amount?: number;
          token_price_usd?: number;
          /** @format int64 */
          raise_usd?: number;
          signnow_documet_id?: string;
          unlock_scheme?: {
            /** @format int64 */
            id?: number;
            /**
             * @format timestamptz
             * @default "now"
             */
            created_at?: number;
            /** @format int64 */
            fundraising_round_id?: number;
            type?: "onetime" | "liner";
            /** @format int64 */
            month_after_tge?: number;
            percent?: number;
            /** @format int64 */
            vesting_months?: number;
          }[];
          investors?: {
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
        data?: {
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
          fundraising_rounds?: {
            /** @format int64 */
            id?: number;
            /**
             * @format timestamptz
             * @default "now"
             */
            created_at?: number;
            /** @format int64 */
            project_id?: number;
            name?: string;
            status?: "draft" | "ongoing" | "completed";
            token_percentage?: number;
            /** @format int64 */
            token_amount?: number;
            token_price_usd?: number;
            /** @format int64 */
            raise_usd?: number;
            signnow_documet_id?: string;
            unlock_scheme?: {
              /** @format int64 */
              id?: number;
              /**
               * @format timestamptz
               * @default "now"
               */
              created_at?: number;
              /** @format int64 */
              fundraising_round_id?: number;
              type?: "onetime" | "liner";
              /** @format int64 */
              month_after_tge?: number;
              percent?: number;
              /** @format int64 */
              vesting_months?: number;
            }[];
            investors?: {
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
              profile?: {
                /** @format int64 */
                id?: number;
                /**
                 * @format timestamptz
                 * @default "now"
                 */
                created_at?: number;
                name?: string;
                /** @format email */
                email?: string | null;
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
