import styled from "styled-components";

export const StyledSvg = styled.div`
${({loader,theme})=>loader && `
  display: grid;
  place-content: center;
  height:100dvh;
  position:fixed;
  inset:0;
  background-color:${theme.palette.ColorApp.primary_light}99;
  z-index:9999;
`}
svg{ 
  overflow: visible;
  width: 20rem;
    font-weight:700; 
    text {
    font-size:5rem;
    stroke-width: 2;
    text-transform: uppercase;
    letter-spacing:-4px; 
    stroke:${(props) =>  props.theme.palette.ColorApp.primary};;
    animation:4s infinite alternate animat-stroke ;
    text-shadow: 18px 6px 15px ${(props) =>  props.theme.palette.ColorApp.primary};;
  }

  .infinity{ 
    font-size: 10rem; 
  }
  @keyframes animat-stroke {
    0%{
      fill:transparent;
      stroke: ${(props) =>  props.theme.palette.ColorApp.primary};;
      stroke-width: 3;
      stroke-dashoffset: 25%;
      stroke-dasharray: 0 32%;
    }
    50%{
      fill:transparent;
      stroke: ${(props) =>  props.theme.palette.ColorApp.primary};;
      stroke-width: 3; 
    }
    80%{
      fill:${(props) =>  props.theme.palette.ColorApp.primary};;
      stroke: transparent;
      stroke-width: 0;
      stroke-dashoffset: -25% ;
      stroke-dasharray: 32% 0;
    }
    100%{
      fill:${(props) =>  props.theme.palette.ColorApp.primary};;
      stroke: transparent;
      stroke-width: 0;
      stroke-dashoffset: -25% ;
      stroke-dasharray: 32% 0;
    }
    
  }
}
  `