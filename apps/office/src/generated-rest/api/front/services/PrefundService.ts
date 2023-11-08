/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PrefundDto } from '../models/PrefundDto';
import type { UpdatePrefundDto } from '../models/UpdatePrefundDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PrefundService {
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
