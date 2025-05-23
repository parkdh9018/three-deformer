import { useControls } from 'leva';
import * as THREE from 'three';
import { AxisType, Deformer, EffectType } from 'three-deformer';
import { useMemo } from 'react';
import { EffectTypeWithCustom } from '../../types/deformerType';

type Props = {
  name: EffectTypeWithCustom;
  mesh: THREE.Mesh;
  deformer: Deformer;
  option?: object;
};

const isEffectType = (name: string): name is EffectType =>
  ['twist', 'taper', 'bend'].includes(name as EffectType);

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

  const matrixMesh = useMemo(() => {
    const box = new THREE.Box3().setFromObject(mesh);
    const size = new THREE.Vector3();
    box.getSize(size);

    const geometry = new THREE.BoxGeometry(size.x, size.y, size.z);
    const edges = new THREE.EdgesGeometry(geometry);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
    return new THREE.LineSegments(edges, lineMaterial);
  }, [mesh]);

  // Weight
  const onChangeWeight = (value: number) => {
    deformer.setWeight(name, value);
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
  useControls(
    'Axis',
    isEffectType(name)
      ? {
          axis: {
            value: 'x',
            options: ['x', 'y', 'z'],
            onChange: (value: AxisType) => {
              deformer.updateOption(name, { axis: value });
            },
          },
          invert: {
            value: false,
            options: [true, false],
            onChange: (value: boolean) => {
              deformer.updateOption(name, { invert: value });
            },
          },
        }
      : {},
  );

  // Matrix
  const onChangePosition = (value: { x: number; y: number; z: number }) => {
    _matrix.decompose(_position, _rotation, _scale);
    _position.set(value.x, value.y, value.z);
    _matrix.compose(_position, _rotation, _scale);

    matrixMesh.position.set(value.x, value.y, value.z);
    deformer.updateMatrix(name, _matrix);
  };

  const onChangeRotation = (value: { x: number; y: number; z: number }) => {
    _matrix.decompose(_position, _rotation, _scale);
    _euler.set(value.x, value.y, value.z);
    _rotation.setFromEuler(_euler);
    _matrix.compose(_position, _rotation, _scale);

    matrixMesh.setRotationFromMatrix(_matrix);
    deformer.updateMatrix(name, _matrix);
  };

  const onChangeScale = (value: { x: number; y: number; z: number }) => {
    _matrix.decompose(_position, _rotation, _scale);
    _scale.set(value.x, value.y, value.z);
    _matrix.compose(_position, _rotation, _scale);

    matrixMesh.scale.set(value.x, value.y, value.z);
    deformer.updateMatrix(name, _matrix);
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

  return (
    <>
      <primitive object={matrixMesh} />
      <primitive object={mesh} />
    </>
  );
};
