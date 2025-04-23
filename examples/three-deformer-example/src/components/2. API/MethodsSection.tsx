import { methodMap } from './methods/methodMap';

export const MethodsSection = () => {
  return (
    <>
      <h3 className="text-2xl font-semibold mb-4">Methods</h3>
      {Object.entries(methodMap).map(([key, MethodComponent]) => (
        <MethodComponent key={key} />
      ))}
    </>
  );
};
