/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateApplyDto } from '../models/CreateApplyDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ApplyService {
  /**
   * 서비스 신청
   * @param requestBody
   * @returns boolean
   * @throws ApiError
   */
  public static apply(requestBody: CreateApplyDto): CancelablePromise<boolean> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/apply/check',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
}
