import type { Dispatch, SetStateAction } from 'react';
import { useSessionStorage } from '@/utils/useSessionStorage';
import { CACHING_KEY } from '@/types/enum.code';

export const updateCategoryPayload = (props: {
  _state: TCategorySearchType;
  _dispatch: Dispatch<SetStateAction<TCategorySearchType>>;
  key: keyof TCategorySearchType;
  params: TSearchCountry | string;
  calledByEvent?: boolean;
}) => {
  const { _state, _dispatch, params, key, calledByEvent } = props;
  const preKeyword = useSessionStorage.getItem(CACHING_KEY.CATEGORY);
  const updatedState = Object.assign({}, _state, { [key]: params });

  console.log(params, 'params');
  // _dispatch(updatedState);
};
