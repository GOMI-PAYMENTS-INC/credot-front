import { atom } from 'recoil';

export const SideBarCollapseAtom = atom<boolean>({
  key: 'sideBarVisibility',
  default: true,
});
