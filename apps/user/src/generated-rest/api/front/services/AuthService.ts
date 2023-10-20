/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ExistDto } from '../models/ExistDto';
import type { LoginDto } from '../models/LoginDto';
import type { PhoneAuthDto } from '../models/PhoneAuthDto';
import type { RegisterDto } from '../models/RegisterDto';
import type { RequestPhoneAuthDto } from '../models/RequestPhoneAuthDto';
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
   * @returns any
   * @throws ApiError
   */
  public static login(
    requestBody: LoginDto,
  ): CancelablePromise<TokenDto | Record<string, any>> {
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

  /**
   * 회원가입
   * @param requestBody
   * @returns TokenDto
   * @returns any
   * @throws ApiError
   */
  public static register(
    requestBody: RegisterDto,
  ): CancelablePromise<TokenDto | Record<string, any>> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/auth/register',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * 이메일 존재하는지 검사
   * @param email
   * @returns ExistDto
   * @throws ApiError
   */
  public static existEmail(email: string): CancelablePromise<ExistDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/auth/exist',
      query: {
        email: email,
      },
    });
  }

  /**
   * 핸드폰 인증
   * @param requestBody
   * @returns boolean
   * @throws ApiError
   */
  public static requestPhoneAuthCode(
    requestBody: RequestPhoneAuthDto,
  ): CancelablePromise<boolean> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/auth/phone/request',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * 핸드폰 인증 번호 검증
   * @param phoneNumber
   * @param verifyCode
   * @returns PhoneAuthDto
   * @throws ApiError
   */
  public static verifyPhoneAuthCode(
    phoneNumber: string,
    verifyCode: string,
  ): CancelablePromise<PhoneAuthDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/auth/phone/verify',
      query: {
        phoneNumber: phoneNumber,
        verifyCode: verifyCode,
      },
    });
  }
}
