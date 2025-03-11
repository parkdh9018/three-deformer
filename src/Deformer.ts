import { BufferGeometry, Float32BufferAttribute,  Mesh,  BufferAttribute, InterleavedBufferAttribute, Vector3 } from 'three';

class Deformer {

  mesh : Mesh;
  geometry : BufferGeometry;

  constructor(mesh : Mesh) {

    this.mesh = mesh;
    this.geometry = mesh.geometry;
    this.geometry.morphAttributes.position = [];

  }

  applyDeformer (defomer : (positionAttribute: BufferAttribute | InterleavedBufferAttribute) => any[]) : void{

    const positionAttribute = this.geometry.attributes.position;

    const positions = defomer(positionAttribute);

    this.geometry.morphAttributes.position.push(new Float32BufferAttribute( positions, 3 ));

    this.mesh.updateMorphTargets();
  }

  applyTwist() : void {

      const direction = new Vector3( 1, 0, 0 );
      const vertex = new Vector3();

      this.applyDeformer((positionAttribute) => {
          const twistPositions : number[] = [];

          for ( let i = 0; i < positionAttribute.count; i ++ ) {

              const x = positionAttribute.getX( i );
              const y = positionAttribute.getY( i );
              const z = positionAttribute.getZ( i );

              // stretch along the x-axis so we can see the twist better
              vertex.set( x * 2, y, z );

              vertex.applyAxisAngle( direction, Math.PI * x / 2 ).toArray( twistPositions, twistPositions.length );

          }

          return twistPositions;
      });
  }

  applySpherify() : void { 

    this.applyDeformer((positionAttribute) => {
        const spherePositions : number[] = [];

        for ( let i = 0; i < positionAttribute.count; i ++ ) {

            let x = positionAttribute.getX( i );
            let y = positionAttribute.getY( i );
            let z = positionAttribute.getZ( i );

            spherePositions.push(
              x * Math.sqrt( 1 - ( y * y / 2 ) - ( z * z / 2 ) + ( y * y * z * z / 3 ) ),
              y * Math.sqrt( 1 - ( z * z / 2 ) - ( x * x / 2 ) + ( z * z * x * x / 3 ) ),
              z * Math.sqrt( 1 - ( x * x / 2 ) - ( y * y / 2 ) + ( x * x * y * y / 3 ) )
  
            );

        }

        return spherePositions;
    });
  }

  changeValue(idx : number, value : number) {
    
    if(!this.mesh.morphTargetInfluences) {
      console.error("Mesh does not have morphTargetInfluences");
      return;
    } 

    this.mesh.morphTargetInfluences[idx] = value;
  }
}

export { Deformer };