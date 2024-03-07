/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApplyFutureFundDto } from '../models/ApplyFutureFundDto';
import type { TodayFutureFundDto } from '../models/TodayFutureFundDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FutureFundService {
  /**
   * 오늘 미래 정산
   * @returns TodayFutureFundDto
   * @throws ApiError
   */
  public static todayFutureFund(): CancelablePromise<TodayFutureFundDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/future-fund/today',
    });
  }

  /**
   * 오늘 미래 정산 신청
   * @param requestBody
   * @returns boolean
   * @throws ApiError
   */
  public static applyFutureFund(
    requestBody: ApplyFutureFundDto,
  ): CancelablePromise<boolean> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/future-fund/apply',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
}
