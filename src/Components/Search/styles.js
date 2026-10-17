import styled from "styled-components";

export const StyleSearch = styled.form ` 
  display: flex;
  align-items: center;
  height:40px;
  direction: rtl;
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
    background-color:${props=>props.theme.palette.main} ;
    border: 1px solid ${props=>props.theme.palette.ColorApp.primary_light};
    border-radius: 10px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    li{
      padding:12px 16px;
      color: ${props=>props.theme.palette.font};
      cursor: pointer;
      transition: background-color 0.2s ease;
      font-weight: 500;
      :hover{
        background-color:${props=>props.theme.palette.ColorApp.primary_light}33 ;
        color: ${props=>props.theme.palette.ColorApp.primary};
      }
    }
  }
input[type="text"] {
  width: 420px;
  padding: 0.6em 1.2em;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  border: 1.5px solid ${props=>props.theme.palette.ColorApp.gray_300};
  @media (min-width: 576px) {
    border-left: none;
  }
  color: ${props=>props.theme.palette.font};
  background-color: ${props=>props.theme.palette.main};
  transition: all 0.25s ease;
  font-size: 0.95rem;
  &:focus {
    border-color: ${props=>props.theme.palette.ColorApp.primary};
  }
}

select {
  padding: 0.6em 1em;
  border: 1.5px solid ${props=>props.theme.palette.ColorApp.gray_300};
  color: ${props=>props.theme.palette.ColorApp.gray_600};
  background-color: ${props=>props.theme.palette.main};
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.25s ease;
  &:focus {
    border-color: ${props=>props.theme.palette.ColorApp.primary};
  }
}

button {
  padding: 0.6em 1.4em;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  background: ${props=>props.theme.palette.ColorApp.primary};
  border: 1.5px solid ${props=>props.theme.palette.ColorApp.primary};
  color: ${props=>props.theme.palette.ColorApp.white};
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
}

button:hover {
  background: ${props=>props.theme.palette.ColorApp.primary_light};
}

${({theme})=>theme.media.xs}{
  input[type="text"] {
    width: 90vw;
    border-radius: 25px;
    border-color: ${props=>props.theme.palette.ColorApp.gray_300};
  }
  select{
    display: none;
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