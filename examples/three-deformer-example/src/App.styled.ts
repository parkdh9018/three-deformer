import styled from 'styled-components';

export const StyledApp = styled.div<{ $isCustom: boolean }>`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: ${({ $isCustom }) =>
    $isCustom ? '1fr 1fr 1fr 1fr 450px' : 'repeat(5, 1fr)'};
  grid-template-rows: repeat(3, 1fr);
  grid-template-areas: ${({ $isCustom }) =>
    $isCustom
      ? `
      "left viewer viewer viewer right"
      "left viewer viewer viewer right"
      "left viewer viewer viewer right"`
      : `
      "left viewer viewer viewer viewer"
      "left viewer viewer viewer viewer"
      "left viewer viewer viewer viewer"`};
`;
