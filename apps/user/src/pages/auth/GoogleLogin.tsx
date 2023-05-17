// https://github.com/anthonyjgrove/react-google-login/issues/502
// https://developers.google.com/identity/gsi/web/reference/js-reference#CredentialResponse
import { useEffect, useRef } from 'react';

import useScript from '@/utils/useScript';
import { GlobalEnv } from '@/api/config';

export default function GoogleLogin({
  onGoogleSignIn = (res: CredentialResponse) => {},
}) {
  const googleSignInButton = useRef<HTMLDivElement>(null);

  // Load the script asynchronously
  const status = useScript(`https://accounts.google.com/gsi/client`);

  useEffect(() => {
    if (typeof window.google !== 'undefined') {
      // https://developers.google.com/identity/gsi/web/reference/js-reference#google.accounts.id.initialize
      window.google.accounts.id.initialize({
        client_id: GlobalEnv.viteGoogleClientId,
        callback: onGoogleSignIn,
      });
      if (googleSignInButton.current) {
        // https://developers.google.com/identity/gsi/web/reference/js-reference#google.accounts.id.renderButton
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

  return <div ref={googleSignInButton} id='google-login-btn'></div>;
}
