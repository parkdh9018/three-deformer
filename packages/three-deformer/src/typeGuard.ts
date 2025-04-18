import {
  CustomEffectFunction,
  DeformerEffect,
  DeformerEffectFunction,
  EffectType,
} from './type';

const EffectTypeList = ['twist', 'taper', 'bend'] as const;

export const isCustomEffect = (
  effect: DeformerEffect,
): effect is DeformerEffect & {
  effectFunction: CustomEffectFunction;
  type: 'custom';
} => effect.type === 'custom';

export const isBuiltinEffect = (
  effect: DeformerEffect,
): effect is DeformerEffect & {
  effectFunction: DeformerEffectFunction;
  type: 'builtin';
} => effect.type === 'builtin';

export const isEffectType = (name: string): name is EffectType =>
  EffectTypeList.includes(name as EffectType);
