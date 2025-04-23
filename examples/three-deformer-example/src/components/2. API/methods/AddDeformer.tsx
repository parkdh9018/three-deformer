import { MethodTemplate } from './template/MethodTemplate';
import { ParameterTable } from './template/ParametersTable';

export const AddDeformer = () => {
  return (
    <MethodTemplate
      functionName="addDeformer"
      title="addDeformer(name, option?, matrix?): void"
    >
      <p className="text-sm text-base-content/80">
        Adds a built-in deformation effect such as <code>twist</code>,{' '}
        <code>bend</code>, or <code>taper</code> using predefined logic. This is
        a high-level helper method for quickly attaching standard deformers.
      </p>
      <div className="text-sm text-base-content/80 mt-2">
        <ParameterTable
          parameters={[
            {
              name: 'name',
              type: 'EffectType',
              description: 'The type of built-in deformation to apply.',
            },
            {
              name: 'option?',
              type: 'Partial<BendOption | TwistOption | TaperOption>',
              description: (
                <>
                  Optional parameters for the effect such as <code>axis</code>,{' '}
                  <code>strength</code>, or <code>invert</code>.
                </>
              ),
            },
            {
              name: 'matrix?',
              type: 'Matrix4',
              description:
                'An optional transformation matrix to apply before the effect.',
            },
          ]}
        />
        <p className="mt-4">
          Internally, this delegates to lower-level methods like{' '}
          <code>addTwistDeformer</code>.
        </p>
      </div>
    </MethodTemplate>
  );
};
