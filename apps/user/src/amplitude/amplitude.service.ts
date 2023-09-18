import { CountryType, Role, SearchDto } from '@/generated/graphql';
import { amplitudeConstant } from '@/amplitude/amplitude.constant';
import {
  AMPLITUDE_ACCOUNT_TYPE,
  convertAmplitudeSortedType,
} from '@/amplitude/amplitude.enum';
import { CHANNEL_TYPE } from '@/types/enum.code';

declare var amplitude: any;

//TODO:axios.config 보면 casing에 snakelize 함수 있으니 참고해서 별도로 카멜/스네이크 신경쓰지 않아도 자동화 되도록 할 것 (casey 3/28)

// ##### Event ##### //
export const _setAmplitudeEvents = async (
  event_name: string,
  payload?: any,
  callBackEvent?: () => void,
) => {
  try {
    switch (event_name) {
      default:
        if (payload) {
          if (payload.country) {
            payload.country = payload.country.toLowerCase();
          }
          if (payload.platform) {
            payload.platform = payload.platform.toLowerCase();
          }
          if (payload.sort_by) {
            payload.sort_by = convertAmplitudeSortedType(payload.sort_by);
          }
        }

        const result = await amplitude.track(event_name, payload).promise;
        if (result) {
          if (callBackEvent) {
            callBackEvent();
          }
        }
        return result;
    }
  } catch (e) {}
};
// ##### Users Id 셋팅 ##### //
export const _setUserId = (id: number) => {
  return amplitude.setUserId(id);
};

// ##### Users Properties 셋팅 ##### //
export const _setUserProperties = async (
  email: string,
  marketing: boolean,
  phone: string,
  role: Role,
) => {
  const identifyEvent = new amplitude.Identify();
  //이메일
  identifyEvent.set('email', email);
  //마케팅 수신 동의 여부
  identifyEvent.set('marketing_notifications', marketing);
  //핸드폰 번호
  identifyEvent.set('phone_number', phone);
  //계정 등급
  identifyEvent.set('account_level', role.toLowerCase());
  //회원가입이 완료된 시점을 나타냄
  identifyEvent.setOnce('account_creation_time', new Date());
  return await amplitude.identify(identifyEvent).promise;
};

// ##### 초기화 ##### //
export const _resetAmplitude = () => {
  amplitude.reset();
};

// ##### GENERAL - 로그인 완료 시 이벤트 ##### //
export const _amplitudeLoggedIn = (provider: AMPLITUDE_ACCOUNT_TYPE) => {
  void _setAmplitudeEvents(amplitudeConstant.loggedIn, {
    provider,
  });
};

// ##### GENERAL - 로그아웃 완료 시 이벤트 ##### //
export const _amplitudeLoggedOut = async (callBackEvent?: () => void) => {
  await _setAmplitudeEvents(amplitudeConstant.loggedOut, {}, callBackEvent);
};

// ##### GENERAL - 휴대폰 인증 완료 시 이벤트 ##### //
export const _amplitudeMobileVerified = (phoneNumber: string) => {
  void _setAmplitudeEvents(amplitudeConstant.mobileVerified, {
    phone_number: phoneNumber,
  });
};
// ##### GENERAL - 로그인 페이지 뷰 발생 시 이벤트 ##### //
export const _amplitudeLoginPageViewed = () => {
  void _setAmplitudeEvents(amplitudeConstant.loginPageViewed, {});
};

// ##### SIGNUP - 회원가입 화면 랜딩 시 이벤트 ##### //
export const _amplitudeSignupStarted = (provider: AMPLITUDE_ACCOUNT_TYPE) => {
  void _setAmplitudeEvents(amplitudeConstant.signupStarted, {
    provider,
  });
};

// ##### SIGNUP - 회원가입 완료 이벤트 ##### //
export const _amplitudeSignupCompleted = async (
  provider: AMPLITUDE_ACCOUNT_TYPE,
  email: string,
  phoneNumber: string,
  marketingNotification: boolean,
  callBackEvent?: () => void,
) => {
  await _setAmplitudeEvents(
    amplitudeConstant.signupCompleted,
    {
      provider,
      email,
      phone_number: phoneNumber,
      marketing_notification: marketingNotification,
    },
    callBackEvent,
  );
};

// ##### FIND ID - 아이디 찾기 화면 랜딩 시 ##### //
export const _amplitudeFindIdStarted = () => {
  void _setAmplitudeEvents(amplitudeConstant.findIdStarted);
};
// ##### FIND ID - 아이디 안내 화면 랜딩 시 ##### //
export const _amplitudeFindIdSucceeded = () => {
  void _setAmplitudeEvents(amplitudeConstant.findIdSucceeded);
};
// ##### FIND ID - 아이디 없음 화면 랜딩 시 ##### //
export const _amplitudeFindIdFailed = () => {
  void _setAmplitudeEvents(amplitudeConstant.findIdFailed);
};

