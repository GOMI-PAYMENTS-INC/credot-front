import { Navigate, Outlet } from 'react-router-dom';
import { PATH } from '@/types/enum.code';
import { authTokenStorage } from '@/utils/authToken';
import { isFalsy } from '@/utils/isFalsy';
import { authReturnUrl } from '@/auth/container';
import { useRecoilValue, useRecoilState } from 'recoil';
import { HackleId } from '@/atom/common/hackle.atom';

import { UserAtom } from '@/atom/auth/auth-atom';

import { postVariation } from './api';
export default function PrivateRoute() {
  const storageToken = authTokenStorage.getToken();

  const { saveReturnUrl } = authReturnUrl();

  const userInfo = useRecoilValue(UserAtom);
  const [_hackleId, _setHackleId] = useRecoilState(HackleId);

  // 인증을 안했을 경우 로그인 페이지로, 했을 경우 해당 페이지로

  if (isFalsy(storageToken)) {
    saveReturnUrl(window.location.href);

    return <Navigate to={PATH.SIGN_IN} />;
  }

  // if (userInfo?.me.id === null || HackleId === null)
  //   return (
  //     <div className='flex h-full w-full items-center justify-center'>
  //       <div className='scale-[0.3]'>
  //         <div id='loader' />
  //       </div>
  //     </div>
  //   );

  // if (window.hackleClient.getUser().properties?.newMember && isFalsy(_hackleId)) {
  //   postVariation({ experimentKey: 9, user: window.hackleClient.getUser() });
  // }

  return <Outlet />;
}
