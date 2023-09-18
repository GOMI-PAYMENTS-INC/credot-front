import { CACHING_KEY } from '@/types/enum.code';
import { useSessionStorage } from '@/utils/useSessionStorage';
import { isFalsy } from '@/utils/isFalsy';
import { checkUserDevice } from '@/utils/checkUserDevice';

const isNewMember = (compareKey: number, userId: number) => {
  if (compareKey <= userId) {
    return true;
  }
  if (compareKey > userId) {
    return false;
  }
};

export const generateHackleConfig = (userId: number) => {
  const config = useSessionStorage.getItem(CACHING_KEY.HACKLE);

  if (config) {
    return updateHackleConfig();
  }
  const COMPARE_KEY = 1330;
  const variation = isNewMember(COMPARE_KEY, userId);

  const isMobile = checkUserDevice();

  const { deviceId } = window.hackleClient.getUser();
  const user = {
    deviceId: deviceId,
    userId: userId.toString(),
    properties: { newMember: variation, isMobile: isMobile },
  };

  useSessionStorage.setItem(CACHING_KEY.HACKLE, user);
  return user;
};

const updateHackleConfig = () => {
  const { properties } = window.hackleClient.getUser();

  if (properties) return;
  const config = useSessionStorage.getItem(CACHING_KEY.HACKLE);

  if (config && isFalsy(properties)) {
    return window.hackleClient.setUser(config);
  }
};
