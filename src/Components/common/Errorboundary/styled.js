import styled from "styled-components";

export const StyledFallbackUI = styled.div `
  padding:20px;
h2{
  color:red;
  margin:10px 0;
}
a{
  color:${(props) =>  props.theme.palette.ColorApp.primary};
  text-decoration:underline;
}
`