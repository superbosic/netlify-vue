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

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Gets information about all subscriptions to events made with a specific application
   *
   * @tags Webhooks
   * @name GetEventSubscriptions
   * @summary Get event subscriptions
   * @request GET:/api/v2/events
   */
  getEventSubscriptions = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v2/events`,
      method: "GET",
      ...params,
    });
  /**
   * @description Allows to subscribe an external service(callback_url) to a specific event of user or document. Check [this article](https://docs.signnow.com/webhooks/subscriptions) for more details.
   *
   * @tags Webhooks
   * @name CreateEventSubscription
   * @summary Create event subscription
   * @request POST:/api/v2/events
   */
  createEventSubscription = (
    data: {
      /** @example "callback" */
      action?: string;
      attributes?: {
        /** @example " " */
        callback?: string;
        /** @example true */
        docid_queryparam?: boolean;
        headers?: {
          /** @example false */
          bool_head?: boolean;
          /** @example 12.24 */
          float_head?: number;
          /** @example 12 */
          int_head?: number;
          /** @example "test" */
          string_head?: string;
        };
        /** @example "Unique ID Integration System" */
        integration_id?: string;
        /** @example true */
        use_tls_12?: boolean;
      };
      /** @example "" */
      entity_id?: string;
      /** @example "" */
      event?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/v2/events`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Allows changing an existing event subscription
   *
   * @tags Webhooks
   * @name UpdateEventSubscription
   * @summary Update event subscription
   * @request PUT:/api/v2/events/{event_subscription_id}
   */
  updateEventSubscription = (
    eventSubscriptionId: string,
    data: {
      /** @example "callback" */
      action?: string;
      attributes?: {
        /** @example "https://enlvww20vv7m.x.pipedream.net/" */
        callback?: string;
        /** @example true */
        docid_queryparam?: boolean;
        headers?: {
          /** @example false */
          bool_head?: boolean;
          /** @example 12.24 */
          float_head?: number;
          /** @example 12 */
          int_head?: number;
          /** @example "test" */
          string_head?: string;
        };
        /** @example "b98fc00add6b43a606bc527c81eee741bf16a7d8" */
        integration_id?: string;
        /** @example true */
        use_tls_12?: boolean;
      };
      /** @example "63fde884ad755149ff213563de654f9a61a1884c" */
      entity_id?: string;
      /** @example "document.fieldinvite.sent" */
      event?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/v2/events/${eventSubscriptionId}`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Unsubscribes an external service (callback_url) from specific events of user or document
   *
   * @tags Webhooks
   * @name DeleteEventSubscription
   * @summary Delete event subscription
   * @request DELETE:/api/v2/events/{event_subscription_id}
   */
  deleteEventSubscription = (eventSubscriptionId: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v2/events/${eventSubscriptionId}`,
      method: "DELETE",
      ...params,
    });
}
