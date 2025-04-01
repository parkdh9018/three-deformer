import { useRecoilState } from 'recoil';
import * as S from './RightSideBar.styled';
import { customFunctionAtom } from '../../state/atoms/customFunctionAtom';
import { useState } from 'react';
import MonacoEditor, { OnChange } from '@monaco-editor/react';

export const RightSidebar = () => {
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
    <S.Wrapper>
      <S.Title>code</S.Title>
      <MonacoEditor
        theme="vs-dark"
        height="200px"
        width="450px"
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
      <S.ApplyButton onClick={ApplyValue}>Apply</S.ApplyButton>
    </S.Wrapper>
  );
};
