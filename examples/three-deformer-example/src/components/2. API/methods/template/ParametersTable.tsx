type Parameter = {
  name: string;
  type: string;
  description: React.ReactNode;
};

type ParameterTableProps = {
  parameters: Parameter[];
};

export const ParameterTable = ({ parameters }: ParameterTableProps) => {
  return (
    <div className="text-sm text-base-content/80 mt-4">
      <p className="font-medium mb-2">Parameters:</p>
      <div className="overflow-x-auto">
        <table className="table w-full text-sm">
          <thead>
            <tr className="text-base-content/60 border-b">
              <th className="text-left">Name</th>
              <th className="text-left">Type</th>
              <th className="text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            {parameters.map((param, i) => (
              <tr key={i} className="align-top">
                <td className="font-mono">{param.name}</td>
                <td className="font-mono text-xs text-base-content/70">
                  {param.type}
                </td>
                <td>{param.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
