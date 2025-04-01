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
    const effect = this.effects[name];
    const index = this.effects[name]?.index ?? -1;

    if (!effect || index === -1) {
      throw new Error('[three-deformer] Effect does not exist');
    }

    let weight = 0;
    if (this.mesh.morphTargetInfluences) {
      weight = this.mesh.morphTargetInfluences[index];
    }

    const tempGeometry = this.geometry.clone();
    this.mesh.geometry = tempGeometry;

    effect.matrix = matrix;

    this.removeEffect(name);
    this.addDeformer(name, effect.option, matrix);

    this.applyDeformers(tempGeometry);
    this.mesh.updateMorphTargets();

    this.changeWeight(name, weight);
  }

  setOption(name: EffectType, value: Partial<EffectOption>): void {
    const effect = this.effects[name];
    const index = this.effects[name]?.index ?? -1;
    if (!effect || index === -1) {
      throw new Error('[three-deformer] Effect does not exist');
    }

    let weight = 0;
    if (this.mesh.morphTargetInfluences) {
      weight = this.mesh.morphTargetInfluences[index];
    }

    const tempGeometry = this.geometry.clone();
    this.mesh.geometry = tempGeometry;

    effect.option = { ...effect.option, ...value };

    this.removeEffect(name);
    this.addDeformer(name, effect.option, effect.matrix);

    this.applyDeformers(tempGeometry);
    this.mesh.updateMorphTargets();

    this.changeWeight(name, weight);
  }

  addTwist(
    option: TwistOption = { axis: 'x', invert: true, strength: 2 },
    matrix: Matrix4 = new Matrix4(),
  ): void {
    const { axis, strength } = option;
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

    this.addEffect(
      'twist',
      vertex => {
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
      option,
      matrix,
    );
  }

  addTaper(
    option: TaperOption = { axis: 'x', invert: false, curveType: 'linear' },
    matrix: Matrix4 = new Matrix4(),
  ): void {
    this.geometry.computeBoundingBox();

    if (this.geometry.boundingBox === null) {
      throw new Error('[three-deformer] Geometry does not have bounding box');
    }

    const { min, max } = this.geometry.boundingBox;
    const { axis, invert, curveType } = option;

    const range = {
      x: max.x - min.x || 1,
      y: max.y - min.y || 1,
      z: max.z - min.z || 1,
    };

    this.addEffect(
      'taper',
      vertex => {
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
      option,
      matrix,
    );
  }

  addBend(
    option: BendOption = {
      axis: 'x',
      invert: false,
      angle: 0,
    },
    matrix: Matrix4 = new Matrix4(),
  ): void {
    this.geometry.computeBoundingBox();

    if (this.geometry.boundingBox === null) {
      throw new Error('[three-deformer] Geometry does not have bounding box');
    }

    const { min, max } = this.geometry.boundingBox;
    const center = new Vector3();
    this.geometry.boundingBox.getCenter(center);

    const { axis } = option;
    const angle = (option.angle ?? 0) * (Math.PI / 180);
    const invert = option.invert ? -1 : 1;

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

    this.addEffect(
      'bend',
      vertex => {
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
      option,
      matrix,
    );
  }

  // addSpherify(
  //   option: SpherifyOption = {},
  //   matrix: Matrix4 = new Matrix4(),
  // ): void {
  //   this.addEffect(
  //     'spherify',
  //     vertex => {
  //       const { x, y, z } = vertex;
  //       vertex.set(
  //         x * Math.sqrt(1 - (y * y) / 2 - (z * z) / 2 + (y * y * z * z) / 3),
  //         y * Math.sqrt(1 - (z * z) / 2 - (x * x) / 2 + (z * z * x * x) / 3),
  //         z * Math.sqrt(1 - (x * x) / 2 - (y * y) / 2 + (x * x * y * y) / 3),
  //       );
  //       return vertex;
  //     },
  //     option,
  //     matrix,
  //   );
  // }

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
      case 'taper': {
        this.addTaper(option as TaperOption, matrix);
        break;
      }
      case 'bend': {
        this.addBend(option as BendOption, matrix);
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
