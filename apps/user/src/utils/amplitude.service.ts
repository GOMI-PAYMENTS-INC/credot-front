import { MeQuery, Role, User } from '@/generated/graphql';
import { events } from '@/types/events';
import { AccountType } from '@/types/enum.code';

declare var amplitude;

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
  } catch (e) {
    console.log(e);
  }
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
  void _setAmplitudeEvents(events.loggedIn, {
    provider,
  });
};

// ##### GENERAL - 2 - 로그아웃 완료 시 이벤트 ##### //
export const _generalLoggedOut = async (callBackEvent?: () => void) => {
  await _setAmplitudeEvents(events.loggedOut, {}, callBackEvent);
};

// ##### GENERAL - 3 - 휴대폰 인증 완료 시 이벤트 ##### //
export const _generalMobileVerified = (phone_number: string) => {
  void _setAmplitudeEvents(events.mobileVerified, { phone_number });
};

// ##### SIGNUP - 1 - 회원가입 화면 랜딩 시 이벤트 ##### //
export const _signupSignupStarted = (provider: AccountType) => {
  void _setAmplitudeEvents(events.signupStarted, {
    provider,
  });
};

// ##### SIGNUP - 2 - 회원가입 완료 이벤트 ##### //
export const _signupSignupCompleted = (
  provider: AccountType,
  email: string,
  phone_number: string,
  marketing_notification: boolean,
) => {
  void _setAmplitudeEvents(events.signupCompleted, {
    provider,
    email,
    phone_number,
    marketing_notification,
  });
};

// ##### FIND ID - 1 - 아이디 찾기 화면 랜딩 시 ##### //
export const _findIdFindIdStarted = () => {
  void _setAmplitudeEvents(events.findIdStarted);
};
// ##### FIND ID - 2 - 아이디 안내 화면 랜딩 시 ##### //
export const _findIdFindIdSucceeded = () => {
  void _setAmplitudeEvents(events.findIdSucceeded);
};
// ##### FIND ID - 3 - 아이디 없음 화면 랜딩 시 ##### //
export const _findIdFindIdFailed = () => {
  void _setAmplitudeEvents(events.findIdFailed);
};
