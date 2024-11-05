import styled from "styled-components";

export const StyledProfile = styled.div `
  direction:rtl;
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
display:grid;
place-content:center;
min-height: 60vh;
form{
    direction:rtl;
    padding: 20px;
    margin:0 auto;
    border-radius:8px;
    box-shadow: 5px 5px 10px ${props=>props.theme.palette.ColorApp.gray_100};
    background-color:${({theme})=>theme.palette.main};
    padding:2rem; 
    width:400px;
    /* width: min(400px , 100%) */ 
    color:${({theme})=>theme.palette.font};
    .phone{
      display: flex;
      text-align:end;
      gap:10px;
      align-items:center;
      direction: ltr;
      .input{
        flex:1;
      }
    }

    .passwordInput{
      position: relative;
      .forgotPassword{
        position:absolute;
        left:0;
        top:0;
        font-size:${(props) => props.theme.fontSizes.body2}rem;
      }
    }
    .gender{
      margin:10px;
      label:nth-child(2){
        margin:0 20px 0 0;
        /* margin:10px 10px 10px 0; */
      }
      input{
        margin-left: 6px;
        transform: translateY(1px);
      }
    }
  } 
`