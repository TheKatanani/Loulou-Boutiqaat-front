import styled from "styled-components";

export const StyledCategories = styled.div ` 
  .data{
    min-height:350px;
  }
  >div:nth-child(2n){
    background-color:${(props) =>  props.theme.palette.main};
  }
`