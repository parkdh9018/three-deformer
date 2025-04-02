import { atom } from 'recoil';
import { EffectType } from 'three-deformer';

export type EffectTypeWithCustom = EffectType | 'custom';
export const deformerTypeList = [
  'twist',
  'taper',
  'bend',
  'custom',
] as EffectTypeWithCustom[];

export const selectedDeformerState = atom<EffectTypeWithCustom>({
  key: 'selectedDeformerState',
  default: deformerTypeList[0],
});
