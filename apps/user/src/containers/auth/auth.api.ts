import { MeQuery, useExistsUserEmailQuery, useMeQuery } from '@/generated/graphql';
import { graphQLClient } from '@/utils/graphqlCient';
import { isFalsy } from '@/utils/isFalsy';
import { PATH } from '@/types/enum.code';
import { useCookieStorage } from '@/utils/useCookieStorage';
import { _setUserId } from '@/amplitude/amplitude.service';
import { SetterOrUpdater } from 'recoil';

export const useAuth = () => {
  const _useMeQuery = (token: string, _dispach: SetterOrUpdater<MeQuery | undefined>) => {
    return useMeQuery(
      graphQLClient().config,
      {},
      {
        enabled: isFalsy(token) === false,
        refetchOnWindowFocus: false,
        onSuccess: (res) => {
          if (res) {
            _dispach(res);
          }

          console.log('res.me.phone ', res.me.phone);
          if (res.me.phone === '') {
            // navigation(PATH.SIGN_UP_WITH_GOOGLE, {
            //   state: { email: res.me.email, token: token },
            // });
            // return;
          }

          //앰플리튜드에서 사용할 회원 정보 셋팅
          if (isFalsy(useCookieStorage.getCookie('AMPLITUDE_USER_ID'))) {
            _setUserId(res.me.id);
            useCookieStorage.setCookie('AMPLITUDE_USER_ID', 'true', 1);
          }
        },
        onError: (error) => {
          // clearUserInfo();
          // clearAmplitude();
          // navigation(PATH.SIGN_IN);
        },
      },
    );
  };

  return { _useMeQuery };
};
