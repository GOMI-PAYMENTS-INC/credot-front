import { CACHING_KEY } from '@/types/enum.code';
import { useSessionStorage } from '@/utils/useSessionStorage';
import { isFalsy } from '@/utils/isFalsy';

const getTestKey = (compareKey: number, userId: number) => {
  if (compareKey <= userId) {
    return userId % 2 === 0 ? 'C' : 'B';
  }
  if (compareKey > userId) {
    return 'A';
  }
};

export const generateHackleConfig = (userId: number, callback: Function) => {
  const COMPARE_KEY = 1260;
  const varidation = getTestKey(COMPARE_KEY, userId);

  const { deviceId } = window.hackleClient.getUser();
  const user = {
    deviceId: deviceId,
    userId: userId.toString(),
    properties: { varidation },
  };
  callback(varidation);
  useSessionStorage.setItem(CACHING_KEY.HACKLE, user);
  return user;
};

export const updateHackleConfig = (callback: Function) => {
  const { properties } = window.hackleClient.getUser();

  if (properties) return;
  const config = useSessionStorage.getItem(CACHING_KEY.HACKLE);

  if (config && isFalsy(properties)) {
    callback(config.properties.varidation);
    return window.hackleClient.setUser(config);
  }
};
