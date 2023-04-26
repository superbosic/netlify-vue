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

export class Documents<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description 8. Delete Documents
   *
   * @tags 03 Bulk Invite
   * @name DeleteDocuments
   * @summary 8. Delete Documents
   * @request DELETE:/documents
   */
  deleteDocuments = (
    data: {
      /** @example "{{document_id}}" */
      unique_id?: string;
    }[],
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/documents`,
      method: "DELETE",
      body: data,
      type: ContentType.Json,
      ...params,
    });
}
