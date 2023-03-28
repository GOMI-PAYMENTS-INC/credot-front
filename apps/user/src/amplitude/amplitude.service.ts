import { CountryType, Role, SearchDto, User } from '@/generated/graphql';
import { amplitudeConstant } from '@/amplitude/amplitude.constant';
import { AccountType } from '@/amplitude/amplitude.enum';
import { CHANNEL_TYPE, SORTED_TYPE } from '@/types/enum.code';

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
export const _amplitudeLoggedIn = (provider: AccountType) => {
  void _setAmplitudeEvents(amplitudeConstant.loggedIn, {
    provider,
  });
};

// ##### GENERAL - 2 - 로그아웃 완료 시 이벤트 ##### //
export const _amplitudeLoggedOut = async (callBackEvent?: () => void) => {
  await _setAmplitudeEvents(amplitudeConstant.loggedOut, {}, callBackEvent);
};

// ##### GENERAL - 3 - 휴대폰 인증 완료 시 이벤트 ##### //
export const _amplitudeMobileVerified = (phoneNumber: string) => {
  void _setAmplitudeEvents(amplitudeConstant.mobileVerified, {
    phone_number: phoneNumber,
  });
};

// ##### SIGNUP - 1 - 회원가입 화면 랜딩 시 이벤트 ##### //
export const _amplitudeSignupStarted = (provider: AccountType) => {
  void _setAmplitudeEvents(amplitudeConstant.signupStarted, {
    provider,
  });
};

// ##### SIGNUP - 2 - 회원가입 완료 이벤트 ##### //
export const _amplitudeSignupCompleted = async (
  provider: AccountType,
  email: string,
  phoneNumber: string,
  //marketing_notification: boolean,
  callBackEvent?: () => void,
) => {
  await _setAmplitudeEvents(
    amplitudeConstant.signupCompleted,
    {
      provider,
      email,
      phone_number: phoneNumber,
      marketing_notification: false,
    },
    callBackEvent,
  );
};

// ##### FIND ID - 1 - 아이디 찾기 화면 랜딩 시 ##### //
export const _amplitudeFindIdStarted = () => {
  void _setAmplitudeEvents(amplitudeConstant.findIdStarted);
};
// ##### FIND ID - 2 - 아이디 안내 화면 랜딩 시 ##### //
export const _amplitudeFindIdSucceeded = () => {
  void _setAmplitudeEvents(amplitudeConstant.findIdSucceeded);
};
// ##### FIND ID - 3 - 아이디 없음 화면 랜딩 시 ##### //
export const _amplitudeFindIdFailed = () => {
  void _setAmplitudeEvents(amplitudeConstant.findIdFailed);
};

// ##### FIND PW - 1 - 비밀번호 찾기 화면 랜딩 시 ##### //
export const _amplitudeFindPwStarted = () => {
  void _setAmplitudeEvents(amplitudeConstant.findPwStarted);
};
// ##### FIND PW - 2 - 임시 비밀번호 발송 했을 시 ##### //
export const _amplitudeFindPwSucceeded = () => {
  void _setAmplitudeEvents(amplitudeConstant.findPwSucceeded);
};
// ##### FIND PW - 3 - 비밀번호 찾기 실패 했을 시 ##### //
export const _amplitudeFindPwFailed = () => {
  void _setAmplitudeEvents(amplitudeConstant.findPwFailed);
};
// ##### FIND PW - 4 - 비밀번호 재설정 화면 랜딩 시 ##### //
export const _amplitudeChangePwStarted = () => {
  void _setAmplitudeEvents(amplitudeConstant.changePwStarted);
};
// ##### FIND PW - 5 - 비밀번호 재설정 완료 시 ##### //
export const _amplitudeChangePwCompleted = () => {
  void _setAmplitudeEvents(amplitudeConstant.changePwCompleted);
};

// ##### KEYWORD REPORT - 1 - 사용자가 키워드 검색 요청 시 ##### //
export const _amplitudeKeywordSearched = (
  // platform: TChannelType,
  // country: CountryType,
  // sort_by: TSortedType,
  keyword: string,
) => {
  void _setAmplitudeEvents(amplitudeConstant.keywordSearched, {
    platform: CHANNEL_TYPE.SHOPEE,
    country: CountryType.Vn,
    sort_by: SORTED_TYPE.PRICE_MIN,
    keyword,
  });
};

