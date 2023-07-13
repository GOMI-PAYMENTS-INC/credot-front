export const RECOMMENDATION_DATA = {
  relations: [
    {
      id: 1,
      text: 'za foundation',
      searchCount: 732,
      competitionProductCount: 37,
      competitionRate: 0.05,
      cpcPrice: 2.033,
      cpcRate: 4.54505,
      avgPrice: 44.73,
      evaluateStatus: 'CAB',
      batchStatus: 'DONE',
      createdAt: '2023-06-25T02:47:21.827+00:00',
    },
    {
      id: 2,
      text: 'nrc foundation',
      searchCount: 328,
      competitionProductCount: 36,
      competitionRate: 0.11,
      cpcPrice: 3.89213,
      cpcRate: 14.33038,
      avgPrice: 27.16,
      evaluateStatus: 'DAD',
      batchStatus: 'DONE',
      createdAt: '2023-06-25T02:47:21.830+00:00',
    },
    {
      id: 3,
      text: 'maaez foundation',
      searchCount: 211,
      competitionProductCount: 92,
      competitionRate: 0.44,
      cpcPrice: 22,
      cpcRate: 142.11886,
      avgPrice: 15.48,
      evaluateStatus: 'EAE',
      batchStatus: 'DONE',
      createdAt: '2023-06-25T02:47:21.833+00:00',
    },
    {
      id: 4,
      text: 'rmk foundation',
      searchCount: 189,
      competitionProductCount: 79,
      competitionRate: 0.42,
      cpcPrice: 0.15648,
      cpcRate: 0.22995,
      avgPrice: 68.05,
      evaluateStatus: 'EAA',
      batchStatus: 'DONE',
      createdAt: '2023-06-25T02:47:21.835+00:00',
    },
    {
      id: 5,
      text: 'vdl foundation',
      searchCount: 95,
      competitionProductCount: 0,
      competitionRate: 0,
      cpcPrice: 2.85483,
      cpcRate: 0,
      avgPrice: 0,
      evaluateStatus: 'EAA',
      batchStatus: 'WAIT',
      createdAt: '2023-06-25T02:47:21.838+00:00',
    },
  ],

  country: 'SG',
  basePrice: 964.08,
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
