import { RECOMMANDER_ACTION } from '@/containers/search/reducer';
import { Dispatch } from 'react';

export const switchTranslationTab = (
  _dispatch: Dispatch<TSearchActionType>,
  tabState: boolean,
) => _dispatch({ type: RECOMMANDER_ACTION.USE_TRANSLATION, payload: tabState });
