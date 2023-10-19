/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RegisterDto } from '../models/RegisterDto';
import type { TokenDto } from '../models/TokenDto';
import type { UserDto } from '../models/UserDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuthService {
  /**
   * 로그인
   * @returns TokenDto
   * @throws ApiError
   */
  public static authControllerLogin(): CancelablePromise<TokenDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/auth/login',
    });
  }

  /**
   * 프로필 조회
   * @returns UserDto
   * @throws ApiError
   */
  public static authControllerGetProfile(): CancelablePromise<UserDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/auth/profile',
    });
  }

  /**
   * 회원가입
   * @param requestBody
   * @returns UserDto
   * @throws ApiError
   */
  public static authControllerRegister(
    requestBody: RegisterDto,
  ): CancelablePromise<UserDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/auth/register',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
}
