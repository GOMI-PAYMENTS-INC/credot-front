import { Navigate, Outlet } from 'react-router-dom';
import { PATH } from '@/types/enum.code';
import { authTokenStorage } from '@/utils/authToken';
import { isFalsy } from '@/utils/isFalsy';
import { authReturnUrl } from '@/auth/container';
import { Fragment, useEffect } from 'react';
import { generateHackleConfig } from '@/router/container';
import { HackleExperiment, HackleVariation, type Variation } from '@hackler/react-sdk';
import { useRecoilState } from 'recoil';
import { HackleId } from '@/atom/common/hackle.atom';
import { UserAtom } from '@/atom/auth/auth-atom';
import { useRecoilValue } from 'recoil';

export default function PrivateRoute() {
  const storageToken = authTokenStorage.getToken();
  const userInfo = useRecoilValue(UserAtom);
  const [_hackleId, _setHackleId] = useRecoilState(HackleId);
  const { saveReturnUrl } = authReturnUrl();

  if (isFalsy(storageToken)) {
    saveReturnUrl(window.location.href);
    return <Navigate to={PATH.SIGN_IN} />;
  }

  useEffect(() => {
    if (userInfo?.me.id && window.hackleClient.getUser().properties === undefined) {
      const user = generateHackleConfig(userInfo?.me.id!, (config: THackleId | null) =>
        _setHackleId(config),
      );
      if (user) window.hackleClient.setUser(user);
    }
  }, [userInfo?.me.id]);
  if (_hackleId === null) return <Fragment />;

  return (
    <HackleExperiment experimentKey={10}>
      <HackleVariation variation={'A'}>
        <Outlet />
      </HackleVariation>
      <HackleVariation variation={'B'}>
        <Outlet />
      </HackleVariation>
      <HackleVariation variation={'C'}>
        <Outlet />
      </HackleVariation>
    </HackleExperiment>
  );
}
