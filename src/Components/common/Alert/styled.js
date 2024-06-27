import styled from "styled-components";

export const StyledAlert = styled.div` 
  padding: 30px;
  border-radius:8px;
  background-color:${({theme})=>theme.palette.main};
  color:${({theme})=>theme.palette.font};
  position:fixed;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  z-index: 2;
  span{
    position:absolute;
    right:-5px;
    top:-5px;
    border-radius:50%;
    border:1px solid ${({theme})=>theme.palette.main};
    background-color: red;
    color:white;
    padding:3px 8px;
    cursor: pointer;
  }
  a{
    margin: 15px 0 0;
    display: block;
  }
`