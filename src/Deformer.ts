import { BufferGeometry, Float32BufferAttribute,  Mesh,  BufferAttribute, InterleavedBufferAttribute, Vector3 } from 'three';


type DeformerFunction = (x : number, y : number, z : number, index? : number) => Vector3;
class Deformer {

  mesh : Mesh;
  geometry : BufferGeometry;

  deformerList: DeformerFunction[] = [];

  constructor(mesh : Mesh) {

    this.mesh = mesh;
    this.geometry = mesh.geometry;
    this.geometry.morphAttributes.position = [];

  }

  applyDeformers () : void{

    const positionAttribute = this.geometry.attributes.position;
    const positionList = Array.from({length: this.deformerList.length}, () => []);

    for ( let i = 0; i < positionAttribute.count; i ++ ) {

      const x = positionAttribute.getX( i );
      const y = positionAttribute.getY( i );
      const z = positionAttribute.getZ( i );

      for (let j = 0; j < this.deformerList.length; j ++) {
        const vector = this.deformerList[j](x, y, z);
        vector.toArray(positionList[j], positionList[j].length);
      }
    }

    for(let i=0;i<positionList.length;i++) {
      this.geometry.morphAttributes.position.push(new Float32BufferAttribute( positionList[i], 3 ));
      this.mesh.updateMorphTargets();
    }

  }

  addDeformer(deformer : DeformerFunction) : void {
    this.deformerList.push(deformer);
  }

  addTwist() : void {

    const direction = new Vector3( 1, 0, 0 );
    const vertex = new Vector3();
    
    this.addDeformer((x,y,z) => {

      vertex.set( x * 2, y, z );
      vertex.applyAxisAngle( direction, Math.PI * x / 2 )

      return vertex
    })

  }

  addSpherify() : void { 

    const vertex = new Vector3();

    this.addDeformer((x,y,z) => {
      vertex.set( 
        x * Math.sqrt( 1 - ( y * y / 2 ) - ( z * z / 2 ) + ( y * y * z * z / 3 ) ),
        y * Math.sqrt( 1 - ( z * z / 2 ) - ( x * x / 2 ) + ( z * z * x * x / 3 ) ),
        z * Math.sqrt( 1 - ( x * x / 2 ) - ( y * y / 2 ) + ( x * x * y * y / 3 ) ))
      return vertex;
  })
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