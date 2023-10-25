/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CrawlingDto = {
  status: CrawlingDto.status;
};

export namespace CrawlingDto {
  export enum status {
    REQUEST = 'REQUEST',
    RECEIVE = 'RECEIVE',
    FAILED = 'FAILED',
    DONE = 'DONE',
  }
}
