import { MethodTemplate } from './template/MethodTemplate';
import { ParameterTable } from './template/ParametersTable';

export const UpdateOption = () => {
  return (
    <MethodTemplate
      functionName="updateOption"
      title="updateOption(name, option): void"
    >
      <p className="text-sm text-base-content/80">
        Updates the configuration option of a registered deformation effect.
        This can be used to dynamically modify parameters such as{' '}
        <code>axis</code>, <code>strength</code>, or any other effect-specific
        setting.
      </p>
      <div className="text-sm text-base-content/80 mt-2">
        <ParameterTable
          parameters={[
            {
              name: 'name',
              type: 'EffectType',
              description: 'The name of the effect to update.',
            },
            {
              name: 'option',
              type: 'Partial<BendOption | TwistOption | TaperOption | CustomOption>',
              description: (
                <>
                  An object containing effect-specific parameters.
                  <br />
                  For example: <code>axis</code>, <code>strength</code>,{' '}
                  <code>curveType</code>, etc.
                  <br />
                  Only the provided keys will be updated.
                </>
              ),
            },
          ]}
        />
        <p className="mt-4">
          Internally, this will remove and re-register the effect with the
          updated options.
        </p>
      </div>
    </MethodTemplate>
  );
};
