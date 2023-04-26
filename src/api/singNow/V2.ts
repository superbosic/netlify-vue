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

export class V2<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description 11. Deactivate signing link
   *
   * @tags 02 Signing Link
   * @name DeactivateSigningLink
   * @summary 11. Deactivate signing link
   * @request PUT:/v2/application/signing-links
   */
  deactivateSigningLink = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/v2/application/signing-links`,
      method: "PUT",
      ...params,
    });
}
