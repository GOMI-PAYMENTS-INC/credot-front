/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LoginDto } from '../models/LoginDto';
import type { TokenDto } from '../models/TokenDto';
import type { UserDto } from '../models/UserDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuthService {
  /**
   * 로그인
   * @param requestBody
   * @returns TokenDto
   * @throws ApiError
   */
  public static login(requestBody: LoginDto): CancelablePromise<TokenDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/auth/login',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * 프로필 조회
   * @returns UserDto
   * @throws ApiError
   */
  public static getProfile(): CancelablePromise<UserDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/auth/profile',
    });
  }
}
