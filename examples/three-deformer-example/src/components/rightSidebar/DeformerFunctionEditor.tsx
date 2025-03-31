import MonacoEditor, { OnChange } from '@monaco-editor/react';
import { useState } from 'react';
import * as THREE from 'three';

export const DeformerFunctionEditor = () => {
  const [code, setCode] = useState<string>(
    `
    const {x, y, z} = vertex;

    return vertex;
    `,
  );

  const handleChange: OnChange = value => {
    if (value) setCode(value);
  };

  const showValue = () => {
    const func = createSafeDeformer(code);
    if (!func) {
      console.error('Invalid function code');
      return;
    }
    func(new THREE.Vector3(1, 2, 3));
  };

  const createSafeDeformer = (code: string) => {
    const api = {
      Math,
      THREE,
    };

    try {
      const fn = new Function(
        'vertex',
        'api',
        `
        "use strict";
        const { Math, THREE } = api;
        ${code}
      `,
      );

      return (vertex: THREE.Vector3) => fn(vertex, api);
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  return (
    <>
      <MonacoEditor
        theme="vs-dark"
        height="200px"
        width="450px"
        language="javascript"
        defaultValue={code}
        options={{
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
        onChange={handleChange}
      />
      <button onClick={showValue}>Show Value</button>
    </>
  );
};
