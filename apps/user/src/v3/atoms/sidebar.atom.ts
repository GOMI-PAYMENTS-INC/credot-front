import { atom } from 'recoil';

export const SideBarVisibility = atom<boolean>({
  key: 'sideBarVisibility',
  default: true,
});
