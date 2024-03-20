/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FutureFundMatrixSummaryDto } from '../models/FutureFundMatrixSummaryDto';
import type { HomeChartDto } from '../models/HomeChartDto';
import type { HomeInoutDto } from '../models/HomeInoutDto';
import type { HomeInoutInDto } from '../models/HomeInoutInDto';
import type { HomeTodayDto } from '../models/HomeTodayDto';
import type { PrefundMatrixSummaryDto } from '../models/PrefundMatrixSummaryDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class HomeService {
  /**
   * 오늘의 입출금 업무
   * @returns HomeTodayDto
   * @throws ApiError
   */
  public static today(): CancelablePromise<HomeTodayDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/home/today',
    });
  }

  /**
   * 자금 IN & OUT
   * @returns HomeInoutDto
   * @throws ApiError
   */
  public static inOutOut(): CancelablePromise<HomeInoutDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/home/inout/out',
    });
  }

  /**
   * 자금 IN & OUT
   * @returns HomeInoutInDto
   * @throws ApiError
   */
  public static inOutIn(): CancelablePromise<Array<HomeInoutInDto>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/home/inout/in',
    });
  }

  /**
   * 선정산 주요 지표
   * @returns PrefundMatrixSummaryDto
   * @throws ApiError
   */
  public static prefundSummary(): CancelablePromise<PrefundMatrixSummaryDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/home/summary/prefund',
    });
  }

  /**
   * 미래정산 주요 지표
   * @returns FutureFundMatrixSummaryDto
   * @throws ApiError
   */
  public static futureFundSummary(): CancelablePromise<FutureFundMatrixSummaryDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/home/summary/future-fund',
    });
  }

  /**
   * 홈 차트
   * @param type
   * @param dateType
   * @param startAt
   * @param endAt
   * @param userId
   * @returns HomeChartDto
   * @throws ApiError
   */
  public static chart(
    type: string,
    dateType: string,
    startAt: string,
    endAt: string,
    userId: number,
  ): CancelablePromise<HomeChartDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/home/chart',
      query: {
        type: type,
        dateType: dateType,
        startAt: startAt,
        endAt: endAt,
        userId: userId,
      },
    });
  }
}
