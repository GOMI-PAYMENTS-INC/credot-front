// 회원정보 가져오기
import {useMeQuery} from "@/generated/graphql";
import {graphQLClient} from "@/utils/graphqlCient";
import {isFalsy} from "@/utils/isFalsy";
import {getCookie, setCookie} from "@/utils/cookie";
import {_setUserId} from "@/amplitude/amplitude.service";

const {
  data: userInfo,
  isLoading: isLoadingUserInfo,
  refetch: refetchUserInfo,
  remove: removeUserInfo,
} = useMeQuery(
  graphQLClient,
  {},
  {
    onSuccess: async (res) => {
      // if (isFalsy(getCookie('SET_EVENT_USER_ID'))) {
      //   //앰플리튜드에서 사용할 회원 정보 셋팅
      //   _setUserId(res.me.id);
      //   setCookie('SET_EVENT_USER_ID', 'true', 1);
      // }
    },
    onError: (error) => {
      // if (error instanceof Error) {
      //   console.error(error, 'error : )');
      //   throw new Error(error.message, error);
      // }
      // onLogout();
    },
    // refetchOnWindowFocus: false,
    enabled: false,
  },
);