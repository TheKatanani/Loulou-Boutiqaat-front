import styled from "styled-components";

export const SummaryStyled = styled.div`
    height:fit-content;
    padding:20px;
    background-color:${(props) => props.theme.palette.main};
    border: 1px solid ${props=> props.theme.palette.ColorApp.gray_300};
    border-radius: 6px; ;
    color:${(props) =>  props.theme.palette.font};
    font-size:${(props) => props.theme.fontSizes.body}rem;           
    .info li ,.total {
        display: flex;
        align-items:center;
        justify-content:space-between;
        margin:8px 0;
    }
    .info li:nth-child(2) p:nth-child(2){
        color:red;
    }
    .info li:nth-child(3) p:nth-child(2){
        color: ${props=> props.theme.palette.ColorApp.green};
    }
    .total{
        font-weight: 600;
        p:last-child{
            font-size:${(props) => props.theme.fontSizes.h6}rem;           
        }
    }
    .info{
        border-bottom: 1px solid ${props=> props.theme.palette.ColorApp.gray_300};
    }
    button{
        color:${(props) =>  props.theme.palette.ColorApp.white};
        background-color:${(props) => props.theme.palette.ColorApp.green}; ;
        margin:10px 0;
    }
`