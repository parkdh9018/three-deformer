import { MethodTemplate } from './template/MethodTemplate';
import { ParameterTable } from './template/ParametersTable';

export const BakeMesh = () => {
  return (
    <>
      <MethodTemplate
        functionName="bakeMesh"
        title="bakeMesh(mesh: Mesh): void"
      >
        <p className="text-sm text-base-content/80">
          Applies all active deformation effects and directly updates the
          provided mesh's geometry with the result.
        </p>
        <div className="text-sm text-base-content/80 mt-2">
          <ParameterTable
            parameters={[
              {
                name: 'mesh',
                type: 'THREE.Mesh',
                description: 'The mesh to apply the baked geometry to.',
              },
            ]}
          />
          <p className="mt-2">
            This is useful when working with multiple meshes under a group or
            when applying deformation to a cloned object.
          </p>
        </div>
      </MethodTemplate>
    </>
  );
};
