import {
  createGlobalStyle
} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
td {
    overflow: auto;
}
body {
  background: linear-gradient(80deg,${(props) =>  props.theme.palette.main},#843abc);
  color: ${(props) => props.theme.palette.main};
  font-family: 'Inter', sans-serif;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  span,
  li,
  ul,
  a{
    direction:rtl;
  }
}
a{
    text-decoration:none;
}
ul{
  list-style:none;
}
/* Small */
@media (max-width: 576px) {   
  html {
    font-size: 72.5%; /* 62.5% of 16px = 10px */
  }
}
`;