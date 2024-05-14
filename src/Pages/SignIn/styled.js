import styled from "styled-components";

export const LoginStyle = styled.div `
    display: flex;
    align-items:center;
    justify-content:center;
    width:100%;
    margin:10px 0;
    min-height:calc(100vh - 85px);
    h1{
        color:${(props) => props.theme.palette.font};
    }
    main{
        width:387px;
        box-shadow: 0px 3px 10px rgba(32, 32, 32, 0.1);
        background-color: ${(props) => props.theme.palette.main};
        border-radius: 6px;
        padding:1.88rem;
        margin:0 auto;
    }
    form + p{
        margin: 20px auto 0;
        text-align: center;
        color:${(props)=>props.theme.palette.ColorApp.gray_800};
    }
    a p{
        color:${(props)=>props.theme.palette.ColorApp.gray_800};
        font-size:${(props) => props.theme.fontSizes.body};
        text-align:center;
        margin:30px 0 4px;
    }
    a{
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: ${(props) => props.theme.fontSizes.body}rem;
        letter-spacing: -0.2px;
        color: ${(props)=>props.theme.palette.ColorApp.primary};
    }
    
    .phone{
        margin: 20px 0 0;
        label{
            color:${props=> props.theme.palette.font};      
        }
        >div{
            display: flex;
            align-items:center;
            gap:5px;
            >*{
                flex: 1;
            }
            select{
                width: 100%;
            }
        }
    }
`