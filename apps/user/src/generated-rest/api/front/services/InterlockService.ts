/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CrawlingDto } from '../models/CrawlingDto';
import type { CrawlingResponseDto } from '../models/CrawlingResponseDto';
import type { RequestCrawlingDto } from '../models/RequestCrawlingDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class InterlockService {
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

  /**
   * VAN사 연동 여부 조회
   * @returns boolean
   * @throws ApiError
   */
  public static checkInterLockVan(): CancelablePromise<boolean> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/interlock/check-interlock-van',
    });
  }

  /**
   * 정산금 채권 요청
   * @param requestBody
   * @returns CrawlingResponseDto
   * @throws ApiError
   */
  public static requestBond(
    requestBody: RequestCrawlingDto,
  ): CancelablePromise<CrawlingResponseDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/interlock/request',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * 채권 요청 조회
   * @param requestId
   * @returns CrawlingDto
   * @throws ApiError
   */
  public static getCrawling(requestId: number): CancelablePromise<CrawlingDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/interlock/{requestId}',
      path: {
        requestId: requestId,
      },
    });
  }
}
