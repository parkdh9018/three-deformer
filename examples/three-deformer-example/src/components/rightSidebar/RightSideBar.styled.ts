import styled from 'styled-components';

export const Wrapper = styled.div`
  grid-area: right;
  background-color: rgb(85, 84, 84);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: white;
`;

export const ApplyButton = styled.button`
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;
`;
