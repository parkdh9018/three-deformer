import { Link } from 'react-router-dom';
import { MethodTemplate } from './template/MethodTemplate';
import { ParameterTable } from './template/ParametersTable';

export const AddCustomDeformer = () => {
  return (
    <MethodTemplate
      functionName="addCustomDeformer"
      title="addCustomDeformer(name, func, option?, matrix?): void"
    >
      <p className="text-sm text-base-content/80">
        Registers a fully custom deformation effect using a user-defined
        function. This gives you complete control over how each vertex is
        modified.
      </p>

      <div className="text-sm text-base-content/80 mt-2">
        <ParameterTable
          parameters={[
            {
              name: 'name',
              type: 'string',
              description: 'A unique identifier for the custom deformer.',
            },
            {
              name: 'func',
              type: '(vertex: Vector3, option: T, index?: number) => Vector3',
              description: (
                <>
                  A function that defines how each vertex should be transformed.
                  You can use the
                  <code>option</code> parameter to customize the behavior.
                </>
              ),
            },
            {
              name: 'option?',
              type: 'Record<string, any>',
              description:
                'A user-defined object that holds any parameters required by your custom function.',
            },
            {
              name: 'matrix?',
              type: 'Matrix4',
              description:
                'An optional transformation matrix to apply before the effect function.',
            },
          ]}
        />

        <p className="mt-4">
          You can try it in the{' '}
          <Link to="/custom" className="text-primary underline">
            Custom Demo
          </Link>
          .
        </p>
      </div>
    </MethodTemplate>
  );
};
