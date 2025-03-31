import { atom } from 'recoil';

// TODO : 타입은 나중에 옮기자
export const deformerTypeList = ['twist', 'taper', 'bend', 'custom'] as const;
export type DeformerType = (typeof deformerTypeList)[number];

export const selectedDeformerState = atom<DeformerType>({
  key: 'selectedDeformerState',
  default: 'custom',
});
