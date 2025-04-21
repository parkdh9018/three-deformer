# three-deformer

[![npm version](https://img.shields.io/npm/v/three-deformer.svg?style=flat-square)](https://www.npmjs.com/package/three-deformer)
[![bundle size](https://img.shields.io/bundlephobia/minzip/three-deformer?style=flat-square)](https://bundlephobia.com/package/three-deformer)

<p align="center">
  <img src="https://raw.githubusercontent.com/parkdh9018/three-deformer/main/image/bend_example.png" alt="three-deformer preview" width="500"/>
</p>

A lightweight and flexible library for applying geometric deformers to 3D meshes in [Three.js](https://threejs.org/).

Supports common deformations like **bend**, **twist**, and **taper**, and allows you to create custom deformers with ease.

**[Live Example](https://parkdh9018.github.io/three-deformer/)**

#### Features

- Built-in deformers: Bend, Twist, Taper
- Custom deformer support with simple function-based interface
- Chain multiple deformers together
- Fully typed (TypeScript)
- Works with BufferGeometry and SkinnedMesh

#### Installation

```bash
npm install three-deformer
```

### Usage

#### Simple usage

```javascript
import * as THREE from 'three';
import { Deformer } from 'three-deformer';

// Create your mesh
const mesh = new THREE.Mesh(geometry, material);

// Create a deformer instance
const deformer = new Deformer(mesh);

// Add Deformer
deformer.addBendDeformer();

// Apply Deformers
deformer.applyDeformers();

// change weight
deformer.setWeight('bend', 0.5);
```

#### Update matrix / option

Use updateMatrix and updateOption to change the transformation matrix or options of a specific deformer dynamically.

```javascript
deformer.addTwistDeformer(
  { axis: 'x', invert: true, strength: 2 },
  new THREE.Matrix4().makeTranslation(0, 1, 0),
);
deformer.applyDeformers();

deformer.updateMatrix('twist', new THREE.Matrix4().makeTranslation(1, 1, 1));
deformer.updateOption('twist', { axis: 'y', strength: 1 });

deformer.setWeight('twist', 0.5);
```

#### Custom deformer

You can define your own deformation logic using `addCustomDeformer`:

```javascript
deformer.addCustomDeformer(
  'wave',
  (vertex, option) => {
    const { amplitude = 0.5, frequency = 2 } = option;
    vertex.y += Math.sin(vertex.x * frequency) * amplitude;
    return vertex;
  },
  { amplitude: 0.5, frequency: 2 },
);
deformer.applyDeformers();
```
