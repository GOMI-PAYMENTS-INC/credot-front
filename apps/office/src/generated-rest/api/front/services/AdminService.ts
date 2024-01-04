/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApplyFutureFundDto } from '../models/ApplyFutureFundDto';
import type { BondDto } from '../models/BondDto';
import type { CreateBondDto } from '../models/CreateBondDto';
import type { CreatePrefundDto } from '../models/CreatePrefundDto';
import type { FutureFundDto } from '../models/FutureFundDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AdminService {
  /**
   * 채권 요청
   * @param userId
   * @returns boolean
   * @throws ApiError
   */
  public static test(userId: number): CancelablePromise<boolean> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/request/bond',
      query: {
        userId: userId,
      },
    });
  }

  /**
   * 수동 채권 생성
   * @param requestBody
   * @returns BondDto
   * @throws ApiError
   */
  public static manualBond(requestBody: CreateBondDto): CancelablePromise<BondDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/create/bond',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * 선정산 생성
   * @param requestBody
   * @returns boolean
   * @throws ApiError
   */
  public static createDaily(requestBody: CreatePrefundDto): CancelablePromise<boolean> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/create/daily',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * 특정일 수동 미래 정산 생성
   * @param requestBody
   * @returns FutureFundDto
   * @throws ApiError
   */
  public static manualFutureFund(
    requestBody: ApplyFutureFundDto,
  ): CancelablePromise<FutureFundDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/create/future-fund',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * 특정일 수동 미래 정산 처리
   * @param requestBody
   * @returns FutureFundDto
   * @throws ApiError
   */
  public static processFutureFund(
    requestBody: CreatePrefundDto,
  ): CancelablePromise<FutureFundDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/process/future-fund',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
}
