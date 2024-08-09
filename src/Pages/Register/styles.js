import styled from "styled-components";

export const RegisterStyled = styled.div `
margin: 20px 0;
    display: flex;
    align-items:center;
    justify-content:center;
    width:100%;
    /* margin:30px 0; */
    min-height:calc(100vh - 74px);
    h1{
        color:${(props) => props.theme.palette.font};
    }
    main{
        width:400px;
        box-shadow: 0px 3px 10px rgba(32, 32, 32, 0.1);
        background-color: ${(props) => props.theme.palette.main};
        border-radius: 6px;
        padding:1.5rem 1.7rem;
        margin:0 auto;
    }
    .barthDay{
        display: flex;
        align-items:center;
        justify-content:center;
    }
    p{
    color:${(props)=>props.theme.palette.ColorApp.gray_800};
    font-size:${(props) => props.theme.fontSizes.body};
    text-align:center;
    margin:20px 0 4px;
}
    a{
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: ${(props) => props.theme.fontSizes.body}rem;
        letter-spacing: -0.2px;
        color: ${(props)=>props.theme.palette.ColorApp.primary};
    }
    .logInPassword{
    position: relative;
}
.logInPassword .forgotPassword{
    position:absolute;
    top:2px;
    right:0;
}
.logInPassword span{
    img{
        width:22px;
    }
    position:absolute;
    top:50%;
    transform:translateY(-14%);
    right: 12px;
    cursor: pointer;
}
/* add  show class to use this code */
.logInPassword.text span::before{
    content: "";
    width: 3px;
    height: 22px;
    font-size: 30px;
    font-weight: bold;
    background-color: #8692a6;
    position: absolute;
    border-radius: 8px;
    top: -2px;
    left: 50%;
    transform: translateX(-50%) rotate(30deg);
    opacity: 0.8;
}
.name{
        display: flex;
        align-items:center;
    }
.phone{
    label{
        color:${props=> props.theme.palette.font};      
    }
    >div{
        display: flex;
        align-items:center;
        >*{
            flex: 1;
        }
    }
   } 
   form{
    border-bottom: 1px solid ${props=> props.theme.palette.ColorApp.gray_300};
   }
   .gender{
    margin: 10px 0;
    display: flex;
    gap: 20px;
    align-items: center;
    label{
        display: flex;
        justify-content: space-between;
        align-items: center;
        color:${({theme})=>theme.palette.font};
        input{
            margin-inline-end: 5px;
        }    
    }
   }
`