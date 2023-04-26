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

export class Link<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Creates a Signing Link for a specific document.
   *
   * @tags Signing Link
   * @name CreateSigningLink
   * @summary Create signing link
   * @request POST:/link
   */
  createSigningLink = (
    data: {
      /** @example "{{document_id}}" */
      document_id?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/link`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
}
