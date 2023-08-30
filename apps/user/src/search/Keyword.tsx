import { NSearchKeywords } from './NSearchKeywords';
import SearchKeywords from '@/search/SearchKeywords';
import { useRecoilValue } from 'recoil';
import { HackleAtom } from '@/atom/common/hackle.atom';
import { Fragment } from 'react';

const Keyword = () => {
  const hackleState = useRecoilValue(HackleAtom);

  if (hackleState.hackleId === null) return <Fragment />;
  return hackleState.hackleId === 'A' ? <SearchKeywords /> : <NSearchKeywords />;
};
export default Keyword;
