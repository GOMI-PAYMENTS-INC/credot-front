/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUserDto } from '../models/CreateUserDto';
import type { UserDto } from '../models/UserDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserService {
  /**
   * 유저 목록 추출
   * @param userId
   * @returns UserDto
   * @throws ApiError
   */
  public static getUsers(userId: string): CancelablePromise<Array<UserDto>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/user/list',
      query: {
        userId: userId,
      },
    });
  }

  /**
   * 유저 생성
   * @param requestBody
   * @returns boolean
   * @throws ApiError
   */
  public static createUser(requestBody: CreateUserDto): CancelablePromise<boolean> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/user',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
}
