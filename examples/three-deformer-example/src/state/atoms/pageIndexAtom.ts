import { atom } from 'recoil';

export const pageIndexState = atom<number>({
  key: 'pageIndexState',
  default: 0,
});
