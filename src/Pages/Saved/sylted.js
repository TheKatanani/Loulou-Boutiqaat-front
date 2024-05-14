import styled from "styled-components";

export const StyledSaved = styled.div`
    min-height:calc(80dvh - 113px);
    margin: 120px auto 60px;
  ${({theme:{media}})=>media.xs}{
    margin: 190px auto 60px; 
  }
  ${({theme:{media}})=>media.s}{ 
      margin: 200px auto 60px;
    }
  ${({theme:{media}})=>media.l}{ 
      margin: 140px auto 60px;
    }
    p.noItems ,.noItems +a{
      text-align: center;
      color:${({theme})=>theme.palette.font};
      margin:90px auto 60px;
      font-size:${({theme})=>theme.fontSizes.h2}rem;
    }
    .noItems + a{
      margin:30px auto;
      font-size:${({theme})=>theme.fontSizes.h3}rem;
      color:${({theme})=>theme.palette.ColorApp.primary};
      display: block;
    } 
`