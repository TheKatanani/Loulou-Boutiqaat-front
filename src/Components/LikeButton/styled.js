import styled from "styled-components";

export const StyledSaved = styled.div` 
  svg{
    ${props=>props.isInSaved&&`background-color:${props.theme.palette.ColorApp.primary}`};
    padding:5px;
    width:30px;
    height:30px;
    border: 1px solid ${(props) =>  props.theme.palette.ColorApp.gray_300};;
    border-radius: 5px;
    path{
        ${props=>props.isInSaved&&`fill:${props.theme.palette.main}`};
      }
  }
`