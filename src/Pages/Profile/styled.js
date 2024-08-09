import styled from "styled-components";

export const StyledProfile = styled.div `
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
`
export const StyledUpdateUserInfo = styled.div `
/* margin: 30px 0; */
/* margin: 120px 0 30px; */
min-height: 50vh;
form{
    padding: 20px;
    margin:0 auto;
    border-radius:8px;
    box-shadow: 5px 5px 10px ${props=>props.theme.palette.ColorApp.gray_100};
    background-color:${({theme})=>theme.palette.main};
    padding:2rem; 
    width:400px;
    /* width: min(400px , 100%) */ 
    color:${({theme})=>theme.palette.font};
    .gender{
      margin:10px;
      label{
        margin:10px 10px 10px 0;
        input{
          margin-right: 6px;
          transform: translateY(1px);
        }
      }
    }
  } 
`