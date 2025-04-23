export const ConstructorSection = () => {
  return (
    <>
      <h3 className="text-2xl font-semibold mb-4">Constructor</h3>
      <div className="bg-base-200 rounded p-4 text-sm font-mono mb-4">
        new Deformer(object: Object3D)
      </div>
      <ul className="list-disc list-inside mb-6">
        <li>
          <span className="font-medium">object</span> (
          <code>THREE.Object3D</code>) — The 3D object to apply deformation to.
        </li>
      </ul>
    </>
  );
};
