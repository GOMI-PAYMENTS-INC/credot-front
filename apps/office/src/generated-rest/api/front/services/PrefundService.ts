/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApplyFutureFundDto } from '../models/ApplyFutureFundDto';
import type { FutureFundDto } from '../models/FutureFundDto';
import type { PrefundDto } from '../models/PrefundDto';
import type { SummaryPrefundDto } from '../models/SummaryPrefundDto';
import type { TodayFutureFundDto } from '../models/TodayFutureFundDto';
import type { UpdatePrefundDto } from '../models/UpdatePrefundDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PrefundService {
  /**
   * 미래정산 요약
   * @param userId
   * @returns TodayFutureFundDto
   * @throws ApiError
   */
  public static today(userId: number): CancelablePromise<TodayFutureFundDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/future-fund/today',
      query: {
        userId: userId,
      },
    });
  }

  /**
   * 미래정산 목록
   * @param startAt
   * @param endAt
   * @param userId
   * @returns FutureFundDto
   * @throws ApiError
   */
  public static list(
    startAt: string,
    endAt: string,
    userId: number,
  ): CancelablePromise<Array<FutureFundDto>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/future-fund/list',
      query: {
        startAt: startAt,
        endAt: endAt,
        userId: userId,
      },
    });
  }

  /**
   * 미래 정산 신청
   * @param requestBody
   * @returns boolean
   * @throws ApiError
   */
  public static apply(requestBody: ApplyFutureFundDto): CancelablePromise<boolean> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/future-fund/apply',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * 선정산 목록 추출
   * @param status
   * @param startAt
   * @param endAt
   * @param userId
   * @returns PrefundDto
   * @throws ApiError
   */
  public static getPrefunds(
    status: string,
    startAt: string,
    endAt: string,
    userId: string,
  ): CancelablePromise<Array<PrefundDto>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/prefund/list',
      query: {
        status: status,
        startAt: startAt,
        endAt: endAt,
        userId: userId,
      },
    });
  }

  /**
   * 출금 준비 > 선정산 요약 정보
   * @param date
   * @param userId
   * @returns SummaryPrefundDto
   * @throws ApiError
   */
  public static summary(
    date: string,
    userId: number,
  ): CancelablePromise<SummaryPrefundDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/prefund/summary',
      query: {
        date: date,
        userId: userId,
      },
    });
  }

  /**
   * 선정산 상태 수정
   * @param requestBody
   * @returns boolean
   * @throws ApiError
   */
  public static updatePrefundStatusByIds(
    requestBody: UpdatePrefundDto,
  ): CancelablePromise<boolean> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/prefund',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
}
