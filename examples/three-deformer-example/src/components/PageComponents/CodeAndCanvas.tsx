import { Canvas } from '@react-three/fiber';
import MonacoEditor from '@monaco-editor/react';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Deformer } from 'three-deformer';

type Props = {
  code: string;
  mesh: THREE.Mesh;
  deformer: Deformer;
  children?: React.ReactNode;
  height?: string;
};

export const CodeAndCanvas = ({
  code,
  mesh,
  height = '480px',
  children,
}: Props) => {
  return (
    <div className="flex justify-center gap-5 flex-row px-3">
      <div className="basis-2/3 py-10">
        <MonacoEditor
          theme="vs-dark"
          height={height}
          language="javascript"
          defaultValue={code}
          options={{
            readOnly: true,
            wordWrap: 'on',
            scrollBeyondLastLine: false,
            minimap: { enabled: false },
            scrollbar: {
              vertical: 'hidden',
              horizontal: 'hidden',
            },
            lineNumbers: 'off',
            overviewRulerLanes: 0,
          }}
        />
      </div>
      <div className="basis-1/3 flex flex-col gap-5 items-start justify-start py-10">
        <div className="aspect-square w-full">
          <Canvas
            style={{
              backgroundColor: 'skyblue',
              borderRadius: '10px',
            }}
          >
            <primitive object={mesh} position={[0, 0, 0]} />
            <ambientLight color={'white'} intensity={1.5} />
            <directionalLight
              color={'white'}
              intensity={1.5}
              position={[1, 1, 1]}
            />
            <OrbitControls />
          </Canvas>
        </div>
        {children}
      </div>
    </div>
  );
};
