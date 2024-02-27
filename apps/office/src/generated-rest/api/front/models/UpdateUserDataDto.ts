/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CrawlingTypeEnum } from './CrawlingTypeEnum';
import type { UserTypeEnum } from './UserTypeEnum';

export type UpdateUserDataDto = {
  type?: UserTypeEnum;
  crawlingType?: CrawlingTypeEnum;
  companyName: string;
  businessNumber?: string;
  corporateRegistrationNumber?: string;
  industryType?: string;
  businessType?: string;
  password?: string;
  companyAddress?: string;
  managerPosition?: string;
  managerName?: string;
  phoneNumber?: string;
  bankName?: string;
  bankAccountHolder?: string;
  bankAccount?: string;
  crawlingAccountId?: string;
  crawlingPassword?: string;
  businessLicenseFileId?: number;
  companyEmail?: string;
  corporateRegisterFileId?: number;
  certificateOfCorporateSealFileId?: number;
  crawlingFranchiseInfos: Array<Record<string, any>>;
};
