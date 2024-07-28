import styled from "styled-components";

export const StyledForgotPassword = styled.div `
  display:grid;
  place-content:center;
  min-height:100vh;
  >div{
    h3{
      text-align: center;
      margin-bottom: 1rem;
    }
    background-color:${({theme})=>theme.palette.main};
    color:${({theme})=>theme.palette.font};
    border-radius:16px; 
    padding:2rem;
    /* width:min(400px,100%); */
    width:400px;
  }
`
export const StyledVerifyOTP = styled.div `
  display:grid;
  place-content:center;
  min-height:100vh; 
.container{
  width: 400px;
  padding: 3rem 4rem;
  background-color: #ffffff;
  border-radius: 16px; 
}

h3.title {
  font-size: 28px;
  font-weight: 700;
  color: #093030;
  margin-bottom: 25px;
}

p.sub-title {
  color: #B5BAB8;
  font-size: 14px;
  margin-bottom: 25px;
}

p span.phone-number {
  display: block;
  color: #093030;
  font-weight: 600;
}

.wrapper {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: space-between;
}

.wrapper input  {
  width: 50px;
  line-height: 75px;
  font-size: 32px;
  border: none;
  background-color: #EAF5F6;
  border-radius: 5px;
  text-align: center;
  text-transform: uppercase;
  color: #093030;
  margin-bottom: 25px;
}

.wrapper input:focus {
  outline: none;
}

button.resend {
  background-color: transparent;
  border: none;
  font-weight: 600;
  color: #3DAFE1;
  cursor: pointer;
  margin-top:1rem;
} 
`
export const StyledContactus = styled.div `

  .container{
    min-height:calc(100vh - 63.2px); 
    display: flex;
    justify-content:space-evenly;
    align-items:center;
    text-align:center;
    ${({theme:{media}})=>media.xs}{
      flex-direction: column;
      justify-content:center;
    }
    ${({theme:{media}})=>media.s}{  
      justify-content:center;
      flex-direction: column;
    }
    ${({theme:{media}})=>media.m}{  
    justify-content:space-evenly;
    flex-direction: row;
    }
    img{
      width:50%; 
    }
    h1{
      font-size:${(props) => props.theme.fontSizes.h1*1.5}rem;
      color:${({theme})=>theme.palette.font};
      /* color:${({theme})=>theme.palette.ColorApp.primary}; */
    }
    p{
      color:${({theme})=>theme.palette.font};
      margin:10px 0 25px;
      font-size:${(props) => props.theme.fontSizes.body}rem;
    }
    .buttons{
      display: flex;
      justify-content:center;
      align-items:center;
      text-align:center;
      gap: 15px;
      a{
        display: block;
      }
      button{
        width:fit-content;
        padding:10px 20px;
        font-weight: bold;
        &.signIn{
          color:${({theme})=>theme.palette.ColorApp.primary};
        }
      }
    }
  }
`