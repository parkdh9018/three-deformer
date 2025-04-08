import { Section1 } from './Section1';
import { Section2 } from './Section2';

export const Page = () => {
  return (
    <div className="h-full w-full flex bg-base-100">
      <div className="max-w-4xl mx-auto px-7 mt-16">
        <h3 className="text-6xl font-bold py-6">Getting started</h3>
        <div className="divider" />
        <Section1 />
        <Section2 />
      </div>
    </div>
  );
};
