/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RequestTokenDto } from '../models/RequestTokenDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class GoogleService {
  /**
   * 토큰 요청
   * @param requestBody
   * @returns boolean
   * @throws ApiError
   */
  public static requestToken(requestBody: RequestTokenDto): CancelablePromise<boolean> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/google/token',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * 구글 인증 여부
   * @returns boolean
   * @throws ApiError
   */
  public static validGoogleAuth(): CancelablePromise<boolean> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/google/token',
    });
  }
}
