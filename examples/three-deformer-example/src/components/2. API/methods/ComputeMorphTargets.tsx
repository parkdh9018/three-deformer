import { ApiLink } from '../../PageComponents/ApiLink';
import { MethodTemplate } from './template/MethodTemplate';
import { ParameterTable } from './template/ParametersTable';

export const ComputeMorphTargets = () => {
  return (
    <MethodTemplate
      functionName="computeMorphTargets"
      title="computeMorphTargets(mesh: Mesh): void"
    >
      <p className="text-sm text-base-content/80 mb-2">
        Generates morph targets based on the currently registered deformation
        effects.
      </p>
      <div className="text-sm text-base-content/80">
        <ParameterTable
          parameters={[
            {
              name: 'mesh',
              type: 'THREE.Mesh',
              description:
                'The target mesh whose geometry will receive the morph targets.',
            },
          ]}
        />
        <p className="mt-2">
          This method stores the result of each deformation as a morph target.
          These can be blended or animated using the mesh’s{' '}
          <code>morphTargetInfluences</code>. It is internally used by{' '}
          <ApiLink functionName="applyDeformers" colorName="info" /> and
          typically does not need to be called directly.
        </p>
      </div>
    </MethodTemplate>
  );
};
