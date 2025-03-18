import { BufferGeometry, Float32BufferAttribute,  Mesh,  BufferAttribute, InterleavedBufferAttribute,  Matrix4, Vector3 } from 'three';


type EffectFunction = (vertex : Vector3, index? : number) => Vector3;
type Effect = {
  index : number,
  matrix : Matrix4,
  effect : EffectFunction,
};
class Deformer {

  mesh : Mesh;
  geometry : BufferGeometry;
  effects : Record<string, Effect>;

  constructor(mesh : Mesh) {
    this.mesh = mesh;
    this.geometry = mesh.geometry;
    this.geometry.morphAttributes.position = [];
    this.effects = {}
  }

  apply() : void {
    this.applyDeformers(this.geometry);
    this.mesh.updateMorphTargets();
  }

  applyDeformers (geometry : BufferGeometry) : void{

    geometry.morphAttributes.position = [];

    const positionAttribute = geometry.attributes.position;
    const positionList = Array.from({length: Object.keys(this.effects).length}, () => []);

    for ( let i = 0; i < positionAttribute.count; i ++ ) {

      const x = positionAttribute.getX( i );
      const y = positionAttribute.getY( i );
      const z = positionAttribute.getZ( i );

      const vertex = new Vector3(x, y, z);

      Object.entries(this.effects).forEach(([_, {effect, matrix}], j) => {

        vertex.applyMatrix4(matrix);  
        const vector = effect(vertex, i);

        vector.toArray(positionList[j], positionList[j].length);
      })
      
    }

    for(let i=0;i<positionList.length;i++) {
      geometry.morphAttributes.position.push(new Float32BufferAttribute( positionList[i], 3 ));
    }

  }

  addEffect(name: string, effect: EffectFunction, matrix: Matrix4 = new Matrix4()): void {
    this.effects[name] = { index : Object.keys(this.effects).length, effect, matrix };
  }
  
  removeEffect(name : string) : void {
    delete this.effects[name];
  }

  transform(name : string, matrix : Matrix4) : void {

    if(!this.effects[name]) {
      console.error("Effect does not exist");
      return;
    }

    this.effects[name].matrix = matrix;

    let beforeValue = 0;
    
    if(this.mesh.morphTargetInfluences) {
      beforeValue = this.mesh.morphTargetInfluences[0];
    }
    
    const tempGeometry = this.geometry.clone();
    
    this.mesh.geometry = tempGeometry;
    this.apply();

    this.changeWeight(name, beforeValue);
  }

  twist(matrix? : Matrix4) : void {

    const direction = new Vector3( 1, 0, 0 );
    
    this.addEffect('twist',(vertex) => {
      const { x, y, z } = vertex;
      vertex.set( x * 2, y, z );
      vertex.applyAxisAngle( direction, Math.PI * x / 2 )

      return vertex
    }, matrix)

  }

  spherify(matrix? : Matrix4) : void { 

    this.addEffect('spherify', (vertex) => {
      const { x, y, z } = vertex;
      vertex.set( 
        x * Math.sqrt( 1 - ( y * y / 2 ) - ( z * z / 2 ) + ( y * y * z * z / 3 ) ),
        y * Math.sqrt( 1 - ( z * z / 2 ) - ( x * x / 2 ) + ( z * z * x * x / 3 ) ),
        z * Math.sqrt( 1 - ( x * x / 2 ) - ( y * y / 2 ) + ( x * x * y * y / 3 ) ))
      return vertex;
    },matrix)
  }

  addDeformer(name : string, matrix : Matrix4) : void {

    switch(name) {
      case 'twist':   
        this.twist(matrix);
        break;
      case 'spherify':
        this.spherify(matrix);
        break;  
      default:
        console.error("Deformer does not exist");
        break;
    }   


  }



  changeWeight(name : string, value : number) {
    
    if(!this.mesh.morphTargetInfluences) {
      console.error("Mesh does not have morphTargetInfluences");
      return;
    } 

    const index = this.effects[name].index;

    if(index === undefined) {
      console.error("Effect does not exist");
      return;
    }

    this.mesh.morphTargetInfluences[index] = value;
  }
}

export { Deformer };