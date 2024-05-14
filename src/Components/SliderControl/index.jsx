import React, { useState } from 'react';
import styled from 'styled-components';

const ControlStyle = styled.div`
  display: flex;
  margin-left: auto;
  width: fit-content;
  border-radius: 6px;
  button {
    width: fit-content;
    padding: 11px;
    cursor: pointer;
    border: 1px solid ${(props) => props.theme.palette.ColorApp.gray_300};
    background-color: ${(props) => props.theme.palette.main};
  }
  button:nth-of-type(${(props) => props.clickedIndex + 1}) {
    background-color: ${(props) => props.theme.palette.ColorApp.gray_200};
  }
`;

const SliderControl = () => {
  const [contentIndex, setContentIndex] = useState(1);

  return (
    <ControlStyle clickedIndex={contentIndex}>
      <button onClick={() => setContentIndex(contentIndex - 1)} disabled={contentIndex === 1}>{'<'}</button>
      <button onClick={() => setContentIndex(1)}>1</button>
      <button onClick={() => setContentIndex(2)}>2</button>
      <button onClick={() => setContentIndex(3)}>3</button>
      <button onClick={() => setContentIndex(contentIndex + 1)} disabled={contentIndex === 3}>{'>'}</button>
    </ControlStyle>
  );
};

export default SliderControl;
