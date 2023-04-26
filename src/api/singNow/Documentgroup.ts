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

export class Documentgroup<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Creates a document group from a list of document ids All documents: Must be owned by the person creating the document group. Cannot be templates. Cannot already be a part of another document group (delete document group first to add them). At least one of the documents must have fields.
   *
   * @tags Document Group
   * @name CreateDocumentGroup
   * @summary Create document group
   * @request POST:/documentgroup
   */
  createDocumentGroup = (
    data: {
      /** @example ["{{document_id}}","{{document1_id}}"] */
      document_ids?: string[];
      /** @example "Document Group 1" */
      group_name?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/documentgroup`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Group invite
   *
   * @tags 04 Document Gorup Invite
   * @name GroupInvite
   * @summary Group invite
   * @request POST:/documentgroup/{group_id}/groupinvite
   */
  groupInvite = (
    groupId: string,
    data: {
      /** @example [] */
      completion_emails?: any[];
      /** @example [{"invite_actions":[{"action":"sign","allow_reassign":"0","decline_by_signature":"0","document_id":"{{document_id_1}}","email":"{{user1}}","role_name":"Signer 1"},{"action":"sign","allow_reassign":"0","decline_by_signature":"0","document_id":"{{document_id_2}}","email":"{{user2}}","role_name":"Signer 1"}],"invite_emails":[{"email":"{{user1}}","expiration_days":30,"message":"custom message","reminder":0,"subject":"custom subject"},{"email":"{{user2}}","expiration_days":30,"message":"custom message","reminder":0,"subject":"custom subject"}],"order":1},{"invite_actions":[{"action":"sign","allow_reassign":"0","decline_by_signature":"0","document_id":"{{document_id_3}}","email":"{{user3}}","role_name":"Signer 1"}],"invite_emails":[{"email":"{{user3}}","expiration_days":30,"message":"custom message","reminder":0,"subject":"custom subject"}],"order":2}] */
      invite_steps?: {
        /** @example [{"action":"sign","allow_reassign":"0","decline_by_signature":"0","document_id":"{{document_id_1}}","email":"{{user1}}","role_name":"Signer 1"},{"action":"sign","allow_reassign":"0","decline_by_signature":"0","document_id":"{{document_id_2}}","email":"{{user2}}","role_name":"Signer 1"}] */
        invite_actions?: {
          /** @example "sign" */
          action?: string;
          /** @example "0" */
          allow_reassign?: string;
          /** @example "0" */
          decline_by_signature?: string;
          /** @example "{{document_id_1}}" */
          document_id?: string;
          /** @example "{{user1}}" */
          email?: string;
          /** @example "Signer 1" */
          role_name?: string;
        }[];
        /** @example [{"email":"{{user1}}","expiration_days":30,"message":"custom message","reminder":0,"subject":"custom subject"},{"email":"{{user2}}","expiration_days":30,"message":"custom message","reminder":0,"subject":"custom subject"}] */
        invite_emails?: {
          /** @example "{{user1}}" */
          email?: string;
          /** @example 30 */
          expiration_days?: number;
          /** @example "custom message" */
          message?: string;
          /** @example 0 */
          reminder?: number;
          /** @example "custom subject" */
          subject?: string;
        }[];
        /** @example 1 */
        order?: number;
      }[];
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/documentgroup/${groupId}/groupinvite`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Group invite resend
   *
   * @tags 04 Document Gorup Invite
   * @name GroupInviteResend
   * @summary Group invite resend
   * @request POST:/documentgroup/{group_id}/groupinvite/{group_invite}/resendinvites
   */
  groupInviteResend = (
    groupId: string,
    groupInvite: string,
    data: {
      /** @example "{{user1}}" */
      email?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/documentgroup/${groupId}/groupinvite/${groupInvite}/resendinvites`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Get group invite step id's
   *
   * @tags 04 Document Gorup Invite
   * @name GetGroupInviteStepIdS
   * @summary Get group invite step id's
   * @request GET:/documentgroup/{group_id}/groupinvite/{group_invite}
   */
  getGroupInviteStepIdS = (groupId: string, groupInvite: string, data: object, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/documentgroup/${groupId}/groupinvite/${groupInvite}`,
      method: "GET",
      body: data,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * @description Cancel group invite
   *
   * @tags 04 Document Gorup Invite
   * @name CancelGroupInvite
   * @summary Cancel group invite
   * @request POST:/documentgroup/{group_id}/groupinvite/{group_invite}/cancelinvite
   */
  cancelGroupInvite = (groupId: string, groupInvite: string, data: object, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/documentgroup/${groupId}/groupinvite/${groupInvite}/cancelinvite`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Returns document and roles information for documents in a document group. The invite_id property is null if there is no group invite for the group yet.
   *
   * @tags Document Group
   * @name GetDocumentGroup
   * @summary Get document group
   * @request GET:/documentgroup/{document_group_id}
   */
  getDocumentGroup = (documentGroupId: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/documentgroup/${documentGroupId}`,
      method: "GET",
      ...params,
    });
  /**
   * @description Delete document group
   *
   * @tags Document Group
   * @name DeleteDocumentGroup
   * @summary Delete document group
   * @request DELETE:/documentgroup/{document_group_id}
   */
  deleteDocumentGroup = (documentGroupId: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/documentgroup/${documentGroupId}`,
      method: "DELETE",
      ...params,
    });
  /**
   * @description Creates a multi-step invite for a document group. Each invite step consists of <invite_email> objects that set the email message or can disable emails all together for specific user. Invite steps also are made of the <invite_action> objects that need to be completed before the step is considered complete. Once all the invite_actions are completed, the next step’s invite emails are sent out. When all steps have been completed, completion emails are sent out.
   *
   * @tags Document Group
   * @name InviteToSignDocumentGroup
   * @summary Invite to sign document group
   * @request POST:/documentgroup/{document_group_id}/groupinvite
   */
  inviteToSignDocumentGroup = (
    documentGroupId: string,
    data: {
      /** @example [{"disabled":0,"email":" janedoe@barracuda.com ","message":"The COMPLETE message","subject":"The subject COMPLETE "},{"email":" test@mailinator.com ","message":"COMPLETE message","subject":"COMPLETE subject "},{"disabled":0,"email":"bob@SignNow.com","message":" message COMPLETED","subject":"COMPLETED subject "}] */
      completion_emails?: {
        /** @example 0 */
        disabled?: number;
        /** @example " janedoe@barracuda.com " */
        email?: string;
        /** @example "The COMPLETE message" */
        message?: string;
        /** @example "The subject COMPLETE " */
        subject?: string;
      }[];
      /** @example [{"invite_actions":[{"action":"sign","allow_reassign":0,"authentication":{"type":"password","value":"abc123"},"document_id":"dd63da6fbe213863626a61d36b0c13ce61e4a2be","email":" janedoe@barracuda.com ","role_name":"role6"},{"action":"sign","allow_reassign":0,"document_id":"cddc2f79a3873af02ebc1d1ab0d45b2a1a3a2e7b","email":" test@mailinator.com ","role_name":"role2"}],"invite_emails":[{"disabled":0,"email":"janedoe@barracuda.com","message":"The message for step1","subject":"The subject step1"},{"email":"test@mailinator.com","message":"message step 1","subject":"subject step 1"},{"email":" bob@SignNow.com ","message":"@signnow message step 1","subject":"@signnow subject step 1"}],"order":1},{"invite_actions":[{"action":"view","allow_reassign":0,"document_id":"dd63da6fbe213863626a61d36b0c13ce61e4a2be","email":" janedoe@barracuda.com ","role_name":"role4"},{"action":"view","allow_reassign":0,"document_id":"dd63da6fbe213863626a61d36b0c13ce61e4a2be","email":" test@mailinator.com ","role_name":"role5"}],"invite_emails":[{"disabled":0,"email":" janedoe@barracuda.com ","message":"The message for step2","subject":"The subject for step2"},{"email":" test@mailinator.com ","message":" message step 2","subject":"subject step 2"}],"order":2},{"invite_actions":[{"action":"sign","allow_reassign":0,"document_id":"cddc2f79a3873af02ebc1d1ab0d45b2a1a3a2e7b","email":" janedoe@barracuda.com ","role_name":"role1"},{"action":"sign","allow_reassign":0,"document_id":"cddc2f79a3873af02ebc1d1ab0d45b2a1a3a2e7b","email":" test@mailinator.com ","role_name":"role3"}],"invite_emails":[{"disabled":0,"email":" janedoe@barracuda.com ","message":"The message for step3","subject":"The subject for step3"},{"email":" test@mailinator.com ","message":"message step 3","subject":"subject step 3"}],"order":3}] */
      invite_steps?: {
        /** @example [{"action":"sign","allow_reassign":0,"authentication":{"type":"password","value":"abc123"},"document_id":"dd63da6fbe213863626a61d36b0c13ce61e4a2be","email":" janedoe@barracuda.com ","role_name":"role6"},{"action":"sign","allow_reassign":0,"document_id":"cddc2f79a3873af02ebc1d1ab0d45b2a1a3a2e7b","email":" test@mailinator.com ","role_name":"role2"}] */
        invite_actions?: {
          /** @example "sign" */
          action?: string;
          /** @example 0 */
          allow_reassign?: number;
          authentication?: {
            /** @example "password" */
            type?: string;
            /** @example "abc123" */
            value?: string;
          };
          /** @example "dd63da6fbe213863626a61d36b0c13ce61e4a2be" */
          document_id?: string;
          /** @example " janedoe@barracuda.com " */
          email?: string;
          /** @example "role6" */
          role_name?: string;
        }[];
        /** @example [{"disabled":0,"email":"janedoe@barracuda.com","message":"The message for step1","subject":"The subject step1"},{"email":"test@mailinator.com","message":"message step 1","subject":"subject step 1"},{"email":" bob@SignNow.com ","message":"@signnow message step 1","subject":"@signnow subject step 1"}] */
        invite_emails?: {
          /** @example 0 */
          disabled?: number;
          /** @example "janedoe@barracuda.com" */
          email?: string;
          /** @example "The message for step1" */
          message?: string;
          /** @example "The subject step1" */
          subject?: string;
        }[];
        /** @example 1 */
        order?: number;
      }[];
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/documentgroup/${documentGroupId}/groupinvite`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Cancels a group invite. All documents will be unshared with invitees. Any signatures that occurred before canceling will remain on the documents.
   *
   * @tags Document Group
   * @name CancelDocumentGroupInvite
   * @summary Cancel document group invite
   * @request POST:/documentgroup/{document_group_id}/groupinvite/{invite_id}/cancelinvite
   */
  cancelDocumentGroupInvite = (documentGroupId: string, inviteId: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/documentgroup/${documentGroupId}/groupinvite/${inviteId}/cancelinvite`,
      method: "POST",
      ...params,
    });
  /**
   * @description Returns all pending invite information as well as invites already signed for a group invite for the user that makes the call. If the user making the call is the document owner, it will return pending invites for that user and ALL actions that have already been fulfilled.
   *
   * @tags Document Group
   * @name GetPendingGroupInvites
   * @summary Get pending group invites
   * @request GET:/documentgroup/{document_group_id}/groupinvite/{invte_id}/pendinginvites
   */
  getPendingGroupInvites = (documentGroupId: string, invteId: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/documentgroup/${documentGroupId}/groupinvite/${invteId}/pendinginvites`,
      method: "GET",
      ...params,
    });
  /**
   * @description Resends invite emails to those with pending invites for the group invite. Resend can also be used to resend invites to a single user if the user’s email is specified in the POST JSON body.
   *
   * @tags Document Group
   * @name ResendDocumentGroupInvite
   * @summary Resend document group invite
   * @request POST:/documentgroup/{document_group_id}/groupinvite/{invite_id}/resendinvites
   */
  resendDocumentGroupInvite = (
    documentGroupId: string,
    inviteId: string,
    data: {
      /** @example "test@email.com" */
      email?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/documentgroup/${documentGroupId}/groupinvite/${inviteId}/resendinvites`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Either replaces invitees for a particular step or updates the invite attributes for a user at a particular step
   *
   * @tags Document Group
   * @name UpdateDocumentGroupInvite
   * @summary Update document group invite
   * @request POST:/documentgroup/{document_group_id}/groupinvite/{invite_id}/invitestep/{step_id}/update
   */
  updateDocumentGroupInvite = (documentGroupId: string, inviteId: string, stepId: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/documentgroup/${documentGroupId}/groupinvite/${inviteId}/invitestep/${stepId}/update`,
      method: "POST",
      ...params,
    });
}
