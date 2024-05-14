import styled from "styled-components";

export const StyleSearch = styled.form ` 
  display: flex;
  align-items: center;
  height:40px;
*{
  height:100%;
    :focus{
        outline:none;
    }
    font-size:${props=>props.theme.fontSizes.body}; ;
}
  position: relative;
  .results{
    z-index: 22;
    position:absolute;
    top:45px;
    left:0;
    right: 0;
    height: auto;
    background-color:${props=>props.theme.palette.page} ;
    border: 2px solid ${props=>props.theme.palette.ColorApp.primary};
    border-radius: 6px;
    li{
      padding:10px;
      color: ${props=>props.theme.palette.font};
      cursor: pointer;
      transition-property: background-color;
      transition-timing-function: 0.3s;
      :hover{
        background-color:${props=>props.theme.palette.ColorApp.primary_light} ;
      }
    }
  }
input[type="text"] {
  width:421px;
  padding: 0.5em;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border: 2px solid ${props=>props.theme.palette.ColorApp.primary};
  @media (min-width: 576px) {
    border-right: none;
  }
  color:${props=>props.theme.palette.ColorApp.gray_500};
  background-color:${props=>props.theme.palette.page};
}

select {
  padding: 0.5em;
  border: 2px solid ${props=>props.theme.palette.ColorApp.primary};
  color:  ${props=>props.theme.palette.ColorApp.gray_500};
  background-color:${props=>props.theme.palette.page};
}

button {
  padding: 0.5em 1em;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  background:${props=>props.theme.palette.ColorApp.primary};
  border: 2px solid ${props=>props.theme.palette.ColorApp.primary};
  color: ${props=>props.theme.palette.ColorApp.white};
  cursor: pointer;
}

button:hover {
  opacity:0.8;
}

${({theme})=>theme.media.xs}{
  input[type="text"] {
    width:92vw;
    border-radius:4px;
    border-color:${props=>props.theme.palette.ColorApp.gray_500};
  }
  select{
    display:none;
  }
}
button {
  display: none;
  ${({isOnChangeRequest})=>!isOnChangeRequest && `
display: block;
`}
}
${({theme})=>theme.media.s}{
        order:3
      }
.d-none{
  display: none;
}
`