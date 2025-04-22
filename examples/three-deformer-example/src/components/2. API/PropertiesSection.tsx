export const PropertiesSection = () => {
  return (
    <>
      <h3 className="text-3xl font-semibold mt-10 mb-7">Properties</h3>
      <div className="mb-4">
        <p className="text-lg font-semibold mb-2 text-primary">
          object: Object3D
        </p>
        <p className="text-sm text-base-content/80">
          The target object to which the deformer is applied. Must be an
          instance of <code>THREE.Object3D</code>, such as a{' '}
          <code>THREE.Mesh</code> or a <code>THREE.Group</code>. Group objects
          are supported and all descendant meshes will be included in the
          deformation.
        </p>
      </div>

      <div className="mb-4">
        <p className="text-lg font-semibold mb-2 text-primary">
          objectBoundingBox: Box3
        </p>
        <p className="text-sm text-base-content/80">
          Automatically computed bounding box of the object. Used to determine
          deformation range and center.
        </p>
      </div>

      <div className="mb-8">
        <p className="text-lg font-semibold mb-2 text-primary">
          effects: Record&lt;string, DeformerEffect&gt;
        </p>
        <p className="text-sm text-base-content/80">
          A dictionary of all registered deformation effects. Each key is a
          unique identifier (e.g. <code>"twist"</code>, <code>"bend"</code>),
          and the value is a <code>DeformerEffect</code> that controls the
          deformation behavior.
        </p>

        <div className="mt-4 p-4 bg-base-200 rounded">
          <p className="font-semibold mb-2">DeformerEffect</p>
          <div className="text-sm text-base-content/80 space-y-2">
            <div>
              <code className="font-mono">
                effectFunction: (vertex: Vector3, option?: any, index?: number)
                =&gt; Vector3
              </code>
              <br />
              <span>
                A function that takes in a vertex and returns the transformed
                vertex.
              </span>
            </div>
            <div>
              <code className="font-mono">matrix: Matrix4</code>
              <br />
              <span>
                An optional matrix to apply additional transformation.
              </span>
            </div>
            <div>
              <code className="font-mono">
                option?: Record&lt;string, any&gt;
              </code>
              <br />
              <span>
                A user-defined option object. The structure depends on the
                effect type (e.g. axis, strength).
              </span>
            </div>
            <div>
              <code className="font-mono">weight?: number</code>
              <br />
              <span>
                How strongly the effect is applied. A value between{' '}
                <code>0</code> and <code>1</code>.
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
