import {
  BufferGeometry,
  Float32BufferAttribute,
  Mesh,
  Matrix4,
  Vector3,
} from 'three';

type EffectFunction = (vertex: Vector3, index?: number) => Vector3;
type Effect = {
  index: number;
  matrix: Matrix4;
  effect: EffectFunction;
  option: EffectOption;
};
class Deformer {
  mesh: Mesh;
  geometry: BufferGeometry;
  effects: Record<string, Effect>;

  constructor(mesh: Mesh) {
    this.mesh = mesh;
    this.geometry = mesh.geometry;
    this.effects = {};
  }

  apply(): void {
    this.applyDeformers(this.geometry);
    this.mesh.updateMorphTargets();
  }

  applyDeformers(geometry: BufferGeometry): void {
    const positionList = Array.from(
      { length: Object.keys(this.effects).length },
      () => [],
    );

    if (positionList.length === 0) return;

    geometry.morphAttributes.position = [];

    const positionAttribute = geometry.attributes.position;

    for (let i = 0; i < positionAttribute.count; i++) {
      const x = positionAttribute.getX(i);
      const y = positionAttribute.getY(i);
      const z = positionAttribute.getZ(i);

      Object.entries(this.effects).forEach(([_, { effect, matrix }], j) => {
        const vertex = new Vector3(x, y, z);

        vertex.applyMatrix4(matrix);
        const vector = effect(vertex, i);

        vector.toArray(positionList[j], positionList[j].length);
      });
    }

    for (let i = 0; i < positionList.length; i++) {
      geometry.morphAttributes.position.push(
        new Float32BufferAttribute(positionList[i], 3),
      );
    }

    this.mesh.updateMorphTargets();
  }

  addEffect(
    name: string,
    effect: EffectFunction,
    option: EffectOption,
    matrix: Matrix4,
  ): void {
    if (this.effects[name]) {
      throw new Error(`[three-deformer] Effect '${name}' already exists`);
    }

    this.effects[name] = {
      index: Object.keys(this.effects).length,
      option,
      effect,
      matrix,
    };
  }

  removeEffect(name: string): void {
    delete this.effects[name];
  }

  transform(name: EffectType, matrix: Matrix4): void {
    if (!this.effects[name]) {
      throw new Error('[three-deformer] Effect does not exist');
    }

    let weight = 0;
    if (this.mesh.morphTargetInfluences) {
      weight = this.mesh.morphTargetInfluences[0];
    }

    const tempGeometry = this.geometry.clone();
    this.mesh.geometry = tempGeometry;

    const option = this.effects[name].option;

    this.removeEffect(name);
    this.addDeformer(name, option, matrix);

    this.applyDeformers(tempGeometry);
    this.mesh.updateMorphTargets();

    this.changeWeight(name, weight);
  }

  setOption(name: EffectType, option: EffectOption): void {
    if (!this.effects[name]) {
      throw new Error('[three-deformer] Effect does not exist');
    }

    let weight = 0;
    if (this.mesh.morphTargetInfluences) {
      weight = this.mesh.morphTargetInfluences[0];
    }

    const tempGeometry = this.geometry.clone();
    this.mesh.geometry = tempGeometry;

    const matrix = this.effects[name].matrix;

    this.removeEffect(name);
    this.addDeformer(name, option, matrix);

    this.applyDeformers(tempGeometry);
    this.mesh.updateMorphTargets();

    this.changeWeight(name, weight);
  }

  addTwist(
    option: TwistOption = { direction: 'x', invert: false },
    matrix: Matrix4 = new Matrix4(),
  ): void {
    const direction = new Vector3();

    this.addEffect(
      'twist',
      vertex => {
        const { x, y, z } = vertex;

        switch (option.direction) {
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

        if (option.invert) direction.multiplyScalar(-1);

        switch (option.direction) {
          case 'x':
            vertex.set(x * 2, y, z);
            vertex.applyAxisAngle(direction, (Math.PI * x) / 2);
            break;
          case 'y':
            vertex.set(x, y * 2, z);
            vertex.applyAxisAngle(direction, (Math.PI * y) / 2);
            break;
          case 'z':
            vertex.set(x, y, z * 2);
            vertex.applyAxisAngle(direction, (Math.PI * z) / 2);
            break;
        }

        return vertex;
      },
      option,
      matrix,
    );
  }

  addTaper(
    option: TaperOption = {
      direction: 'x',
      invert: false,
      curveType: 'linear',
    },
    matrix: Matrix4 = new Matrix4(),
  ): void {
    this.geometry.computeBoundingBox();

    if (this.geometry.boundingBox === null) {
      throw new Error('[three-deformer] Geometry does not have bounding box');
    }

    const { min, max } = this.geometry.boundingBox;
    const rangeX = max.x - min.x || 1;
    const rangeY = max.y - min.y || 1;
    const rangeZ = max.z - min.z || 1;

    this.addEffect(
      'taper',
      vertex => {
        const { x, y, z } = vertex;
        let sc = 1,
          t = 0;

        switch (option.direction) {
          case 'x':
          default:
            t = (x - min.x) / rangeX;
            break;
          case 'y':
            t = (y - min.y) / rangeY;
            break;
          case 'z':
            t = (z - min.z) / rangeZ;
            break;
        }

        switch (option.curveType) {
          case 'quadratic':
            sc = Math.pow(option.invert ? 1 - t : t, 2);
            break;
          case 'sin':
            sc = Math.sin(((option.invert ? 1 - t : t) * Math.PI) / 2);
            break;
          case 'cubic':
            sc =
              Math.pow(option.invert ? 1 - t : t, 2) *
              (3 - 2 * (option.invert ? 1 - t : t));
            break;
          case 'linear':
          default:
            sc = option.invert ? 1 - t : t;
            break;
        }

        switch (option.direction) {
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
      option,
      matrix,
    );
  }

  addSpherify(
    option: SpherifyOption = {},
    matrix: Matrix4 = new Matrix4(),
  ): void {
    this.addEffect(
      'spherify',
      vertex => {
        const { x, y, z } = vertex;
        vertex.set(
          x * Math.sqrt(1 - (y * y) / 2 - (z * z) / 2 + (y * y * z * z) / 3),
          y * Math.sqrt(1 - (z * z) / 2 - (x * x) / 2 + (z * z * x * x) / 3),
          z * Math.sqrt(1 - (x * x) / 2 - (y * y) / 2 + (x * x * y * y) / 3),
        );
        return vertex;
      },
      option,
      matrix,
    );
  }

  addDeformer<T extends EffectType>(
    name: T,
    option?: EffectOption,
    matrix?: Matrix4,
  ): void {
    switch (name) {
      case 'twist': {
        this.addTwist(option as TwistOption, matrix);
        break;
      }
      case 'spherify': {
        this.addSpherify(matrix);
        break;
      }
      case 'taper': {
        this.addTaper(option as TaperOption, matrix);
        break;
      }
      default: {
        throw new Error('[three-deformer] Deformer does not exist');
      }
    }
  }

  changeWeight(name: string, value: number) {
    const index = this.effects[name]?.index ?? -1;

    if (index === -1) {
      throw new Error('[three-deformer] Effect does not exist');
    }

    if (!this.mesh.morphTargetInfluences) {
      throw new Error(
        `[three-deformer] Mesh does not have morphTargetInfluences. Make sure to call 'apply()' before using this deformer.`,
      );
    }

    this.mesh.morphTargetInfluences[index] = value;
  }
}

export { Deformer };
