import styled from "styled-components";

export const CouponStyled=styled.div`
/* width:100%; */
margin-bottom: 12px;
        padding:16px;
        background-color:${props=>props.theme.palette.main};
        border: 1px solid ${props=> props.theme.palette.ColorApp.gray_300};
        border-radius: 6px; 
    .myInput{
        display: flex;
        align-items:flex-end;
        button{
            padding:10px;
            width:fit-content;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
        }
        input{
            margin:9px 0 0 ;
            flex:1;
            border-right:none;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
        }
    }
`