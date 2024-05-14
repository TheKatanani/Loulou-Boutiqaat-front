import styled from "styled-components";

export const StyledAlert = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50% , -50%);
    width: fit-content;
    padding: 40px;
    background-color:${(props) => props.theme.palette.ColorApp.primary};
    border-radius: 8px;
    z-index: 99999;
    span{
      position: absolute;
      top: -5px;
      right: -5px;
      background-color:${(props) => props.theme.palette.main};
      color:${(props) => props.theme.palette.ColorApp.primary};
      padding: 2px 7px;
      border-radius: 50%;
      border: 1px solid ${(props) => props.theme.palette.ColorApp.primary};
      cursor: pointer;
    }
`
export const StyledLayout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color:${(props) => props.theme.palette.main};
  opacity: 0.9;
  z-index: 99990;
`