import styled from "styled-components";

export const StyledFileUploaded = styled.span `
  .d-flex{
    display: flex;
    align-items: center;
  }
  .imageBox{
    position: relative;
    img{
            max-width:205px; 
        }
    .remove{
      position:absolute;
      right: 0;
      top: 0;
    background-color: red;
    line-height: 20px;
    text-align: center;
    width: 20px;
    height: 20px;
    border: 1px solid ${(props) =>  props.theme.palette.font};
    border-radius: 50%;
    cursor: pointer;
    color:${(props) =>  props.theme.palette.font}; 
  }
  }
    `