// ##### FIND PW - 비밀번호 찾기 화면 랜딩 시 ##### //
export const _amplitudeFindPwStarted = () => {
  void _setAmplitudeEvents(amplitudeConstant.findPwStarted);
};
// ##### FIND PW - 임시 비밀번호 발송 했을 시 ##### //
export const _amplitudeFindPwSucceeded = () => {
  void _setAmplitudeEvents(amplitudeConstant.findPwSucceeded);
};
// ##### FIND PW - 비밀번호 찾기 실패 했을 시 ##### //
export const _amplitudeFindPwFailed = () => {
  void _setAmplitudeEvents(amplitudeConstant.findPwFailed);
};
// ##### FIND PW - 비밀번호 재설정 화면 랜딩 시 ##### //
export const _amplitudeChangePwStarted = () => {
  void _setAmplitudeEvents(amplitudeConstant.changePwStarted);
};
// ##### FIND PW - 비밀번호 재설정 완료 시 ##### //
export const _amplitudeChangePwCompleted = () => {
  void _setAmplitudeEvents(amplitudeConstant.changePwCompleted);
};

// ##### KEYWORD REPORT - 키워드 검색창에서 국가 변경 완료 시 ##### //
export const _amplitudeCountryChanged = (
  countryBefore: CountryType | TSearchCountry,
  countryAfter: CountryType | TSearchCountry,
) => {
  const [before, after] = [countryBefore, countryAfter].map((text) => text.toLowerCase());
  _setAmplitudeEvents(amplitudeConstant.countryChanged, {
    country_before: before,
    country_after: after,
  });
};

// ##### KEYWORD REPORT - 데이터 수집기준 변경 완료 시 ##### //
export const _amplitudeSortByChanged = (sortByBefore: TSortBy, sortByAfter: TSortBy) => {
  _setAmplitudeEvents(amplitudeConstant.sortByChanged, {
    sort_by_before: convertAmplitudeSortedType(sortByBefore),
    sort_by_after: convertAmplitudeSortedType(sortByAfter),
  });
};

// ##### KEYWORD REPORT - 사용자가 키워드 검색 요청 시 ##### //
export const _amplitudeKeywordSearched = (
  country: CountryType | TSearchCountry,
  sortBy: TSortBy,
  keyword: string,
) => {
  void _setAmplitudeEvents(amplitudeConstant.keywordSearched, {
    platform: CHANNEL_TYPE.SHOPEE,
    country: country,
    sort_by: sortBy,
    keyword,
  });
};

// ##### KEYWORD REPORT - 키워드 검색 성공 시 ##### //
export const _amplitudeKeywordSearchedSucceeded = (
  country: CountryType | TSearchCountry,
  sortBy: TSortBy,
  keyword: string,
  relations: SearchDto[],
  searchVolume?: number | null,
) => {
  const recKeywords = [...relations].map((value) => {
    return value.text;
  });
  void _setAmplitudeEvents(amplitudeConstant.keywordSearchedSucceeded, {
    platform: CHANNEL_TYPE.SHOPEE,
    country: country,
    sort_by: sortBy,
    keyword,
    rec_keywords: recKeywords,
    num_of_rec_keywords: recKeywords.length,
    search_volume: searchVolume || 0,
  });
};

// ##### KEYWORD REPORT - 키워드 검색 실패 시 ##### //
export const _amplitudeKeywordSearchedFailed = (
  country: CountryType | TSearchCountry,
  sortBy: TSortBy,
  keyword: string,
  reason: string,
) => {
  void _setAmplitudeEvents(amplitudeConstant.keywordSearchedFailed, {
    platform: CHANNEL_TYPE.SHOPEE,
    country: country,
    sort_by: sortBy,
    keyword,
    reason,
  });
};

// ##### KEYWORD REPORT - 검색어로 추천된 키워드를 클릭해서 검색 시도 시 ##### //
export const _amplitudeRecKeywordSearched = (
  country: CountryType,
  sortBy: TSortBy,
  keyword: string,
) => {
  void _setAmplitudeEvents(amplitudeConstant.recKeywordSearched, {
    platform: CHANNEL_TYPE.SHOPEE,
    country: country,
    sort_by: sortBy,
    keyword,
  });
};

// ##### KEYWORD REPORT - 키워드 리포트 생성 요청 시 ##### //
export const _amplitudeKeywordReportRequested = (
  reportId: number,
  country: CountryType | TSearchCountry,
  sortBy: TSortBy,
  keyword: string,
  jobId: string,
) => {
  void _setAmplitudeEvents(amplitudeConstant.keywordReportRequested, {
    report_id: reportId,
    platform: CHANNEL_TYPE.SHOPEE,
    country: country,
    sort_by: sortBy,
    keyword,
    job_id: jobId,
  });
};

// ##### KEYWORD REPORT - 키워드 리포트 상세 조회 시 ##### //
export const _amplitudeKeywordReportViewed = (
  reportId: string,
  country: CountryType,
  platform: TChannel,
  sortBy: TSortBy,
  keyword: string,
) => {
  void _setAmplitudeEvents(amplitudeConstant.keywordReportViewed, {
    report_id: reportId,
    country: country,
    platform: platform,
    sort_by: sortBy,
    keyword: keyword,
  });
};
// ##### KEYWORD REPORT - 키워드 리포트 삭제 완료 시 ##### //
export const _amplitudeKeywordReportDeleted = (checkedItems: TReportItem[]) => {
  checkedItems.map((item) => {
    void _setAmplitudeEvents(amplitudeConstant.keywordReportDeleted, {
      report_id: item.id,
      platform: item.channel,
      country: item.countryCode,
      sort_by: item.sortBy,
      keyword: item.keyword,
    });
  });
};

