import { useVariation } from '@hackler/react-sdk';

interface IUseHackleVariation {
  key: number;
}
export const UseHackleVariation = ({ key }: IUseHackleVariation) => {
  const variation = useVariation(key);
  return {
    variation,
  };
};
