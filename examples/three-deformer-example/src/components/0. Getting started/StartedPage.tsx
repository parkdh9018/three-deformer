import { Section_basic } from './Section_basic';
import { Section_updateOption } from './Section_updateOption';
import { Section_multipleDeformers } from './Section_multipleDeformers';
import { Section_bake } from './Section_bake';
import { Section_custom } from './Section_custom';

export const Page = () => {
  return (
    <div className="h-full w-full flex bg-base-100">
      <div className="max-w-4xl mx-auto px-7 mt-16">
        <h3 className="text-6xl font-bold py-6">Getting started</h3>
        <div className="divider" />
        <Section_basic />
        <Section_updateOption />
        <Section_multipleDeformers />
        <Section_custom />
        <Section_bake />
      </div>
    </div>
  );
};
