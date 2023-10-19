import { Navigate, Outlet } from 'react-router-dom';
import { PATH, CACHING_KEY } from '@/types/enum.code';
import { authTokenStorage } from '@/utils/authToken';
import { isFalsy } from '@/utils/isFalsy';
import { authReturnUrl } from '@/auth/container';
import { useEffect } from 'react';

import { useRecoilState, useSetRecoilState } from 'recoil';
import { useLocation } from 'react-router-dom';
import {
  _getSubscription,
  storePlansIntoSession,
  _getCategories,
  _getCurrency,
} from '@/common/container';
import { SubscriptionAtom, PlansAtom } from '@/atom';

export default function PrivateRoute() {
  const storageToken = authTokenStorage.getToken();
  const { pathname } = useLocation();
  const { saveReturnUrl } = authReturnUrl();
  const setSubscription = useSetRecoilState(SubscriptionAtom);
  const [plans, setPlans] = useRecoilState(PlansAtom);

  useEffect(() => {
    if (isFalsy(plans) || isFalsy(sessionStorage.getItem(CACHING_KEY.PLANS))) {
      storePlansIntoSession(setPlans);
    }

    _getSubscription(setSubscription);
  }, [pathname]);

  if (isFalsy(storageToken)) {
    saveReturnUrl(window.location.href);
    return <Navigate to={PATH.SIGN_IN} />;
  }

  return <Outlet />;
}