// ##### REPORT ENGAGEMENT - 사용자 가이드 페이지로 이동하는 링크 클릭 시 ##### //
export const _amplitudeMovedToUserGuide = (link_location: string) => {
  void _setAmplitudeEvents(amplitudeConstant.movedToUserGuide, {
    link_location,
  });
};

// ##### REPORT ENGAGEMENT - 특정 키워드의 SERP로 이동하는 링크 클릭 시 ##### //
export const _amplitudeMovedToSERP = (
  reportId: string | undefined,
  keyword: string,
  recKeyword: string | null,
) => {
  void _setAmplitudeEvents(amplitudeConstant.movedToSERP, {
    report_id: reportId,
    keyword,
    rec_keyword: recKeyword,
  });
};

// ##### REPORT ENGAGEMENT - 특정 상품의 상세페이지로 넘어가는 링크 클릭 시 ##### //
export const _amplitudeMovedToPDP = (
  reportId: string,
  keyword: string,
  linkLocation: string,
) => {
  void _setAmplitudeEvents(amplitudeConstant.movedToPDP, {
    report_id: reportId,
    keyword,
    link_location: linkLocation,
  });
};

// ##### KEYWORD TRANSLATION - 키워드 번역 요청 시 ##### //
export const _amplitudeKeywordTranslated = (
  // languageBefore: string,
  languageAfter: string,
  keyword: string,
) => {
  void _setAmplitudeEvents(amplitudeConstant.keywordTranslated, {
    language_before: CountryType.KR.toLowerCase(),
    language_after: languageAfter.toLowerCase(),
    keyword,
  });
};

// ##### KEYWORD TRANSLATION - 번역된 키워드를 검색 요청 시 ##### //
export const _amplitudeTranslatedSearched = (
  country: CountryType,
  sortBy: TSortBy,
  keyword: string,
) => {
  void _setAmplitudeEvents(amplitudeConstant.translatedKeywordSearched, {
    platform: CHANNEL_TYPE.SHOPEE,
    country: country,
    sort_by: sortBy,
    keyword,
  });
};

// ##### KEYWORD REPORT SHARE - 리포트 상세에서 '공유하기' 버튼 클릭 시 ##### //
export const _amplitudeKeywordReportShared = (
  reportId: string,
  country: CountryType,
  sortBy: TSortBy,
  keyword: string,
) => {
  void _setAmplitudeEvents(amplitudeConstant.keywordReportShared, {
    report_id: reportId,
    country: country,
    sort_by: sortBy,
    keyword,
  });
};

// ##### KEYWORD REPORT SHARE - 공유된 리포트에서 '공유하기' 버튼 클릭 시 ##### //
export const _amplitudeSharedKeywordReportShared = (
  reportId: string,
  country: CountryType,
  sortBy: TSortBy,
  keyword: string,
) => {
  void _setAmplitudeEvents(amplitudeConstant.sharedKeywordReportShared, {
    report_id: reportId,
    country: country,
    sort_by: sortBy,
    keyword,
  });
};

// ##### KEYWORD REPORT SHARE - 공유된 리포트 view 발생 시 ##### //
export const _amplitudeSharedKeywordReportViewed = (
  reportId: string,
  // sharedBy: string,
  country: CountryType,
  sortBy: TSortBy,
  keyword: string,
) => {
  void _setAmplitudeEvents(amplitudeConstant.sharedKeywordReportViewed, {
    report_id: reportId,
    // shared_by: sharedBy,
    country: country,
    sort_by: sortBy,
    keyword,
  });
};

export const _clientHotKeywordSearched = (
  country: TSearchCountry,
  sortBy: TSortBy,
  keyword: string,
) =>
  _setAmplitudeEvents(amplitudeConstant.hotKeywordSearched, {
    country,
    sort_by: sortBy,
    keyword,
  });

export const _clientRecKeywordReportRequested = (
  jobId: string,
  country: TSearchCountry,
  sortBy: TSortBy,
  keyword: string,
) =>
  _setAmplitudeEvents(amplitudeConstant.recKeywordReportRequested, {
    jobId,
    country,
    sort_by: sortBy,
    keyword,
  });

export const _subscriptionPageViewed = () =>
  _setAmplitudeEvents(amplitudeConstant.subscriptionPageViewed, {
    feature: 'keyword analysis',
  });

export const _keywordAnalysisPlanUpgradeStarted = () =>
  _setAmplitudeEvents(amplitudeConstant.keywordAnalysisPlanUpgradeStarted);

export const _cardRegistrationStarted = () =>
  _setAmplitudeEvents(amplitudeConstant.cardRegistrationStarted);
