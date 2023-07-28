import { RefObject } from 'react';

export const scrollController = (
  scrollInfo: RefObject<HTMLDivElement> | RefObject<HTMLTableRowElement>,
  top: number,
  left: number,
  behavior: 'smooth' | 'auto' = 'auto',
) => scrollInfo.current?.scroll({ top: top, left: left, behavior: behavior });

export const mobileScrollToTop = (width: number) => {
  if (width) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
};
