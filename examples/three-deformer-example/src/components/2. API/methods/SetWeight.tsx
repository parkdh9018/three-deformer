import { MethodTemplate } from './template/MethodTemplate';
import { ParameterTable } from './template/ParametersTable';

export const SetWeight = () => {
  return (
    <MethodTemplate
      functionName="setWeight"
      title="setWeight(name: string, weight: number): void"
    >
      <p className="text-sm text-base-content/80">
        Sets the influence of a specific deformation effect. This value
        determines how strongly the effect is applied to the mesh.
      </p>
      <div className="text-sm text-base-content/80 mt-2">
        <ParameterTable
          parameters={[
            {
              name: 'name',
              type: 'string',
              description: 'The name of the registered effect.',
            },
            {
              name: 'weight',
              type: 'number',
              description: (
                <>
                  A number between <code>0</code> and <code>1</code>{' '}
                  representing the effect&apos;s influence.
                </>
              ),
            },
          ]}
        />
        <p className="mt-4">
          A weight of <code>0</code> disables the effect, while <code>1</code>{' '}
          applies it fully. Intermediate values allow blending.
        </p>
      </div>
    </MethodTemplate>
  );
};
