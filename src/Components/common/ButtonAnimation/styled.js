import styled from "styled-components";
import { MainButton } from "../../../Global/components";

export const StyledButton = styled(MainButton)` 
  p{
    margin: 0;
    padding: 0;
    color:${props=> props.theme.palette.font};      
  }
  .loader{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3px;
    >span{
      animation:1s ease-in-out infinite buttonLoader;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: #fff;
      border:1px solid black;
      &:nth-child(2){ 
        animation-delay: 0.2s;
      }
      &:nth-child(3){
        animation-delay: 0.4s;
      }
    }
  }
  @keyframes buttonLoader {
    0%{
      opacity:0;
    }
    40%{
      opacity: 1;
    }
    80%{
      opacity:0;
    }
    100%{
      opacity:0;
    }
  }
`