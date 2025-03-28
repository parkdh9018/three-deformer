import { useControls } from 'leva';
import * as THREE from 'three';
import { Deformer } from 'three-deformer';

type Props = {
  name: string;
  mesh: THREE.Mesh;
  deformer: Deformer;
  option?: object;
};

export const DeformerController = ({
  name,
  option = {},
  mesh,
  deformer,
}: Props) => {
  const _matrix = new THREE.Matrix4();
  const _position = new THREE.Vector3();
  const _rotation = new THREE.Quaternion();
  const _euler = new THREE.Euler();
  const _scale = new THREE.Vector3();

  // Weight
  const onChangeWeight = (value: number) => {
    deformer.changeWeight(name, value);
  };

  useControls({
    weight: {
      value: 0,
      min: 0,
      max: 1,
      step: 0.01,
      onChange: onChangeWeight,
    },
  });

  // Option
  useControls('Option', option);

  // Axis
  const onChangeAxis = (value: number) => {
    deformer.setOption(name, { direction: value });
  };
  const onChangeInvert = (value: number) => {
    deformer.setOption(name, { invert: value });
  };

  useControls('Axis', {
    axis: {
      value: 'x',
      options: ['x', 'y', 'z'],
      onChange: onChangeAxis,
    },
    invert: {
      value: false,
      options: [true, false],
      onChange: onChangeInvert,
    },
  });

  // Matrix
  const onChangePosition = (value: { x: number; y: number; z: number }) => {
    _matrix.decompose(_position, _rotation, _scale);
    _position.set(value.x, value.y, value.z);
    _matrix.compose(_position, _rotation, _scale);
    deformer.transform(name, _matrix);
  };

  const onChangeRotation = (value: { x: number; y: number; z: number }) => {
    _matrix.decompose(_position, _rotation, _scale);
    _euler.set(value.x, value.y, value.z);
    _rotation.setFromEuler(_euler);
    _matrix.compose(_position, _rotation, _scale);
    deformer.transform(name, _matrix);
  };

  const onChangeScale = (value: { x: number; y: number; z: number }) => {
    _matrix.decompose(_position, _rotation, _scale);
    _scale.set(value.x, value.y, value.z);
    _matrix.compose(_position, _rotation, _scale);
    deformer.transform(name, _matrix);
  };

  useControls('Matrix', {
    position: {
      value: { x: 0, y: 0, z: 0 },
      step: 0.05,
      onChange: onChangePosition,
    },
    rotation: {
      value: { x: 0, y: 0, z: 0 },
      step: 0.05,
      onChange: onChangeRotation,
    },
    scale: {
      value: { x: 1, y: 1, z: 1 },
      step: 0.05,
      min: 0.05,
      onChange: onChangeScale,
    },
  });

  return <primitive object={mesh} />;
};
