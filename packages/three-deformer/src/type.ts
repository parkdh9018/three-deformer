type AxisType = 'x' | 'y' | 'z';

interface TwistOption {
  axis: AxisType;
  invert: boolean;
}

interface TaperOption {
  axis: AxisType;
  invert: boolean;
  curveType: 'linear' | 'quadratic' | 'sin' | 'cubic';
}

interface BendOption {
  axis: AxisType;
  invert: boolean;
  angle: number;
}

interface EffectOptionMap {
  twist: TwistOption;
  taper: TaperOption;
  bend: BendOption;
}

type EffectType = keyof EffectOptionMap;
type EffectOption = EffectOptionMap[EffectType];
