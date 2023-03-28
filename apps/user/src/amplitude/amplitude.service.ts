import { CountryType, Role, SearchDto, User } from '@/generated/graphql';
import { amplitudeConstant } from '@/amplitude/amplitude.constant';
import { AccountType } from '@/amplitude/amplitude.enum';

declare var amplitude: any;

// ##### Event ##### //
export const _setAmplitudeEvents = async (
  event_name: string,
  payload?: any,
  callBackEvent?: () => void,
) => {
  try {
    switch (event_name) {
      default:
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

// ##### Users Properties 셋팅 ##### //
export const _setUserProperties = async (user: {
  __typename?: 'User';
  id: number;
  email: string;
  role: Role;
  name: string;
  nickName?: string | null;
  phone?: string | null;
  profileImage?: string | null;
  joinedAt?: string | null;
  isSocialLogin: boolean;
  socialProvider?: string | null;
}) => {
  amplitude.setUserId(user.id);

  const identifyEvent = new amplitude.Identify();
  //계정 등급
  identifyEvent.set('account_level', user.role);
  //회원가입이 완료된 시점을 나타냄
  identifyEvent.setOnce('account_creation_time', user.joinedAt);

  const result = await amplitude.identify(identifyEvent).promise;
  return result;
};

// ##### 초기화 ##### //
export const _resetAmplitude = () => {
  amplitude.reset();
};

// ##### GENERAL - 1 - 로그인 완료 시 이벤트 ##### //
export const _generalLoggedIn = (provider: AccountType) => {
  void _setAmplitudeEvents(amplitudeConstant.loggedIn, {
    provider,
  });
};

// ##### GENERAL - 2 - 로그아웃 완료 시 이벤트 ##### //
export const _generalLoggedOut = async (callBackEvent?: () => void) => {
  await _setAmplitudeEvents(amplitudeConstant.loggedOut, {}, callBackEvent);
};

// ##### GENERAL - 3 - 휴대폰 인증 완료 시 이벤트 ##### //
export const _generalMobileVerified = (phone_number: string) => {
  void _setAmplitudeEvents(amplitudeConstant.mobileVerified, { phone_number });
};

// ##### SIGNUP - 1 - 회원가입 화면 랜딩 시 이벤트 ##### //
export const _signupSignupStarted = (provider: AccountType) => {
  void _setAmplitudeEvents(amplitudeConstant.signupStarted, {
    provider,
  });
};

// ##### SIGNUP - 2 - 회원가입 완료 이벤트 ##### //
export const _signupSignupCompleted = async (
  provider: AccountType,
  email: string,
  phone_number: string,
  //marketing_notification: boolean,
  callBackEvent?: () => void,
) => {
  await _setAmplitudeEvents(
    amplitudeConstant.signupCompleted,
    {
      provider,
      email,
      phone_number,
      marketing_notification: false,
    },
    callBackEvent,
  );
};

// ##### FIND ID - 1 - 아이디 찾기 화면 랜딩 시 ##### //
export const _findIdFindIdStarted = () => {
  void _setAmplitudeEvents(amplitudeConstant.findIdStarted);
};
// ##### FIND ID - 2 - 아이디 안내 화면 랜딩 시 ##### //
export const _findIdFindIdSucceeded = () => {
  void _setAmplitudeEvents(amplitudeConstant.findIdSucceeded);
};
// ##### FIND ID - 3 - 아이디 없음 화면 랜딩 시 ##### //
export const _findIdFindIdFailed = () => {
  void _setAmplitudeEvents(amplitudeConstant.findIdFailed);
};

// ##### FIND PW - 1 - 비밀번호 찾기 화면 랜딩 시 ##### //
export const _findPwFindPwStarted = () => {
  void _setAmplitudeEvents(amplitudeConstant.findPwStarted);
};
// ##### FIND PW - 2 - 임시 비밀번호 발송 했을 시 ##### //
export const _findPwFindPwSucceeded = () => {
  void _setAmplitudeEvents(amplitudeConstant.findPwSucceeded);
};
// ##### FIND PW - 3 - 비밀번호 찾기 실패 했을 시 ##### //
export const _findPwFindPwFailed = () => {
  void _setAmplitudeEvents(amplitudeConstant.findPwFailed);
};
// ##### FIND PW - 4 - 비밀번호 재설정 화면 랜딩 시 ##### //
export const _findPwChangePwStarted = () => {
  void _setAmplitudeEvents(amplitudeConstant.changePwStarted);
};
// ##### FIND PW - 5 - 비밀번호 재설정 완료 시 ##### //
export const _findPwChangePwCompleted = () => {
  void _setAmplitudeEvents(amplitudeConstant.changePwCompleted);
};

// ##### KEYWORD REPORT - 1 - 사용자가 키워드 검색 요청 시 ##### //
export const _keywordReportKeywordSearched = (
  // platform: TChannelType,
  // country: CountryType,
  // sort_by: TSortedType,
  keyword: string,
) => {
  void _setAmplitudeEvents(amplitudeConstant.keywordSearched, {
    platform: 'SHOPEE',
    country: CountryType.Vn,
    sort_by: 'PRICE_MIN',
    keyword,
  });
};

// ##### KEYWORD REPORT - 2 - 키워드 검색 성공 시 ##### //
export const _keywordReportKeywordSearchedSucceeded = (
  // platform: TChannelType,
  // country: CountryType,
  // sort_by: TSortedType,
  keyword: string,
  relations: SearchDto[],
) => {
  const recKeywords = [...relations].map((value) => {
    return value.text;
  });
  void _setAmplitudeEvents(amplitudeConstant.keywordSearchedSucceeded, {
    platform: 'SHOPEE',
    country: CountryType.Vn,
    sort_by: 'PRICE_MIN',
    keyword,
    rec_keywords: recKeywords,
    num_of_rec_keywords: recKeywords.length,
  });
};

// ##### KEYWORD REPORT - 3 - 키워드 검색 실패 시 ##### //
export const _keywordReportKeywordSearchedFailed = (
  // platform: TChannelType,
  // country: CountryType,
  // sort_by: TSortedType,
  keyword: string,
  reason: string,
) => {
  void _setAmplitudeEvents(amplitudeConstant.keywordSearchedFailed, {
    platform: 'SHOPEE',
    country: CountryType.Vn,
    sort_by: 'PRICE_MIN',
    keyword,
    reason,
  });
};

// ##### KEYWORD REPORT - 4 - 검색어로 추천된 키워드를 클릭해서 검색 시도 시 ##### //
export const _keywordReportRecKeywordSearched = (
  // platform: TChannelType,
  // country: CountryType,
  // sort_by: TSortedType,
  keyword: string,
) => {
  void _setAmplitudeEvents(amplitudeConstant.recKeywordSearched, {
    platform: 'SHOPEE',
    country: CountryType.Vn,
    sort_by: 'PRICE_MIN',
    keyword,
  });
};

// ##### KEYWORD REPORT - 5 - 키워드 리포트 생성 요청 시 ##### //
export const _keywordReportKeywordReportRequested = (
  report_id: number,
  // platform: TChannelType,
  // country: CountryType,
  // sort_by: TSortedType,
  keyword: string,
) => {
  void _setAmplitudeEvents(amplitudeConstant.keywordReportRequested, {
    report_id,
    platform: 'SHOPEE',
    country: CountryType.Vn,
    sort_by: 'PRICE_MIN',
    keyword,
  });
};

// ##### KEYWORD REPORT - 6 - 키워드 리포트 상세 조회 시 ##### //
export const _keywordReportKeywordReportViewed = (
  routeId: string,
  data: TGetMainReport,
) => {
  const report = data.data;
  void _setAmplitudeEvents(amplitudeConstant.keywordReportViewed, {
    report_id: routeId,
    platform: report?.channel,
    country: report?.country,
    sort_by: report?.sorted,
    keyword: report?.text,
  });
};
// ##### KEYWORD REPORT - 7 - 키워드 리포트 생성 요청 시 ##### //
export const _keywordReportKeywordReportDeleted = (checkedItems: TReportItem[]) => {
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

// ##### REPORT ENGAGEMENT - 1 - 사용자 가이드 페이지로 이동하는 링크 클릭 시 ##### //
export const _reportEngagementMovedToUserGuide = (
  link_location: string,
  move_link: string,
) => {
  void _setAmplitudeEvents(amplitudeConstant.movedToUserGuide, {
    link_location,
  });
  window.open(`${move_link}`, '_blank');
};

// ##### REPORT ENGAGEMENT - 2 - 특정 키워드의 SERP로 이동하는 링크 클릭 시 ##### //
export const _reportEngagementMovedToSERP = (
  report_id: string,
  keyword: string,
  rec_keyword: string,
  move_link: string,
) => {
  void _setAmplitudeEvents(amplitudeConstant.movedToSERP, {
    report_id,
    keyword,
    rec_keyword,
  });
  window.open(`${move_link}`, '_blank');
};

// ##### REPORT ENGAGEMENT - 3 - 특정 상품의 상세페이지로 넘어가는 링크 클릭 시 ##### //
export const _reportEngagementMovedToPDP = (
  report_id: string,
  keyword: string,
  link_location: string,
  move_link: string,
) => {
  void _setAmplitudeEvents(amplitudeConstant.movedToPDP, {
    report_id,
    keyword,
    link_location,
  });
  window.open(`${move_link}`, '_blank');
};

// ##### KEYWORD TRANSLATION - 1 - 키워드 번역 요청 시 ##### //
export const _keywordTranslationKeywordTranslated = (
  language: string,
  keyword: string,
) => {
  void _setAmplitudeEvents(amplitudeConstant.keywordTranslated, {
    language,
    keyword,
  });
};

// ##### KEYWORD TRANSLATION - 2 - 번역된 키워드를 검색 요청 시 ##### //
export const _keywordTranslationTranslatedSearched = (
  // platform: TChannelType,
  // country: CountryType,
  // sort_by: TSortedType,
  keyword: string,
) => {
  void _setAmplitudeEvents(amplitudeConstant.keywordTranslated, {
    platform: 'SHOPEE',
    country: CountryType.Vn,
    sort_by: 'PRICE_MIN',
    keyword,
  });
};
