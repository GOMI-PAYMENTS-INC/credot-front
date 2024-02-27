/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateBondDto = {
  transactionAt: string;
  cardCompanyName: CreateBondDto.cardCompanyName;
  approvalNumber: string;
  cardType: CreateBondDto.cardType;
  approvalType: CreateBondDto.approvalType;
  approvalAmount: number;
  commission: number;
  userId: number;
};

export namespace CreateBondDto {
  export enum cardCompanyName {
    BC_CARD = 'BC_CARD',
    KB_CARD = 'KB_CARD',
    HANA_CARD = 'HANA_CARD',
    HYUNDAE_CARD = 'HYUNDAE_CARD',
    SHINHAN_CARD = 'SHINHAN_CARD',
    SAMSUNG_CARD = 'SAMSUNG_CARD',
    NH_CARD = 'NH_CARD',
    LOTTE_CARD = 'LOTTE_CARD',
    HDO_CARD = 'HDO_CARD',
    CREDIT_CARD = 'CREDIT_CARD',
    WOORI_CARD = 'WOORI_CARD',
  }

  export enum cardType {
    CREDIT = 'CREDIT',
    CHECK = 'CHECK',
  }

  export enum approvalType {
    APPROVED = 'APPROVED',
    CANCEL = 'CANCEL',
  }
}
