/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {
  /**
   * @returns string
   * @throws ApiError
   */
  public static officeControllerGetHello(): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/',
    });
  }

  /**
   * @returns boolean
   * @throws ApiError
   */
  public static officeControllerSlackFutureFund(): CancelablePromise<boolean> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/slack/future-fund',
    });
  }

  /**
   * @returns boolean
   * @throws ApiError
   */
  public static officeControllerSlackConsult(): CancelablePromise<boolean> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/slack/consult',
    });
  }

  /**
   * @returns boolean
   * @throws ApiError
   */
  public static officeControllerSlack(): CancelablePromise<boolean> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/slack/profit',
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  public static officeControllerQueueList(): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/queue/failed',
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  public static officeControllerDelayedQueueList(): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/queue/delayed',
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  public static officeControllerActiveQueueList(): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/queue/active',
    });
  }

  /**
   * @param jobId
   * @returns boolean
   * @throws ApiError
   */
  public static officeControllerRestartJob(jobId: string): CancelablePromise<boolean> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/job/restart',
      query: {
        jobId: jobId,
      },
    });
  }

  /**
   * @param jobId
   * @returns any
   * @throws ApiError
   */
  public static officeControllerFailedJob(jobId: string): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/job/failed',
      query: {
        jobId: jobId,
      },
    });
  }
}
