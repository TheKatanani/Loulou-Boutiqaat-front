import styled from "styled-components";

export const StyledDropzone = styled.div`
  margin:20px 0;
  min-height: 200px;
  border: 2px dashed ${props=>props.theme.palette.ColorApp.gray_400}; 
  padding: '20px';
  text-align: 'center' ;
  border-radius:16px;
  display: grid;
  place-content:center;
  p{
    padding:10px;
    color:${props=>props.theme.palette.ColorApp.gray_400};  
  }
  img{
    max-width: 300px;
    max-height: 300px;
  }
`