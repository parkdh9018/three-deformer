import { Link } from 'react-router-dom';
import { MethodTemplate } from './template/MethodTemplate';
import { ParameterTable } from './template/ParametersTable';

export const AddTwistDeformer = () => {
  return (
    <MethodTemplate
      functionName="addTwistDeformer"
      title="addTwistDeformer(option?, matrix?): void"
    >
      <p className="text-sm text-base-content/80">
        Adds a twist deformation effect with optional parameters and
        transformation matrix. This is a shorthand for registering a{' '}
        <code>twist</code> deformer.
      </p>
      <div className="text-sm text-base-content/80 mt-2">
        <ParameterTable
          parameters={[
            {
              name: 'option?',
              type: 'TwistOption',
              description: (
                <>
                  Optional settings such as <code>axis</code>,{' '}
                  <code>strength</code>, and <code>invert</code>.
                </>
              ),
            },
            {
              name: 'matrix?',
              type: 'Matrix4',
              description:
                'An optional transformation matrix to apply before the twist.',
            },
          ]}
        />
        <p className="mt-4">
          Use this for quick setup without manual configuration. You can try it
          in the{' '}
          <Link to="/twist" className="text-primary underline">
            Twist Demo
          </Link>
          .
        </p>
      </div>
    </MethodTemplate>
  );
};
