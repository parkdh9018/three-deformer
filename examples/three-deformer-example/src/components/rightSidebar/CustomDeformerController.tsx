import * as THREE from 'three';
import { Deformer } from 'three-deformer';

type Props = {
  mesh: THREE.Mesh;
  deformer: Deformer;
};

export const CustomDeformerController = ({ mesh, deformer }: Props) => {
  return <div>CustomDeformerController</div>;
};
