import styled from "styled-components";

export const StyledProfile = styled.div`
  margin: 160px 0 60px;
  min-height:calc(50dvh - 113px);
  color:${({theme})=>theme.palette.font};
  p{
    text-transform: capitalize;
  }
  .container{
    display: grid;
    place-content: center;
  }
  a{
    display: block;
    margin-left: auto;
    text-decoration: underline;
    transform: translateY(-30px);
  }
`