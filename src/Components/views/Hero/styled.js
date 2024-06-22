import styled from "styled-components";

export const StyledHero = styled.section `
  /* background: linear-gradient(45deg,${props=>props.theme.palette.main},#843abc); */
  .conatainer{ 
  min-height:calc(100dvh - 113px); 
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center; 
}
figure {
  flex: 1;
  text-align: center;
  img{
    width: min(100%,300px);
    filter: drop-shadow(2px 4px 6px white);
    min-width: 250px
  }
}
color:${({theme})=>theme.palette.ColorApp.primary};  
.text{
    min-width: min(100%,400px);
      flex: 1;
      padding: 20px;
      text-align: center;
      font-family: 'Times New Roman', Times, serif;
    h1{
      font-size: 5rem;
    }
    p{
      font-size: 1.2rem;
      padding: 20px;
      color: #000;
    }
  }
`