import { createInstance, HackleProvider } from '@hackler/react-sdk';
import type { HackleReactSDKClient } from '@hackler/react-sdk/lib/client';
import { ReactNode } from 'react';

declare global {
  interface Window {
    hackleClient: HackleReactSDKClient;
  }
}
interface IHackleConfig {
  children: ReactNode;
}

const config = {
  debug: true,
};
const hackleClient = createInstance(import.meta.env.VITE_HACKLE_SDK, config);

const HackleConfig = ({ children }: IHackleConfig) => {
  return <HackleProvider hackleClient={hackleClient}>{children}</HackleProvider>;
};
export default HackleConfig;
window.hackleClient = hackleClient;
