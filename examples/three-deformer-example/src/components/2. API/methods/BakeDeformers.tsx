import React from 'react';
import { MethodTemplate } from './template/MethodTemplate';

export const BakeDeformers = () => {
  return (
    <>
      <MethodTemplate
        functionName="bakeDeformers"
        title="bakeDeformers(): void"
      >
        <p className="text-sm text-base-content/80">
          Bakes the currently applied deformation effects into the object's
          geometry.
        </p>
        <p className="text-sm text-base-content/80 mt-2">
          This permanently applies the deformation results to the geometry by
          collapsing the morph targets into the base vertex data. After baking,
          deformers are automatically cleared, and the mesh remains in its
          deformed state.
        </p>
      </MethodTemplate>
    </>
  );
};
