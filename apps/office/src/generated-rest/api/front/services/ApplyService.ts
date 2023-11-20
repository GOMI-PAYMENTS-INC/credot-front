/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApplyDto } from '../models/ApplyDto';
import type { UpdateApplyDto } from '../models/UpdateApplyDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ApplyService {
  /**
   * 서비스 신청 목록 추출
   * @param status
   * @param userId
   * @returns ApplyDto
   * @throws ApiError
   */
  public static getApplies(
    status: string,
    userId: string,
  ): CancelablePromise<Array<ApplyDto>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/apply/list',
      query: {
        status: status,
        userId: userId,
      },
    });
  }

  /**
   * 서비스 신청 상태 수정
   * @param requestBody
   * @returns boolean
   * @throws ApiError
   */
  public static updateApplyStatusByIds(
    requestBody: UpdateApplyDto,
  ): CancelablePromise<boolean> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/apply',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
}
