/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CrawlingDto } from '../models/CrawlingDto';
import type { RequestCrawlingDto } from '../models/RequestCrawlingDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class InterlockService {
  /**
   * 채권 요청 조회
   * @param requestId
   * @returns CrawlingDto
   * @throws ApiError
   */
  public static getCrawling(requestId: string): CancelablePromise<CrawlingDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/interlock/{requestId}',
      path: {
        requestId: requestId,
      },
    });
  }

  /**
   * 정산금 채권 조회
   * @param requestBody
   * @returns boolean
   * @throws ApiError
   */
  public static checkVanLogin(
    requestBody: RequestCrawlingDto,
  ): CancelablePromise<boolean> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/interlock/check',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
}
