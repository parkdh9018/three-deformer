import { atom } from 'recoil';

// TODO : 타입은 나중에 옮기자
export type DeformerType = 'bend' | 'twist' | 'taper';

export const selectedDeformerState = atom<DeformerType>({
  key: 'selectedDeformerState',
  default: 'twist',
});
