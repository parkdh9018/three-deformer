import { MethodTemplate } from './template/MethodTemplate';
import { ParameterTable } from './template/ParametersTable';

export const RegisterEffect = () => {
  return (
    <MethodTemplate
      functionName="registerEffect"
      title="registerEffect(name, effectFunction, matrix?, option?): void"
    >
      <p className="text-sm text-base-content/80">
        Registers a deformation effect manually. This method is used internally
        by <code>addDeformer</code>, but can be used directly to attach custom
        effects.
      </p>
      <div className="text-sm text-base-content/80 mt-2">
        <ParameterTable
          parameters={[
            {
              name: 'name',
              type: 'string',
              description: 'A unique identifier for the effect.',
            },
            {
              name: 'effectFunction',
              type: 'DeformerEffectFunction | CustomEffectFunction',
              description:
                'A function that transforms each vertex based on logic you define.',
            },
            {
              name: 'matrix?',
              type: 'Matrix4',
              description:
                'Optional matrix transformation applied before the effect.',
            },
            {
              name: 'option?',
              type: 'EffectOption',
              description: (
                <>
                  Optional parameters such as <code>axis</code>,{' '}
                  <code>strength</code>, etc.
                </>
              ),
            },
          ]}
        />
        <p className="mt-4">
          This is useful for advanced use cases where you want fine-grained
          control over deformation behavior.
        </p>
      </div>
    </MethodTemplate>
  );
};
