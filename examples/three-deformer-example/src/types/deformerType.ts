import { EffectType } from 'three-deformer';

export type EffectTypeWithCustom = EffectType | 'custom';
export const deformerTypeList = [
  'twist',
  'taper',
  'bend',
  'custom',
] as EffectTypeWithCustom[];
