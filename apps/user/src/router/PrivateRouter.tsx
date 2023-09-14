import { Navigate, Outlet } from 'react-router-dom';
import { PATH } from '@/types/enum.code';
import { authTokenStorage } from '@/utils/authToken';
import { isFalsy } from '@/utils/isFalsy';
import { authReturnUrl } from '@/auth/container';
import { useEffect } from 'react';

import { useRecoilState } from 'recoil';
import { useLocation } from 'react-router-dom';
import { _getSubscription, storePlansIntoSession } from '@/common/container';
import { SubscriptionAtom } from '@/atom';
import { CACHING_KEY } from '@/types/enum.code';

export default function PrivateRoute() {
  const storageToken = authTokenStorage.getToken();
  const { pathname } = useLocation();
  const { saveReturnUrl } = authReturnUrl();
  const [subscription, setSubscription] = useRecoilState(SubscriptionAtom);

  useEffect(() => {
    if (isFalsy(sessionStorage.getItem(CACHING_KEY.PLANS))) {
      storePlansIntoSession();
    }
    _getSubscription(setSubscription);
  }, [pathname]);

  if (isFalsy(storageToken)) {
    saveReturnUrl(window.location.href);
    return <Navigate to={PATH.SIGN_IN} />;
  }

  return <Outlet />;
}
