import { MethodTemplate } from './template/MethodTemplate';
import { ParameterTable } from './template/ParametersTable';
import { Link } from 'react-router-dom';

export const AddTaperDeformer = () => {
  return (
    <MethodTemplate
      functionName="addTaperDeformer"
      title="addTaperDeformer(option?: TaperOption, matrix?: Matrix4): void"
    >
      <p className="text-sm text-base-content/80">
        Adds a taper deformation effect with optional parameters and an optional
        transformation matrix.
      </p>
      <div className="text-sm text-base-content/80 mt-2">
        <ParameterTable
          parameters={[
            {
              name: 'option?',
              type: 'TaperOption',
              description: (
                <>
                  Optional settings such as <code>axis</code>,{' '}
                  <code>invert</code>, and <code>curveType</code>.
                </>
              ),
            },
            {
              name: 'matrix?',
              type: 'Matrix4',
              description:
                'An optional transformation matrix to apply before the taper.',
            },
          ]}
        />
        <p className="mt-4">
          Use this for quick setup without manual configuration. You can try it
          in the{' '}
          <Link to="/taper" className="text-primary underline">
            Taper Demo
          </Link>
          .
        </p>
      </div>
    </MethodTemplate>
  );
};
