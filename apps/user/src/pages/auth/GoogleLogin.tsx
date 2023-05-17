// https://github.com/anthonyjgrove/react-google-login/issues/502
// https://developers.google.com/identity/gsi/web/reference/js-reference#CredentialResponse
import { useEffect, useRef, useState } from 'react';

import useScript from '@/utils/useScript';
import { GlobalEnv } from '@/api/config';
import { ReactSVG } from 'react-svg';

export default function GoogleLogin({
  onGoogleSignIn = (res: CredentialResponse) => {},
}) {
  const googleSignInButton = useRef<HTMLDivElement>(null);

  // Load the script asynchronously
  const status = useScript(`https://accounts.google.com/gsi/client`, {
    removeOnUnmount: false,
  });

  useEffect(() => {
    if (typeof window.google !== 'undefined') {
      // https://developers.google.com/identity/gsi/web/reference/js-reference#google.accounts.id.initialize
      window.google.accounts.id.initialize({
        client_id: GlobalEnv.viteGoogleClientId,
        callback: onGoogleSignIn,
      });

      if (googleSignInButton.current) {
        window.google.accounts.id.renderButton(googleSignInButton.current, {
          type: 'standard',
          theme: 'outline',
          text: 'signin_with',
          size: 'large',
          width: '416px',
          shape: 'square',
        });
      }
    }
  }, [status]);

  return status === 'ready' ? (
    <div className='relative overflow-hidden'>
      <div className='absolute h-full w-full opacity-0'>
        <div ref={googleSignInButton} id='google-login-button'></div>
      </div>
      <button
        type='button'
        className='button-outlined-normal-xLarge-grey-true-false-true w-full'
      >
        <ReactSVG src='/assets/icons/Google.svg' className='inline-block w-full' />
        구글 로그인
      </button>
    </div>
  ) : null;
}
