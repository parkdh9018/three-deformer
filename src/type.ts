type DirectionType = 'x' | 'y' | 'z';

interface TwistOption {
    direction : DirectionType
}

interface TaperOption {
    direction : DirectionType
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
