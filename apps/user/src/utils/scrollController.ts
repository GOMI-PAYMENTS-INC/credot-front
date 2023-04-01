import { RefObject } from 'react';

export const scrollController = (
  scrollInfo: RefObject<HTMLDivElement> | RefObject<HTMLTableRowElement>,
  top: number,
  left: number,
  behavior: 'smooth' | 'auto' = 'auto',
) => scrollInfo.current?.scroll({ top: top, left: left, behavior: behavior });
