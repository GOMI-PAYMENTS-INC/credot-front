/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CrawlingTypeEnum } from './CrawlingTypeEnum';
import type { FranchiseInfo } from './FranchiseInfo';

export type CrawlingInfoDto = {
  type: CrawlingTypeEnum;
  accountId: string;
  password: string;
  franchiseInfos: Array<FranchiseInfo>;
};
