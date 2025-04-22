import { MethodTemplate } from './template/MethodTemplate';
import { ParameterTable } from './template/ParametersTable';

export const UpdateMatrix = () => {
  return (
    <MethodTemplate
      functionName="updateMatrix"
      title="updateMatrix(name: string, matrix: Matrix4): void"
    >
      <p className="text-sm text-base-content/80">
        Updates the transformation matrix for a specific deformation effect.
        This matrix will be applied before the effect logic runs.
      </p>
      <div className="text-sm text-base-content/80 mt-2">
        <ParameterTable
          parameters={[
            {
              name: 'name',
              type: 'string',
              description: 'The identifier of the effect to update.',
            },
            {
              name: 'matrix',
              type: 'Matrix4',
              description:
                'The new transformation matrix to apply before the effect.',
            },
          ]}
        />
        <p className="mt-4">
          Use this when you want to position, scale, or rotate the deformation
          space.
        </p>
      </div>
    </MethodTemplate>
  );
};
