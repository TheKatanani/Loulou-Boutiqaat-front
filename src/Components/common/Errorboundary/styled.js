import styled from "styled-components";

export const StyledFallbackUI = styled.div `
  padding:20px;
  min-height: 100vh;
  display:grid;
  place-content:center;
  text-align: center;
  h2{ 
    margin:10px 0;
    color:#ff5d5b;
  }
  p{
    margin:10px 0;
    color:${(props) =>  props.theme.palette.ColorApp.gray_800};
}
a{
  color:${(props) =>  props.theme.palette.ColorApp.primary};
  text-decoration:underline;
  display: block;
}
.container{
  display: flex;
  justify-content:center;
  align-items:center;
  flex-wrap: wrap;
  gap:30px; 
  img{
    width: min(100% , 500px);
    order:-1;
    ${({theme:{media}})=>media.m}{
      order:1;
    }
  }
  button{
    padding:12px 15px;
    width:fit-content;
  }
}
`