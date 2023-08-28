import { HTTP } from '@/api/axiosConfig';
import type { User } from '@hackler/react-sdk';

export const postVariation = async (params: { experimentKey: number; user: User }) => {
  const URL = 'https://api.hackle.io/v1/variation';

  const response = await HTTP.post(
    URL,
    { ...params, noSnake: true },
    {
      headers: {
        'X-HACKLE-API-KEY': import.meta.env.VITE_HACKLE_SDK,
      },
    },
  );

  return response;
};
