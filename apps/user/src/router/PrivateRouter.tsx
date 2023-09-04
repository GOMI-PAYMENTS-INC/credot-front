import { Navigate, Outlet } from 'react-router-dom';
import { PATH } from '@/types/enum.code';
import { authTokenStorage } from '@/utils/authToken';
import { isFalsy } from '@/utils/isFalsy';
import { authReturnUrl } from '@/auth/container';
import { Fragment, useEffect } from 'react';
import { generateHackleConfig } from '@/router/container';
import {
  HackleExperiment,
  HackleVariation,
  useVariationDetail,
} from '@hackler/react-sdk';
import { useRecoilState } from 'recoil';
import { HackleAtom } from '@/atom/common/hackle.atom';
import { UserAtom } from '@/atom/auth/auth-atom';
import { useRecoilValue } from 'recoil';

export default function PrivateRoute() {
  const storageToken = authTokenStorage.getToken();
  const userInfo = useRecoilValue(UserAtom);
  const [hackleState, _setHackleState] = useRecoilState(HackleAtom);
  const { saveReturnUrl } = authReturnUrl();

  if (isFalsy(storageToken)) {
    saveReturnUrl(window.location.href);
    return <Navigate to={PATH.SIGN_IN} />;
  }

  const variation = useVariationDetail(12);

  useEffect(() => {
    _setHackleState({
      hackleId: variation.variation as THackleId,
      reason: variation.reason as THackleVariationReason,
    });
  }, [variation.reason]);

  useEffect(() => {
    if (userInfo?.me.id && window.hackleClient.getUser().properties === undefined) {
      const user = generateHackleConfig(userInfo?.me.id!);
      if (user) window.hackleClient.setUser(user);
    }
  }, [userInfo?.me.id]);

  if (hackleState.hackleId === null) return <Fragment />;

  return (
    <HackleExperiment experimentKey={12}>
      <HackleVariation variation={'A'}>
        <Outlet />
      </HackleVariation>
      <HackleVariation variation={'B'}>
        <Outlet />
      </HackleVariation>
    </HackleExperiment>
  );
}