// ##### KEYWORD REPORT - 2 - 키워드 검색 성공 시 ##### //
export const _amplitudeKeywordSearchedSucceeded = (
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
    platform: CHANNEL_TYPE.SHOPEE,
    country: CountryType.Vn,
    sort_by: SORTED_TYPE.PRICE_MIN,
    keyword,
    rec_keywords: recKeywords,
    num_of_rec_keywords: recKeywords.length,
  });
};

// ##### KEYWORD REPORT - 3 - 키워드 검색 실패 시 ##### //
export const _amplitudeKeywordSearchedFailed = (
  // platform: TChannelType,
  // country: CountryType,
  // sort_by: TSortedType,
  keyword: string,
  reason: string,
) => {
  void _setAmplitudeEvents(amplitudeConstant.keywordSearchedFailed, {
    platform: CHANNEL_TYPE.SHOPEE,
    country: CountryType.Vn,
    sort_by: SORTED_TYPE.PRICE_MIN,
    keyword,
    reason,
  });
};

// ##### KEYWORD REPORT - 4 - 검색어로 추천된 키워드를 클릭해서 검색 시도 시 ##### //
export const _amplitudeRecKeywordSearched = (
  // platform: TChannelType,
  // country: CountryType,
  // sort_by: TSortedType,
  keyword: string,
) => {
  void _setAmplitudeEvents(amplitudeConstant.recKeywordSearched, {
    platform: CHANNEL_TYPE.SHOPEE,
    country: CountryType.Vn,
    sort_by: SORTED_TYPE.PRICE_MIN,
    keyword,
  });
};

// ##### KEYWORD REPORT - 5 - 키워드 리포트 생성 요청 시 ##### //
export const _amplitudeKeywordReportRequested = (
  reportId: number,
  // platform: TChannelType,
  // country: CountryType,
  // sort_by: TSortedType,
  keyword: string,
) => {
  void _setAmplitudeEvents(amplitudeConstant.keywordReportRequested, {
    report_id: reportId,
    platform: CHANNEL_TYPE.SHOPEE,
    country: CountryType.Vn,
    sort_by: SORTED_TYPE.PRICE_MIN,
    keyword,
  });
};

// ##### KEYWORD REPORT - 6 - 키워드 리포트 상세 조회 시 ##### //
export const _amplitudeKeywordReportViewed = (routeId: string, data: TGetMainReport) => {
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

// ##### REPORT ENGAGEMENT - 1 - 사용자 가이드 페이지로 이동하는 링크 클릭 시 ##### //
export const _amplitudeMovedToUserGuide = (link_location: string) => {
  void _setAmplitudeEvents(amplitudeConstant.movedToUserGuide, {
    link_location,
  });
};

// ##### REPORT ENGAGEMENT - 2 - 특정 키워드의 SERP로 이동하는 링크 클릭 시 ##### //
export const _amplitudeMovedToSERP = (
  reportId: string,
  keyword: string,
  recKeyword: string,
) => {
  void _setAmplitudeEvents(amplitudeConstant.movedToSERP, {
    report_id: reportId,
    keyword,
    rec_keyword: recKeyword,
  });
};

// ##### REPORT ENGAGEMENT - 3 - 특정 상품의 상세페이지로 넘어가는 링크 클릭 시 ##### //
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

// ##### KEYWORD TRANSLATION - 1 - 키워드 번역 요청 시 ##### //
export const _amplitudeKeywordTranslated = (language: string, keyword: string) => {
  void _setAmplitudeEvents(amplitudeConstant.keywordTranslated, {
    language,
    keyword,
  });
};

// ##### KEYWORD TRANSLATION - 2 - 번역된 키워드를 검색 요청 시 ##### //
export const _amplitudeTranslatedSearched = (
  // platform: TChannelType,
  // country: CountryType,
  // sort_by: TSortedType,
  keyword: string,
) => {
  void _setAmplitudeEvents(amplitudeConstant.keywordTranslated, {
    platform: CHANNEL_TYPE.SHOPEE,
    country: CountryType.Vn,
    sort_by: SORTED_TYPE.PRICE_MIN,
    keyword,
  });
};
