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

export class User<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Returns a user resource
   *
   * @tags User
   * @name GetUserInfo
   * @summary Get user info
   * @request GET:/user
   */
  getUserInfo = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/user`,
      method: "GET",
      ...params,
    });
  /**
   * @description Updates user informaition i.e. first name, last name
   *
   * @tags User
   * @name ChangeUserDetails
   * @summary Change user details
   * @request PUT:/user
   */
  changeUserDetails = (
    data: {
      /** @example "{{updated_name}}" */
      first_name?: string;
      /** @example "{{updated_last_name}}" */
      last_name?: string;
      /** @example "true" */
      logout_all?: string;
      /** @example "{{old_pass}}" */
      old_password?: string;
      /** @example "{{updated_password}}" */
      password?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/user`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Creates an account for a user This endpoint consumes Basic authorization
   *
   * @tags User
   * @name CreateUser
   * @summary Create user
   * @request POST:/user
   */
  createUser = (
    data: {
      /** @example "{{username}}" */
      email?: string;
      /** @example "{{name}}" */
      first_name?: string;
      /** @example "{{last name}}" */
      last_name?: string;
      /** @example "{{password}}" */
      password?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/user`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Sends verification email to a user
   *
   * @tags User
   * @name SendVerificationEmail
   * @summary Send verification email
   * @request POST:/user/verifyemail
   */
  sendVerificationEmail = (
    data: {
      /** @example "{{user}}" */
      email?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/user/verifyemail`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Verifies user’s email address using token from verification email
   *
   * @tags User
   * @name VerifyEmail
   * @summary Verify email
   * @request PUT:/user/email/verify
   */
  verifyEmail = (
    data: {
      /** @example "{{user}}" */
      email?: string;
      /** @example "" */
      verification_token?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/user/email/verify`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Sends password reset link via email
   *
   * @tags User
   * @name ResetPassword
   * @summary Reset password
   * @request POST:/user/forgotpassword
   */
  resetPassword = (
    data: {
      /** @example "{{user}}" */
      email?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/user/forgotpassword`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Returns an array of user’s documents that were modified (added fields, texts, signatures, etc.)
   *
   * @tags User
   * @name GetModifiedDocuments
   * @summary Get modified documents
   * @request GET:/user/documentsv2
   */
  getModifiedDocuments = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/user/documentsv2`,
      method: "GET",
      ...params,
    });
  /**
   * @description Returns information of user’s documents that were not modified yet.
   *
   * @tags User
   * @name GetUserDocuments
   * @summary Get user documents
   * @request GET:/user/documents
   */
  getUserDocuments = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/user/documents`,
      method: "GET",
      ...params,
    });
  /**
   * @description Returns back all document groups the user owns. The call is paginated by last_updated, so offset and limit query parameters are required: 1. Limit must be greater than 0 but less than or equal to 50. 2. Offset must be 0 or greater.
   *
   * @tags Document Group
   * @name GetDocumentGroups
   * @summary Get document groups
   * @request GET:/user/documentgroups
   */
  getDocumentGroups = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/user/documentgroups`,
      method: "GET",
      ...params,
    });
  /**
   * @description Returns all folders of a user.
   *
   * @tags Folder
   * @name GetAllFolders
   * @summary Get all folders
   * @request GET:/user/folder
   */
  getAllFolders = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/user/folder`,
      method: "GET",
      ...params,
    });
  /**
   * @description Creates a folder for the user.
   *
   * @tags Folder
   * @name CreaateFolder
   * @summary Creaate folder
   * @request POST:/user/folder
   */
  creaateFolder = (
    data: {
      /** @example "test folder" */
      name?: string;
      /** @example "" */
      parent_id?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/user/folder`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Renames a folder.
   *
   * @tags Folder
   * @name RenameFolder
   * @summary Rename folder
   * @request PUT:/user/folder/{folder_id}
   */
  renameFolder = (folderId: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/user/folder/${folderId}`,
      method: "PUT",
      ...params,
    });
  /**
   * @description Deletes a folder.
   *
   * @tags Folder
   * @name DeleteFolder
   * @summary Delete folder
   * @request DELETE:/user/folder/{folder_id}
   */
  deleteFolder = (folderId: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/user/folder/${folderId}`,
      method: "DELETE",
      ...params,
    });
}
