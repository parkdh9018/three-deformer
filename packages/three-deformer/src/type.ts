type DirectionType = 'x' | 'y' | 'z';

interface TwistOption {
  direction: DirectionType;
  invert: boolean;
}

interface TaperOption {
  direction: DirectionType;
  invert: boolean;
  curveType: 'linear' | 'quadratic' | 'sin' | 'cubic';
}

interface BendOption {
  direction: DirectionType;
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
