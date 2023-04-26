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

export class Template<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Creates a template by flattening an existing document.
   *
   * @tags Template
   * @name CreateTemplate
   * @summary Create template
   * @request POST:/template
   */
  createTemplate = (
    data: {
      /** @example "{{document_id}}" */
      document_id?: string;
      /** @example "" */
      document_name?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/template`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Creates a new document copy out of template. If a name is not supplied than it will default to the original template name.
   *
   * @tags Template
   * @name GetDocumentOutOfTemplate
   * @summary Get document out of template
   * @request POST:/template/{template_id}/copy
   */
  getDocumentOutOfTemplate = (templateId: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/template/${templateId}/copy`,
      method: "POST",
      ...params,
    });
  /**
   * @description 3. Make Template
   *
   * @tags 03 Bulk Invite
   * @name MakeTemplate
   * @summary 3. Make Template
   * @request POST:/template/
   */
  makeTemplate = (
    data: {
      /** @example "{{document_id}}" */
      document_id?: string;
      /** @example "bulkInvite" */
      document_name?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/template/`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 7. Send bulk invite for three signers
   *
   * @tags 03 Bulk Invite
   * @name SendBulkInviteForThreeSigners
   * @summary 7. Send bulk invite for three signers
   * @request POST:/template/{template_id}/bulkinvite
   */
  sendBulkInviteForThreeSigners = (
    templateId: string,
    data: {
      /** @example "{{$timestamp}}" */
      client_timestamp?: string;
      /** @example "3 signers" */
      document_name?: string;
      /** @example "Bulk invite message 3 signers" */
      email_message?: string;
      /** @format binary */
      file?: File;
      /** @example "5e59dfb292d9655122a0f6087b26ea9b1af3f752" */
      folder_id?: string;
      /** @example "Bulk Invite subject 3 signers" */
      subject?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/template/${templateId}/bulkinvite`,
      method: "POST",
      body: data,
      type: ContentType.FormData,
      ...params,
    });
}
