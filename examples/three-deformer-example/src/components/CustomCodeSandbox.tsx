import { useRecoilState } from 'recoil';
import { customFunctionAtom } from '../state/atoms/customFunctionAtom';
import { useState } from 'react';
import MonacoEditor, { OnChange } from '@monaco-editor/react';

export const CustomCodeSandbox = () => {
  const [customFunctionCode, setCustomFunctionCode] =
    useRecoilState(customFunctionAtom);
  const [code, setCode] = useState(customFunctionCode);

  const handleChange: OnChange = value => {
    if (value) setCode(value);
  };

  const ApplyValue = () => {
    setCustomFunctionCode(code);
  };
  return (
    <dialog id="my_modal_1" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Custom Code</h3>
        <div className="divider" />
        <MonacoEditor
          theme="vs-dark"
          height="200px"
          language="javascript"
          defaultValue={customFunctionCode}
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
        <div className="card-actions justify-end mt-4">
          <form method="dialog" className="flex-none">
            <button className="btn btn-primary" onClick={ApplyValue}>
              Apply
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};
