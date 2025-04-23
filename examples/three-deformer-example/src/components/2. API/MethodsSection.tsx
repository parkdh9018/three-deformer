import { AddBendDeformer } from './methods/AddBendDeformer';
import { AddDeformer } from './methods/AddDeformer';
import { AddTaperDeformer } from './methods/AddTaperDeformer';
import { AddTwistDeformer } from './methods/AddTwistDeformer';
import { ApplyDeformers } from './methods/ApplyDeformers';
import { BakeDeformers } from './methods/BakeDeformers';
import { BakeMesh } from './methods/BakeMesh';
import { ComputeMorphTargets } from './methods/ComputeMorphTargets';
import { RegisterEffect } from './methods/RegisterEffect';
import { SetWeight } from './methods/SetWeight';
import { UnregisterEffect } from './methods/UnregisterEffect';
import { UpdateMatrix } from './methods/UpdateMatrix';
import { UpdateOption } from './methods/UpdateOption';

export const MethodsSection = () => {
  return (
    <>
      <h3 className="text-2xl font-semibold mb-4">Methods</h3>
      <ApplyDeformers />
      <ComputeMorphTargets />
      <BakeDeformers />
      <BakeMesh />
      <RegisterEffect />
      <UnregisterEffect />
      <UpdateMatrix />
      <UpdateOption />
      <SetWeight />
      <AddDeformer />
      <AddTwistDeformer />
      <AddTaperDeformer />
      <AddBendDeformer />
    </>
  );
};
