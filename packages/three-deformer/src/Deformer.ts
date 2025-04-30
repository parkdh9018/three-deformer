import {
  Float32BufferAttribute,
  Mesh,
  Matrix4,
  Vector3,
  Object3D,
  Box3,
} from 'three';
import {
  BendOption,
  CustomEffectFunction,
  DeformerEffect,
  DeformerEffectFunction,
  EffectOption,
  EffectOptionMap,
  EffectType,
  TaperOption,
  TwistOption,
} from './type';
import { isBuiltinEffect, isCustomEffect, isEffectType } from './typeGuard';

class Deformer {
  object: Object3D;
  objectBoundingBox: Box3;
  private effects: Record<string, DeformerEffect<any>> = {};

  constructor(object: Object3D) {
    this.object = object;
    this.objectBoundingBox = this.computeBoundingBox(object);
    this.effects = {};
  }

  applyDeformers(): void {
    this.object.traverse((child: Object3D) => {
      if (!(child instanceof Mesh)) return;

      this.computeMorphTargets(child);
    });
  }

  computeMorphTargets(mesh: Mesh): void {
    const positionList = Array.from(
      { length: Object.keys(this.effects).length },
      () => [],
    );

    const nameList = Array.from(
      { length: Object.keys(this.effects).length },
      () => '',
    );

    if (positionList.length === 0) return;

    mesh.geometry.morphAttributes.position = [];

    const positionAttribute = mesh.geometry.attributes.position;

    const objectCenter = new Vector3();
    this.objectBoundingBox.getCenter(objectCenter);
    objectCenter.applyMatrix4(this.object.matrixWorld);

    const geometryCenter = new Vector3();
    mesh.geometry.computeBoundingBox();
    if (mesh.geometry.boundingBox) {
      mesh.geometry.boundingBox.getCenter(geometryCenter);
    }
    geometryCenter.applyMatrix4(mesh.matrixWorld);

    const diff = geometryCenter.clone().sub(objectCenter);

    const diffMatrix = new Matrix4().makeTranslation(diff.x, diff.y, diff.z);
    const reverseDiffMatrix = new Matrix4().makeTranslation(
      -diff.x,
      -diff.y,
      -diff.z,
    );

    for (let i = 0; i < positionAttribute.count; i++) {
      const x = positionAttribute.getX(i);
      const y = positionAttribute.getY(i);
      const z = positionAttribute.getZ(i);

      Object.entries(this.effects).forEach(([name, effect], j) => {
        const { matrix, option } = effect;
        nameList[j] = name;
        const vertex = new Vector3(x, y, z);
        vertex.applyMatrix4(matrix);
        vertex.applyMatrix4(diffMatrix);

        let vector: Vector3;

        if (isBuiltinEffect(effect)) {
          vector = effect.effectFunction(vertex, i);
        } else if (isCustomEffect(effect)) {
          vector = effect.effectFunction(vertex, option, i);
        } else {
          throw new Error(
            `[three-deformer] Unknown effect type: ${effect.type}`,
          );
        }
        vertex.applyMatrix4(reverseDiffMatrix);

        vector.toArray(positionList[j], positionList[j].length);
      });
    }

    for (let i = 0; i < positionList.length; i++) {
      const attribute = new Float32BufferAttribute(positionList[i], 3);
      attribute.name = nameList[i];
      mesh.geometry.morphAttributes.position.push(attribute);
    }

    mesh.updateMorphTargets();
  }

  bakeDeformers(): void {
    this.object.traverse((child: Object3D) => {
      if (!(child instanceof Mesh)) return;

      this.bakeMesh(child);
    });
    Object.keys(this.effects).forEach(name => this.unregisterEffect(name));
  }

  bakeMesh(mesh: Mesh): void {
    const geometry = mesh.geometry;
    const position = geometry.attributes.position;
    const morphAttributes = geometry.morphAttributes.position;

    if (!mesh.morphTargetInfluences || !morphAttributes?.length) return;

    const temp = position.array.slice();

    for (let i = 0; i < morphAttributes.length; i++) {
      const influence = mesh.morphTargetInfluences[i];
      if (!influence) continue;

      const morph = morphAttributes[i];

      for (let j = 0; j < morph.count; j++) {
        temp[j * 3 + 0] +=
          (morph.array[j * 3 + 0] - position.array[j * 3 + 0]) * influence;
        temp[j * 3 + 1] +=
          (morph.array[j * 3 + 1] - position.array[j * 3 + 1]) * influence;
        temp[j * 3 + 2] +=
          (morph.array[j * 3 + 2] - position.array[j * 3 + 2]) * influence;
      }
    }

    position.array.set(temp);
    position.needsUpdate = true;

    geometry.morphAttributes = {};
    mesh.morphTargetDictionary = {};
    mesh.morphTargetInfluences = [];
    mesh.updateMorphTargets();

    geometry.computeVertexNormals();
  }

