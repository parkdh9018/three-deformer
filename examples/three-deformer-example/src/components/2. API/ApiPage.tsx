import { ConstructorSection } from './ConstructorSection';
import { MethodsSection } from './MethodsSection';
import { PropertiesSection } from './PropertiesSection';

export const ApiPage = () => {
  return (
    <div className="h-full w-full flex bg-base-100">
      <div className="max-w-4xl mx-auto px-7 mt-16">
        <h3 className="text-6xl font-bold py-6">API</h3>
        <div className="divider" />
        <ConstructorSection />
        <div className="divider" />
        <PropertiesSection />
        <div className="divider" />
        <MethodsSection />
      </div>
    </div>
  );
};
