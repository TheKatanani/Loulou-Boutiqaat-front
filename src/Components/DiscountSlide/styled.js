import styled from "styled-components";

export const DiscountSlideStyled =styled.div`
    padding:30px;
    display: flex;
    margin:20px 0 40px;
    border-radius: 8px;
    align-items:center;
    justify-content:space-between;
    background-color:#237CFF;
    color:${(props) =>  props.theme.palette.ColorApp.white};
    overflow:hidden;
    h6{
        font-size:${(props) => props.theme.fontSizes.h6}rem;
    }
    p{
        font-size:${(props) => props.theme.fontSizes.body}rem;
    }
    button{
        background-color:${(props) =>  props.theme.palette.ColorApp.orange}; 
        width:fit-content;
        position:relative;
        padding:10px;
        @media (max-width: 576px) {
            padding: 3px 5px;
        }
    }
    position: relative;
    ::before{
        content:"";
        position: absolute;
        top:-50px;
        right:-50px;
        width:500px;
        height:200px;
        transform:skewX(28deg);
        background: #005ADE;
        @media (max-width: 576px) {
            width:160px;
            transform:skewX(16deg);
        }
    }
`