  registerEffect<T extends object = {}>(
    name: string,
    effectFunction: DeformerEffectFunction | CustomEffectFunction<T>,
    matrix?: Matrix4,
    option?: T,
  ): void {
    if (this.effects[name]) {
      throw new Error(`[three-deformer] Effect '${name}' already exists`);
    }

    this.effects[name] = {
      type: isEffectType(name) ? 'builtin' : 'custom',
      effectFunction,
      option: option ?? ({} as T),
      matrix: matrix ?? new Matrix4(),
      weight: 0,
    };
  }

  unregisterEffect(name: string): void {
    delete this.effects[name];
  }

  updateMatrix(name: string, matrix: Matrix4): void {
    const effect = this.effects[name];

    if (!effect) {
      throw new Error('[three-deformer] Effect does not exist');
    }

    this.object.traverse((child: Object3D) => {
      if (!(child instanceof Mesh)) return;

      const tempGeometry = child.geometry.clone(); // 타입 지정 필요
      child.geometry.dispose();
      child.geometry = tempGeometry;
    });

    this.effects[name].matrix = matrix;

    this.object.traverse((child: Object3D) => {
      if (!(child instanceof Mesh)) return;

      this.computeMorphTargets(child);
    });

    this.setWeight(name, effect.weight);
  }

  updateOption<T extends EffectType>(
    name: T,
    option: EffectOptionMap[T],
  ): void {
    const effect = this.effects[name];
    if (!effect) {
      throw new Error('[three-deformer] Effect does not exist');
    }

    effect.option = { ...effect.option, ...option };

    this.object.traverse((child: Object3D) => {
      if (!(child instanceof Mesh)) return;
      const tempGeometry = child.geometry.clone(); // 타입 지정 필요
      child.geometry.dispose();
      child.geometry = tempGeometry;
    });

    this.unregisterEffect(name);

    if (isEffectType(name)) {
      // built-in deformer (twist, taper, bend)
      this.addDeformer(name, effect.option, effect.matrix);
    } else {
      // custom deformer
      this.registerEffect(
        name,
        effect.effectFunction,
        effect.matrix,
        effect.option,
      );
    }

    this.object.traverse((child: Object3D) => {
      if (!(child instanceof Mesh)) return;

      this.computeMorphTargets(child);
    });

    this.setWeight(name, effect.weight);
  }

  addTwistDeformer(
    option: TwistOption = { axis: 'x', invert: true, strength: 2 },
    matrix: Matrix4 = new Matrix4(),
  ): void {
    const axis = option.axis ?? 'x';
    const strength = option.strength ?? 2;
    const invert = option.invert ? -1 : 1;

    const direction = new Vector3();
    switch (axis) {
      case 'x':
        direction.set(1, 0, 0);
        break;
      case 'y':
        direction.set(0, 1, 0);
        break;
      case 'z':
        direction.set(0, 0, 1);
        break;
    }
    direction.multiplyScalar(invert);

    this.registerEffect(
      'twist',
      (vertex: Vector3) => {
        const { x, y, z } = vertex;

        switch (axis) {
          case 'x':
            vertex.set(x * strength, y, z);
            vertex.applyAxisAngle(direction, (Math.PI * x) / 2);
            break;
          case 'y':
            vertex.set(x, y * strength, z);
            vertex.applyAxisAngle(direction, (Math.PI * y) / 2);
            break;
          case 'z':
            vertex.set(x, y, z * strength);
            vertex.applyAxisAngle(direction, (Math.PI * z) / 2);
            break;
        }

        return vertex;
      },
      matrix,
      option,
    );
  }

  computeBoundingBox = (object: Object3D): Box3 => {
    const boundingBox = new Box3();
    object.updateWorldMatrix(true, true); // 모든 자식까지 matrix 업데이트

    object.traverse(child => {
      if ((child as Mesh).isMesh) {
        const mesh = child as Mesh;
        const geometry = mesh.geometry;

        if (!geometry.boundingBox) {
          geometry.computeBoundingBox(); // 없으면 계산
        }

        const box = geometry.boundingBox!.clone();
        box.applyMatrix4(mesh.matrixWorld); // 월드 변환 적용

        boundingBox.union(box); // bounding box에 병합
      }
    });

    return boundingBox;
  };

