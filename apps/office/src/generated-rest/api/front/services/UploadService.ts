/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FileDto } from '../models/FileDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UploadService {
  /**
   * 파일 업로드 가져오기
   * @param fileId
   * @returns FileDto
   * @throws ApiError
   */
  public static getUploadFile(fileId: number): CancelablePromise<FileDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/upload',
      query: {
        fileId: fileId,
      },
    });
  }

  /**
   * 파일 업로드
   * @param formData
   * @returns FileDto
   * @throws ApiError
   */
  public static uploadFile(formData: { file?: Blob }): CancelablePromise<FileDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/upload',
      formData: formData,
      mediaType: 'multipart/form-data',
    });
  }
}
