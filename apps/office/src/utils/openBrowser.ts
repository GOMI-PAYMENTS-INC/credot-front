import { _introPageMovedToSolution } from '@/amplitude/amplitude.service';
import type { MouseEvent } from 'react';
export const openBrowser = (url: string) => {
  window.open(url);
};

export const openAppWithTag = (params: {
  url: string;
  path: string;
  type: string;
  location: string;
  event: MouseEvent<HTMLElement>;
}) => {
  const { url, path, type, location, event } = params;
  const eventTarget = event.target as HTMLElement;
  _introPageMovedToSolution(path, type, location, eventTarget.innerText);
  openBrowser(url);
};