  addTaperDeformer(
    option: TaperOption = { axis: 'x', invert: false, curveType: 'linear' },
    matrix: Matrix4 = new Matrix4(),
  ): void {
    const { min, max } = this.objectBoundingBox;
    const axis = option.axis ?? 'x';
    const invert = option.invert ?? false;
    const curveType = option.curveType ?? 'linear';

    const range = {
      x: max.x - min.x || 1,
      y: max.y - min.y || 1,
      z: max.z - min.z || 1,
    };

    this.registerEffect(
      'taper',
      (vertex: Vector3) => {
        const { x, y, z } = vertex;
        let t = 0;

        switch (axis) {
          case 'x':
            t = (x - min.x) / range.x;
            break;
          case 'y':
            t = (y - min.y) / range.y;
            break;
          case 'z':
            t = (z - min.z) / range.z;
            break;
        }

        if (invert) t = 1 - t;

        let sc = 1;
        switch (curveType) {
          case 'quadratic':
            sc = Math.pow(t, 2);
            break;
          case 'sin':
            sc = Math.sin((t * Math.PI) / 2);
            break;
          case 'cubic':
            sc = Math.pow(t, 2) * (3 - 2 * t);
            break;
          case 'linear':
          default:
            sc = t;
            break;
        }

        switch (axis) {
          case 'x':
            vertex.set(x, y * sc, z * sc);
            break;
          case 'y':
            vertex.set(x * sc, y, z * sc);
            break;
          case 'z':
            vertex.set(x * sc, y * sc, z);
            break;
        }

        vertex.applyMatrix4(matrix);
        return vertex;
      },
      matrix,
      option,
    );
  }

  addBendDeformer(
    option: BendOption = {
      axis: 'x',
      invert: false,
      angle: 0,
    },
    matrix: Matrix4 = new Matrix4(),
  ): void {
    const { min, max } = this.objectBoundingBox;

    const center = new Vector3();
    this.objectBoundingBox.getCenter(center);

    const axis = option.axis ?? 'x';
    const invert = option.invert ? -1 : 1;
    const angle = (option.angle ?? 0) * (Math.PI / 180);

    const rotationMatrix = new Matrix4();
    const inverseMatrix = new Matrix4();

    switch (axis) {
      case 'x':
        rotationMatrix.makeRotationY(angle);
        inverseMatrix.makeRotationY(-angle);
        break;
      case 'y':
        rotationMatrix.makeRotationX(angle);
        inverseMatrix.makeRotationX(-angle);
        break;
      case 'z':
        rotationMatrix.makeRotationX(angle);
        inverseMatrix.makeRotationX(-angle);
        break;
    }

    this.registerEffect(
      'bend',
      (vertex: Vector3) => {
        vertex.applyMatrix4(rotationMatrix);

        const { x, y, z } = vertex;
        let a = 0,
          b = 0,
          sc = 0;
        let R = 0,
          theta = 0;

        switch (axis) {
          case 'x': {
            a = y - center.y;
            b = z - center.z;
            sc = (y - min.y) / (max.y - min.y);
            R = Math.sqrt(a * a + b * b);
            theta = Math.atan2(b, a) + sc * invert;
            vertex.set(x, R * Math.cos(theta), R * Math.sin(theta));
            break;
          }

          case 'y': {
            a = x - center.x;
            b = z - center.z;
            sc = (x - min.x) / (max.x - min.x);
            R = Math.sqrt(a * a + b * b);
            theta = Math.atan2(b, a) + sc * invert;
            vertex.set(R * Math.cos(theta), y, R * Math.sin(theta));
            break;
          }

          case 'z': {
            a = x - center.x;
            b = y - center.y;
            sc = (x - min.x) / (max.x - min.x);
            R = Math.sqrt(a * a + b * b);
            theta = Math.atan2(b, a) + sc * invert;
            vertex.set(R * Math.cos(theta), R * Math.sin(theta), z);
            break;
          }
        }

        vertex.applyMatrix4(inverseMatrix);
        return vertex;
      },
      matrix,
      option,
    );
  }

  addCustomDeformer<T extends object = {}>(
    name: string,
    func: CustomEffectFunction<T>,
    option?: T,
    matrix: Matrix4 = new Matrix4(),
  ): void {
    if (!name || typeof func !== 'function') {
      throw new Error(
        '[three-deformer] Custom deformer requires a name and an effect function.',
      );
    }

    this.registerEffect(name, func, matrix, option ?? ({} as T));
  }

  addDeformer<T extends EffectType>(
    name: T,
    option?: EffectOptionMap[T],
    matrix?: Matrix4,
  ): void {
    switch (name) {
      case 'twist': {
        this.addTwistDeformer(option as TwistOption, matrix);
        break;
      }
      case 'taper': {
        this.addTaperDeformer(option as TaperOption, matrix);
        break;
      }
      case 'bend': {
        this.addBendDeformer(option as BendOption, matrix);
        break;
      }
      default: {
        console.warn(
          `[three-deformer] Effect '${name}' is not supported. Please use 'addEffect' instead.`,
        );
      }
    }
  }

  setWeight(name: string, value: number) {
    if (!(name in this.effects)) {
      throw new Error(`[three-deformer] Effect '${name}' does not exist`);
    }

    this.effects[name].weight = value;

    this.object.traverse((child: Object3D) => {
      if (!(child instanceof Mesh)) return;

      if (!child.morphTargetDictionary || !child.morphTargetInfluences) {
        throw new Error(
          `[three-deformer] Mesh does not have morphTargetDictionary. Make sure to call 'apply()' before using this deformer.`,
        );
      }

      child.morphTargetInfluences[child.morphTargetDictionary[name]] = value;
    });
  }
}

export { Deformer };
