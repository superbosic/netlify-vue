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

export class Folder<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Returns all details of a specific folder including an array of all documents in that folder. You can adjust the response produced by this endpoint using the following query parameters: **filters=signing-status&filter-values** - allows to show documents with specific status <br>allowed values: signed, pending, waiting-for-me, waiting-for-others **filters=documents-created&filter-values** - shows documents that were created started from specific date (note: this filter is not applicable for Templates) <br>allowed values: Unix timestamp **filters=documents-updated&filter-values** - shows documents that were updated started from specific date (note: this filter is not applicable for Templates) <br>allowed values: Unix timestamp **sortby=created&order** - sorts documents by creation date in descending or ascending order <br>allowed values: desc, asc **sortby=updated&order** - sorts documents by update date <br>allowed values: desc, asc **limit** - displays specified number of documents; Max limit is 100. It means that if value of "limit" parameter exceeds 100, response is automatically limited to 100 documents. <br>allowed values: integer **offset** - displays documents from specified position <br>allowed values: integer **subfolder-data** - defines whether sub-folders of the given folder are displayed in the response. <br>allowed values: 1, 0 (i.e. subfolder-data=1) **with_team_documents** - allows to display "Team Documents" folders. <br>allowed values: true, false (i.e. with_team_documents=true) **exclude_documents_relations** - allows to display short list of document info and increases maximum limit from 100 to 500 documents per page. <br>allowed values: true, false (i.e. exclude_documents_relations=false) The short list of document info is: ``` { "id": " ", "user_id": " ", "document_name": " ", "page_count": " ", "created": " ", "updated": " ", "original_filename": " " } ``` **include_documents_subfolders** - allows to hide sub-folders and display all documents from those sub-folders in the parent folder. Parameter works only for "Documents" and "Template" folder and their children. Default value - true <br>allowed values: true, false **exclude_documents_relations** - when this param is true, for documents in folder won’t include relations such as fields, signatures, etc, only the main info will be displayed. <br>allowed values: true, false
   *
   * @tags Folder
   * @name GetFolderById
   * @summary Get folder by id
   * @request GET:/folder/{folder_id}
   */
  getFolderById = (folderId: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/folder/${folderId}`,
      method: "GET",
      ...params,
    });
}
