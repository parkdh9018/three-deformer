import { MethodTemplate } from './template/MethodTemplate';

export const ApplyDeformers = () => {
  return (
    <MethodTemplate
      functionName="applyDeformers"
      title="applyDeformers(): void"
    >
      <p className="text-sm text-base-content/80">
        Applies all currently registered deformation effects to the object.
      </p>
      <p className="text-sm text-base-content/80 mt-2">
        This method computes morph targets for each effect and updates the
        geometry accordingly. You should call this after adding or modifying any
        effect to ensure the mesh reflects the updated deformation.
      </p>
    </MethodTemplate>
  );
};
