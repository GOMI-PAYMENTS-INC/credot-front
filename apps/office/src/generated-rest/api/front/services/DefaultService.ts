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
   * @param userId
   * @returns any
   * @throws ApiError
   */
  public static officeControllerTest(userId: number): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/test',
      query: {
        userId: userId,
      },
    });
  }

  /**
   * @param userId
   * @returns any
   * @throws ApiError
   */
  public static officeControllerTestInnopayAuth(userId: number): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/test/innopay-auth',
      query: {
        userId: userId,
      },
    });
  }

  /**
   * @param userId
   * @returns any
   * @throws ApiError
   */
  public static officeControllerTestInnopayAuthRelay(
    userId: number,
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/test/innopay-auth/relay',
      query: {
        userId: userId,
      },
    });
  }
}
