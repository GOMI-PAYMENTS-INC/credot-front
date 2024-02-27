/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CrawlingInfoDto } from '../models/CrawlingInfoDto';
import type { CreateUserDto } from '../models/CreateUserDto';
import type { UpdateUserDto } from '../models/UpdateUserDto';
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
   * 유저 추출
   * @param memberId
   * @returns UserDto
   * @throws ApiError
   */
  public static getUser(memberId: number): CancelablePromise<UserDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/user/{memberId}',
      path: {
        memberId: memberId,
      },
    });
  }

  /**
   * 유저 삭제
   * @param memberId
   * @returns boolean
   * @throws ApiError
   */
  public static deleteUser(memberId: number): CancelablePromise<boolean> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/user/{memberId}',
      path: {
        memberId: memberId,
      },
    });
  }

  /**
   * 유저 크롤링 정보 추출
   * @param memberId
   * @returns CrawlingInfoDto
   * @throws ApiError
   */
  public static getCrawlingInfo(
    memberId: number,
  ): CancelablePromise<Array<CrawlingInfoDto>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/user/crawlingInfo/{memberId}',
      path: {
        memberId: memberId,
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

  /**
   * 유저 생성
   * @param requestBody
   * @returns boolean
   * @throws ApiError
   */
  public static updateUser(requestBody: UpdateUserDto): CancelablePromise<boolean> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/user',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
}
