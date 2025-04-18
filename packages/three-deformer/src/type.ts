import { Matrix4, Vector3 } from 'three';

export type AxisType = 'x' | 'y' | 'z';
export type CurveType = 'linear' | 'quadratic' | 'sin' | 'cubic';
export interface TwistOption {
  axis?: AxisType;
  invert?: boolean;
  strength?: number;
}

export interface TaperOption {
  axis?: AxisType;
  invert?: boolean;
  curveType?: CurveType;
}

export interface BendOption {
  axis?: AxisType;
  invert?: boolean;
  angle?: number;
}

export interface EffectOptionMap {
  twist: TwistOption;
  taper: TaperOption;
  bend: BendOption;
}

export type EffectType = keyof EffectOptionMap;
export type EffectOption = EffectOptionMap[EffectType];

export type CustomEffectFunction = (
  vertex: Vector3,
  option?: object,
  index?: number,
) => Vector3;

export type DeformerEffectFunction = (
  vertex: Vector3,
  index?: number,
) => Vector3;

export type DeformerEffectType = 'builtin' | 'custom';

export type DeformerEffect = {
  type: DeformerEffectType;
  effectFunction: DeformerEffectFunction | CustomEffectFunction;
  matrix: Matrix4;
  option: object;
  weight: number;
};
