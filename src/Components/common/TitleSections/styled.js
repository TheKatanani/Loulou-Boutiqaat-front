import styled from "styled-components";

export const StyledTitle = styled.button`  
  display: block;
  width: fit-content; 
  padding: 15px 20px;
  margin: 0 auto;
  background-color: transparent;
  cursor: pointer;
  border: 1px solid black;
  border-radius: 8px;
  color: ${({theme})=>theme.palette.font};
  font-size: 27px;
  text-transform: uppercase;
  font-weight: bold;
  position: relative;
  transition: 0.7s; 
::before {
  content: "";
  width: 12px;
  height: 12px;
  background-color: ${({theme})=>theme.palette.ColorApp.primary};
  position: absolute;
  right: -23px;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 50%;
  transition: 0.7s;
}
::after {
  content: "";
  width: 12px;
  height: 12px;
  background-color: ${({theme})=>theme.palette.ColorApp.primary};
  position: absolute;
  left: -23px;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 50%;
  transition: 0.7s;
}
:hover {
  :before {
  height: 100%;
  width: 50%;
  right: 50%;
  top: 0px;
  border-radius: 0;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  transform: translateY(0);
  z-index: -1;
}
  ::after {
  height: 100%;
  width: 50%;
  left: 50%;
  top: 0px;
  border-radius: 0;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  transform: translateY(0);
  z-index: -1;
}
  color: ${({theme})=>theme.palette.main};;
  z-index: 1;
  border-color: transparent;
}

`
// export const StyledTitle = styled.h2` 
//   text-transform:uppercase;
//   margin:0 auto 0;
//   text-align: center;
//   position: relative;
//   width: fit-content;
//   padding: 10px 15px;
//   color: ${props=>props.theme.palette.font};
//   ::before,::after{
//     content: '';
//     background-color: #000;
//     position: absolute;
//     width: 60%;
//     height: 2px;
//     background-color:${({theme})=>theme.palette.ColorApp.primary}
//   }
//   ::before{
//     top:0;
//     left:0;
//   }
//   ::after{
//     bottom:0;
//     right:0;
//   }
// `