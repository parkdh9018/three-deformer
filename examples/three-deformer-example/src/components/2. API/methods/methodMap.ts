import { ApplyDeformers } from './ApplyDeformers';
import { BakeDeformers } from './BakeDeformers';
import { BakeMesh } from './BakeMesh';
import { RegisterEffect } from './RegisterEffect';
import { UnregisterEffect } from './UnregisterEffect';
import { UpdateMatrix } from './UpdateMatrix';
import { UpdateOption } from './UpdateOption';
import { SetWeight } from './SetWeight';
import { AddDeformer } from './AddDeformer';
import { AddTwistDeformer } from './AddTwistDeformer';
import { AddBendDeformer } from './AddBendDeformer';
import { AddTaperDeformer } from './AddTaperDeformer';
import { AddCustomDeformer } from './AddCustomDeformer';

export const methodMap: Record<string, React.FC> = {
  ApplyDeformers,
  BakeDeformers,
  BakeMesh,
  RegisterEffect,
  UnregisterEffect,
  UpdateMatrix,
  UpdateOption,
  SetWeight,
  AddDeformer,
  AddTwistDeformer,
  AddBendDeformer,
  AddTaperDeformer,
  AddCustomDeformer,
};
