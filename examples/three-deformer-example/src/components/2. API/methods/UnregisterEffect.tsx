import { MethodTemplate } from './template/MethodTemplate';
import { ParameterTable } from './template/ParametersTable';

export const UnregisterEffect = () => {
  return (
    <MethodTemplate
      functionName="unregisterEffect"
      title="unregisterEffect(name: string): void"
    >
      <p className="text-sm text-base-content/80">
        Removes a previously registered deformation effect by its name. This
        stops the effect from being applied in future computations.
      </p>
      <div className="text-sm text-base-content/80 mt-2">
        <ParameterTable
          parameters={[
            {
              name: 'name',
              type: 'string',
              description: 'The identifier of the effect to remove.',
            },
          ]}
        />
        <p className="mt-4">
          If the effect does not exist, the method has no effect.
        </p>
      </div>
    </MethodTemplate>
  );
};
