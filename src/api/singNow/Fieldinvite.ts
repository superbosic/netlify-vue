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

export class FieldInvite<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Cancel field invite
   *
   * @tags 00 Invite to Sign (with fields)
   * @name CancelFieldInvite
   * @summary Cancel field invite
   * @request DELETE:/field_invite/{field_invite_id_2}
   */
  cancelFieldInvite = (fieldInviteId2: string, data: object, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/field_invite/${fieldInviteId2}`,
      method: "DELETE",
      body: data,
      type: ContentType.FormData,
      ...params,
    });
}
