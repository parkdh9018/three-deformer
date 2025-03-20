type DirectionType = 'x' | 'y' | 'z';

interface TwistOption {
    direction : DirectionType
}

interface TaperOption {
    direction : DirectionType
    invert : boolean
    curveType :  'linear' | 'quadratic' | 'sin' | 'cubic'
}

interface SpherifyOption {
    // empty
}

interface EffectOptionMap {
    twist : TwistOption
    taper : TaperOption
    spherify : SpherifyOption
}

type EffectType = keyof EffectOptionMap;
type EffectOption = EffectOptionMap[EffectType];
