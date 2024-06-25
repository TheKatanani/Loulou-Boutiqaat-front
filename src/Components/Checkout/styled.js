import styled from "styled-components";

export const StyledCheckOut = styled.div `   
  margin: 30px 0;
  padding: 20px;
  border-radius:8px;
  background-color:${({theme})=>theme.palette.main};
  box-shadow: 5px 5px 10px ${props=>props.theme.palette.ColorApp.gray_100};
  position:fixed;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  z-index: 2;
  .d-flex{
    div{
      flex:1;
    }
    display: flex;
    justify-content: center;
    align-items:end;
    ${({theme:{media}})=>media.xs}{
    flex-wrap: wrap;
  }
    ${({theme:{media}})=>media.s}{
    flex-wrap: wrap;
  }
    ${({theme:{media}})=>media.m}{
    flex-wrap: nowrap;
  }
    gap:10px;
    .input,.select,select{
      width: 100%;
    }
  }
  button{
    background-color:${({theme})=>theme.palette.ColorApp.primary_light}; 
    margin-bottom: 7px; 
  &.disabled{
    opacity: 0.7;
    background-color:${({theme})=>theme.palette.ColorApp.gray_500};
    cursor:not-allowed
    }
  }   
`