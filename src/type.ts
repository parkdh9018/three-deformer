type DirectionType = 'x' | 'y' | 'z';

interface TwistOption {
    direction : DirectionType
}

interface TaperOption {
    direction : DirectionType
}

interface EffectOption {
    twist : TwistOption
    taper : TaperOption
}