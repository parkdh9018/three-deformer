import { useControls } from 'leva';
import { useEffect } from 'react';
import * as THREE from 'three';
import { Deformer } from 'three-deformer';

type Props = {
  mesh: THREE.Mesh;
  deformer: Deformer;
};

export const DeformerController = ({ mesh, deformer }: Props) => {
  const _matrix = new THREE.Matrix4();
  const _position = new THREE.Vector3();
  const _rotation = new THREE.Quaternion();
  const _euler = new THREE.Euler();
  const _scale = new THREE.Vector3();

  const onChangeWeight = (value: number) => {
    deformer.changeWeight('twist', value);
  };

  const onChangePosition = (value: { x: number; y: number; z: number }) => {
    _matrix.decompose(_position, _rotation, _scale);
    _position.set(value.x, value.y, value.z);
    _matrix.compose(_position, _rotation, _scale);
    deformer.transform('twist', _matrix);
  };

  const onChangeRotation = (value: { x: number; y: number; z: number }) => {
    _matrix.decompose(_position, _rotation, _scale);
    _euler.set(value.x, value.y, value.z);
    _rotation.setFromEuler(_euler);
    _matrix.compose(_position, _rotation, _scale);
    deformer.transform('twist', _matrix);
  };

  const onChangeScale = (value: { x: number; y: number; z: number }) => {
    _matrix.decompose(_position, _rotation, _scale);
    _scale.set(value.x, value.y, value.z);
    _matrix.compose(_position, _rotation, _scale);
    deformer.transform('twist', _matrix);
  };

  const { axis, invert } = useControls({
    weight: {
      value: 0,
      min: 0,
      max: 1,
      step: 0.01,
      onChange: onChangeWeight,
    },
    axis: { value: 'x', options: ['x', 'y', 'z'] },
    invert: { value: true, options: [true, false] },
  });

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

  useEffect(() => {
    deformer.setOption('twist', { direction: axis, invert: invert });
  }, [axis, invert]);

  return <primitive object={mesh} />;
};
