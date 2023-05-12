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
  /**
   * @description {{url}}/v2/documents/{document_id}/embedded-editor
   *
   * @tags Documents
   * @name UrlV2DocumentsDocumentIdEmbeddedEditor
   * @summary {{url}}/v2/documents/{document_id}/embedded-editor
   * @request POST:/v2/documents/{document_id}/embedded-editor
   */
  urlV2DocumentsDocumentIdEmbeddedEditor = (
    documentId: string,
    data: {
      /** @example 15 */
      link_expiration?: number;
      /** @example "https://ya.ru" */
      redirect_uri?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/v2/documents/${documentId}/embedded-editor`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description {{url}}/v2/documents/{document_id}/embedded-invites
   *
   * @tags Documents
   * @name UrlV2DocumentsDocumentIdEmbeddedEditor2
   * @summary {{url}}/v2/documents/{document_id}/embedded-invites
   * @request POST:/v2/documents/{document_id}/embedded-invites
   * @originalName urlV2DocumentsDocumentIdEmbeddedEditor
   * @duplicate
   */
  urlV2DocumentsDocumentIdEmbeddedEditor2 = (
    documentId: string,
    data: {
      /** @example "any_text_prefix|document_field1|document_field2|document_field3|document_field4|document_field5" */
      name_formula?: string;
      invites?: any[];
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/v2/documents/${documentId}/embedded-invites`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description {{url}}/v2/documents/{document_id}/embedded-invites/{field_invite_id}/link/
   *
   * @tags Documents
   * @name UrlV2DocumentsDocumentIdEmbeddedInvitesFieldInviteIdLink
   * @summary {{url}}/v2/documents/{document_id}/embedded-invites/{field_invite_id}/link/
   * @request POST:/v2/documents/{document_id}/embedded-invites/{field_invite_id}/link/
   */
  urlV2DocumentsDocumentIdEmbeddedInvitesFieldInviteIdLink = (
    documentId: string,
    fieldInviteId: string,
    data: {
      /** @example 15 */
      link_expiration?: number;
      /** @example "https://ya.ru" */
      auth_method?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/v2/documents/${documentId}/embedded-invites/${fieldInviteId}/link/`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
}
