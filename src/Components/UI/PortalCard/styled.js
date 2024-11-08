import styled from "styled-components";

export const StyledPortal = styled.div `
width:100%;
/* height:100vh; */
::before{
    content:'';
    position:fixed;
    inset:0;
    background-color: #00000055;
    opacity:0.3;
    z-index: 1;
  }
`