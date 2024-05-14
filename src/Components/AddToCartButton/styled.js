import styled from "styled-components";

export const StyledAddCart = styled.div` 
  svg{
    ${props=>props.isInCart&&`background-color:${props.theme.palette.ColorApp.primary}`};
      padding:5px;
      width:30px;
      height:30px;
      border: 1px solid ${(props) =>  props.theme.palette.ColorApp.gray_300};;
      border-radius: 5px;
      path{
        ${props=>props.isInCart&&`fill:${props.theme.palette.main}`};
      }
  }
`