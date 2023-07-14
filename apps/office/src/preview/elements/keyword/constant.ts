export const RECOMMENDATION_DATA = {
  relations: [
    {
      id: 1,
      text: 'za foundation',
      searchCount: 757,
      competitionProductCount: 42,
      competitionRate: 0.06,
      cpcPrice: 4.72095,
      cpcRate: 29.26813,
      avgPrice: 16.13,
      evaluateStatus: 'CAE',
      batchStatus: 'DONE',
      createdAt: '2023-07-13T07:53:08.256+00:00',
    },
    {
      id: 2,
      text: 'nrc foundation',
      searchCount: 235,
      competitionProductCount: 185,
      competitionRate: 0.79,
      cpcPrice: 5.82882,
      cpcRate: 18.6046,
      avgPrice: 31.33,
      evaluateStatus: 'EBE',
      batchStatus: 'DONE',
      createdAt: '2023-07-13T07:53:18.438+00:00',
    },
    {
      id: 3,
      text: 'vdl foundation',
      searchCount: 114,
      competitionProductCount: 66,
      competitionRate: 0.58,
      cpcPrice: 7.60301,
      cpcRate: 19.14634,
      avgPrice: 39.71,
      evaluateStatus: 'EBE',
      batchStatus: 'DONE',
      createdAt: '2023-07-13T07:53:27.899+00:00',
    },
    {
      id: 4,
      text: 'rmk foundation',
      searchCount: 103,
      competitionProductCount: 69,
      competitionRate: 0.67,
      cpcPrice: 2.12782,
      cpcRate: 2.6914,
      avgPrice: 79.06,
      evaluateStatus: 'EBA',
      batchStatus: 'DONE',
      createdAt: '2023-07-13T07:53:37.450+00:00',
    },
  ],

  country: 'SG',
  basePrice: 959.48,
  currencyUnit: 1,
};

export enum CountryType {
  /** 한국 */
  Kr = 'KR',
  /** 말레이시아 */
  My = 'MY',
  /** 싱가포르 */
  Sg = 'SG',
  /** 태국 */
  Th = 'TH',
  /** 대만 */
  Tw = 'TW',
  /** 미국 */
  Us = 'US',
  /** 베트남 */
  Vn = 'VN',
}
