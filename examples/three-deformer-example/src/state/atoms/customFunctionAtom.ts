import { atom, selector } from 'recoil';
import * as THREE from 'three';

export const customFunctionAtom = atom<string>({
  key: 'customFunction',
  default: `
    const {x, y, z} = vertex;
    vertex.set(x, vertex.y + Math.sin(vertex.x), z);
    return vertex;
  `,
});

export const customFunctionSelector = selector<
  (vertex: THREE.Vector3) => THREE.Vector3
>({
  key: 'customFunctionSelector',
  get: ({ get }) => {
    const code = get(customFunctionAtom);
    try {
      const fn = new Function('vertex', `"use strict"; ${code}`);
      return fn as (vertex: THREE.Vector3) => THREE.Vector3;
    } catch (err) {
      alert('Error in custom function. Please check the console for details.');
      console.error(err);
      return (vertex: THREE.Vector3) => vertex;
    }
  },
});
