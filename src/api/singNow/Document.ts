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

export class Document<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Upload document
   *
   * @tags 05 Embedded Signning
   * @name UploadDocument1
   * @summary Upload document
   * @request POST:/document/
   */
  uploadDocument1 = (
    data: {
      /** @format binary */
      file?: File;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/document/`,
      method: "POST",
      body: data,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * @description This endpoint returns details of specific document
   *
   * @tags Document
   * @name GetDocument
   * @summary Get document
   * @request GET:/document/{document_id}
   */
  getDocument = (documentId: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/document/${documentId}`,
      method: "GET",
      ...params,
    });
  /**
   * @description Updates a document by adding/overwriting fields or elements (texts, checks, signatures, hyperlinks, attachments) More details can be found [here](https://docs.signnow.com/reference/oas/document/putdocumentdocumentid)
   *
   * @tags Document
   * @name EditDocument
   * @summary Edit document
   * @request PUT:/document/{document_id}
   */
  editDocument = (
    documentId: string,
    data: {
      /** @example "new_name" */
      document_name?: string;
      /** @example [{"height":34,"page_number":0,"required":true,"role":"Signer 1","type":"signature","width":122,"x":305,"y":18},{"height":12,"label":"a sample label","page_number":0,"required":true,"role":"Signer 1","type":"text","width":60,"x":307,"y":67}] */
      fields?: {
        /** @example 34 */
        height?: number;
        /** @example "a sample label" */
        label?: string;
        /** @example 0 */
        page_number?: number;
        /** @example true */
        required?: boolean;
        /** @example "Signer 1" */
        role?: string;
        /** @example "signature" */
        type?: string;
        /** @example 122 */
        width?: number;
        /** @example 305 */
        x?: number;
        /** @example 18 */
        y?: number;
      }[];
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/document/${documentId}`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Deletes a document from user’s account
   *
   * @tags Document
   * @name DeleteDocument
   * @summary Delete document
   * @request DELETE:/document/{document_id}
   */
  deleteDocument = (documentId: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/document/${documentId}`,
      method: "DELETE",
      ...params,
    });
  /**
   * @description Create and sends an invite to sign a document. There are 2 types of signature invite: 1. Free form invite - for document without fillable fields 2. Role-based invite - document has at least one field These 2 types of invite require different payloads
   *
   * @tags Document
   * @name SendAnInviteToSign
   * @summary Send an invite to sign
   * @request POST:/document/{document_id}/invite
   */
  sendAnInviteToSign = (
    documentId: string,
    data: {
      /** @example ["cc_email@gmail.com","abnother_cc@gmail.com"] */
      cc?: string[];
      /** @example "{{document_id}}" */
      document_id?: string;
      /** @example "sender@email.com" */
      from?: string;
      /** @example "generic message" */
      message?: string;
      /** @example "generic subject" */
      subject?: string;
      /** @example [{"authentication_type":"password","decline_by_signature":"0","email":"signer@signnow.com","expiration_days":30,"message":"personalized message","order":1,"password":"123456","reassign":"0","reminder":0,"role":"Signer 1","role_id":"488d73a3efab032511f144af3a2572a8aae20162","subject":"personalized subject"},{"decline_by_signature":"1","email":"signer2@signnow.com","expiration_days":30,"order":2,"reassign":"1","reminder":0,"role":"Signer 2","role_id":""}] */
      to?: {
        /** @example "password" */
        authentication_type?: string;
        /** @example "0" */
        decline_by_signature?: string;
        /** @example "signer@signnow.com" */
        email?: string;
        /** @example 30 */
        expiration_days?: number;
        /** @example "personalized message" */
        message?: string;
        /** @example 1 */
        order?: number;
        /** @example "123456" */
        password?: string;
        /** @example "0" */
        reassign?: string;
        /** @example 0 */
        reminder?: number;
        /** @example "Signer 1" */
        role?: string;
        /** @example "488d73a3efab032511f144af3a2572a8aae20162" */
        role_id?: string;
        /** @example "personalized subject" */
        subject?: string;
      }[];
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/document/${documentId}/invite`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Reassign signer
   *
   * @tags 00 Invite to Sign (with fields)
   * @name ReassignSigner
   * @summary Reassign signer
   * @request PUT:/document/{document_id}/invite/reassign/{field_invite_id_1}
   */
  reassignSigner = (
    documentId: string,
    fieldInviteId1: string,
    data: {
      /** @example [] */
      cc?: any[];
      /** @example "{{user3}}" */
      email?: string;
      /** @example 1 */
      reassign?: number;
      /** @example "{{role_id_1}}" */
      role_id?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/document/${documentId}/invite/reassign/${fieldInviteId1}`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Change password
   *
   * @tags 00 Invite to Sign (with fields)
   * @name ChangePassword
   * @summary Change password
   * @request PUT:/document/{document_id}/invite/changepassword
   */
  changePassword = (
    documentId: string,
    data: {
      /** @example "password" */
      authentication_type?: string;
      /** @example "{{field_invite_id_2}}" */
      fieldinvite_id?: string;
      /** @example "29" */
      new_password?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/document/${documentId}/invite/changepassword`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Uploads a file to user’s account and returns unique id of the uploaded document. Accepts .doc, .docx, .pdf, .xls, .xlsx, .ppt, .pptx and .png file types.
   *
   * @tags Document
   * @name UploadDocument2
   * @summary Upload document
   * @request POST:/document
   */
  uploadDocument2 = (
    data: {
      /** @format binary */
      file?: File;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/document`,
      method: "POST",
      body: data,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * @description 6.Get role id's for template
   *
   * @tags 02 Signing Link
   * @name GetRoleIdSForTemplate
   * @summary 6.Get role id's for template
   * @request GET:/document/{template_id}
   */
  getRoleIdSForTemplate = (templateId: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/document/${templateId}`,
      method: "GET",
      ...params,
    });
  /**
   * @description 6. Add 3 signature fields
   *
   * @tags 03 Bulk Invite
   * @name Add3SignatureFields
   * @summary 6. Add 3 signature fields
   * @request PUT:/document/{template_id}
   */
  add3SignatureFields = (templateId: string, data: any, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/document/${templateId}`,
      method: "PUT",
      body: data,
      type: ContentType.Text,
      ...params,
    });
  /**
   * @description 7.Update routing details
   *
   * @tags 02 Signing Link
   * @name UpdateRoutingDetails
   * @summary 7.Update routing details
   * @request PUT:/document/{template_id}/template/routing/detail
   */
  updateRoutingDetails = (
    templateId: string,
    data: {
      /** @example [] */
      cc?: any[];
      /** @example [] */
      cc_step?: any[];
      /** @example [{"default_email":"","inviter_role":false,"name":"Signer 1","role_id":"{{role_id_1}}","signing_order":1}] */
      template_data?: {
        /** @example "" */
        default_email?: string;
        /** @example false */
        inviter_role?: boolean;
        /** @example "Signer 1" */
        name?: string;
        /** @example "{{role_id_1}}" */
        role_id?: string;
        /** @example 1 */
        signing_order?: number;
      }[];
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/document/${templateId}/template/routing/detail`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Get field id 1 signer
   *
   * @tags 04 Document Gorup Invite
   * @name GetFieldId1Signer
   * @summary Get field id 1 signer
   * @request GET:/document/{document_id_1}
   */
  getFieldId1Signer = (documentId1: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/document/${documentId1}`,
      method: "GET",
      ...params,
    });
  /**
   * @description Add field to doc 1
   *
   * @tags 04 Document Gorup Invite
   * @name AddFieldToDoc1
   * @summary Add field to doc 1
   * @request PUT:/document/{document_id_1}
   */
  addFieldToDoc1 = (documentId1: string, data: any, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/document/${documentId1}`,
      method: "PUT",
      body: data,
      type: ContentType.Text,
      ...params,
    });
  /**
   * @description Get field id 2 signer
   *
   * @tags 04 Document Gorup Invite
   * @name GetFieldId2Signer
   * @summary Get field id 2 signer
   * @request GET:/document/{document_id_2}
   */
  getFieldId2Signer = (documentId2: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/document/${documentId2}`,
      method: "GET",
      ...params,
    });
  /**
   * @description Add field to doc 2
   *
   * @tags 04 Document Gorup Invite
   * @name AddFieldToDoc2
   * @summary Add field to doc 2
   * @request PUT:/document/{document_id_2}
   */
  addFieldToDoc2 = (documentId2: string, data: any, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/document/${documentId2}`,
      method: "PUT",
      body: data,
      type: ContentType.Text,
      ...params,
    });
  /**
   * @description Get field id 3 signer
   *
   * @tags 04 Document Gorup Invite
   * @name GetFieldId3Signer
   * @summary Get field id 3 signer
   * @request GET:/document/{document_id_3}
   */
  getFieldId3Signer = (documentId3: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/document/${documentId3}`,
      method: "GET",
      ...params,
    });
  /**
   * @description Add field to doc 3
   *
   * @tags 04 Document Gorup Invite
   * @name AddFieldToDoc3
   * @summary Add field to doc 3
   * @request PUT:/document/{document_id_3}
   */
  addFieldToDoc3 = (documentId3: string, data: any, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/document/${documentId3}`,
      method: "PUT",
      body: data,
      type: ContentType.Text,
      ...params,
    });
  /**
   * @description Uploads a file that contains [SignNow Text Tags](https://docs.signnow.com/docs/text-tags) . Only .doc, .docx, and .pdf are supported
   *
   * @tags Document
   * @name UploadDocumentWithTags
   * @summary Upload document with tags
   * @request POST:/document/fieldextract
   */
  uploadDocumentWithTags = (
    data: {
      /**
       * @example "[
       *    {
       *       "tag_name":"tag 1",
       *       "role":"Signer 1",
       *       "label":"name",
       *       "required":true,
       *       "type":"text",
       *       "height":15,
       *       "width":100
       *    }
       * ]"
       */
      Tags?: string;
      /** @format binary */
      file?: File;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/document/fieldextract`,
      method: "POST",
      body: data,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * @description Downloads a document
   *
   * @tags Document
   * @name DownloadDocument
   * @summary Download document
   * @request GET:/document/{document_id}/download
   */
  downloadDocument = (
    documentId: string,
    query?: {
      /** @example "collapsed" */
      type?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/document/${documentId}/download`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * @description Moves a document into specified folder
   *
   * @tags Document
   * @name MoveDocument
   * @summary Move document
   * @request POST:/document/{document_id}/move
   */
  moveDocument = (
    documentId: string,
    data: {
      /** @example "{{folder_id}}" */
      folder_id?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/document/${documentId}/move`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Cancels an invite to sign a document.
   *
   * @tags Document
   * @name CancelInvite
   * @summary Cancel invite
   * @request PUT:/document/{document_id}/fieldinvitecancel
   */
  cancelInvite = (documentId: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/document/${documentId}/fieldinvitecancel`,
      method: "PUT",
      ...params,
    });
  /**
   * @description Returns a one-time use URL for anyone to download the document as a PDF.
   *
   * @tags Document
   * @name GetDocumentDownloadLink
   * @summary Get document download link
   * @request GET:/document/{document_id}/download/link
   */
  getDocumentDownloadLink = (documentId: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/document/${documentId}/download/link`,
      method: "GET",
      ...params,
    });
  /**
   * @description Allows developers to add their custom events to the audit log. For example, if you are using a single SignNow account to make API calls but authenticating multiple people, use this call to add a record to the audit log for that specific document that references the authentication method.
   *
   * @tags Document
   * @name AddCustomEvent
   * @summary Add custom event
   * @request POST:/document/{document_id}/custom_history_event
   */
  addCustomEvent = (documentId: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/document/${documentId}/custom_history_event`,
      method: "POST",
      ...params,
    });
  /**
   * @description Merges existing documents into one.
   *
   * @tags Document
   * @name MergeDocuments
   * @summary Merge documents
   * @request POST:/document/merge
   */
  mergeDocuments = (
    data: {
      /** @example ["{{document_id}}","{{document2_id}}"] */
      document_ids?: string[];
      /** @example "the merged doc" */
      name?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/document/merge`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Returns the history of a document.
   *
   * @tags Document
   * @name GetDocumentHistory
   * @summary Get document history
   * @request GET:/document/{document_id}/historyfull
   */
  getDocumentHistory = (documentId: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/document/${documentId}/historyfull`,
      method: "GET",
      ...params,
    });
  /**
   * @description Returns invite action information for a group invite, including the status of each step and action. Here is the list of possible invite action statuses: 1. ‘created’: invite or action has been created but is not waiting to be signed 2. ‘pending’: emails have been sent out for this invite action or step and are waiting to be viewed or signed 3. ‘fulfilled’: actions and steps that have been finished by singing or viewing
   *
   * @tags Document Group
   * @name GetDocumentGroupInvite
   * @summary Get document group invite
   * @request GET:/document/{document_group_id}/groupinvite/{invite_id}
   */
  getDocumentGroupInvite = (documentGroupId: string, inviteId: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/document/${documentGroupId}/groupinvite/${inviteId}`,
      method: "GET",
      ...params,
    });
  /**
   * @description Prefills smart fields. You can add Smart Fields to a template though web UI only. <br> **Note:** names of Smart Fields are case sensetive.
   *
   * @tags Smart Fields
   * @name PrefillSmartFields
   * @summary Prefill smart fields
   * @request POST:/document/{document_id}/integration/object/smartfields
   */
  prefillSmartFields = (
    documentId: string,
    data: {
      /** @example "UTC time stamp" */
      client_timestamp?: string;
      /** @example [{"field_name1":"value1"},{"field_name2":"value2"}] */
      data?: {
        /** @example "value1" */
        field_name1?: string;
        /** @example "value2" */
        field_name2?: string;
      }[];
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/document/${documentId}/integration/object/smartfields`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
}
