import { MethodTemplate } from './template/MethodTemplate';
import { ParameterTable } from './template/ParametersTable';
import { Link } from 'react-router-dom';

export const AddBendDeformer = () => {
  return (
    <MethodTemplate
      functionName="addBendDeformer"
      title="addBendDeformer(option?, matrix?): void"
    >
      <p className="text-sm text-base-content/80">
        Adds a bend deformation effect with customizable parameters and an
        optional transformation matrix.
      </p>
      <div className="text-sm text-base-content/80 mt-2">
        <ParameterTable
          parameters={[
            {
              name: 'option?',
              type: 'BendOption',
              description: (
                <>
                  Optional settings such as <code>axis</code>,{' '}
                  <code>angle</code>, and <code>invert</code>.
                </>
              ),
            },
            {
              name: 'matrix?',
              type: 'Matrix4',
              description:
                'An optional transformation matrix to apply before the bend.',
            },
          ]}
        />
        <p className="mt-4">
          Use this for quick setup without manual configuration. You can try it
          in the{' '}
          <Link to="/bend" className="text-primary underline">
            Bend Demo
          </Link>
          .
        </p>
      </div>
    </MethodTemplate>
  );
};
