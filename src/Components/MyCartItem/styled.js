import styled from "styled-components";

export const MyCartItemStyled = styled.div `
    display: flex;
    align-items:flex-start;
    justify-content:space-between;
    margin:10px;
    gap:11px;
    a{
        color:${(props) =>  props.theme.palette.ColorApp.primary};
        font-weight: bold;
    }
    .content{
        display: flex;
        gap:20px;
    }
    .imgarea{
        min-width: 110px;
        min-height: 110px;
        max-width: 110px;
        max-height: 110px;
        object-fit: contain;
        margin:5px;
        border: 1px solid ${props=> props.theme.palette.ColorApp.gray_600};
        border-radius: 6px;
        display: flex;
        align-items:center;
        justify-content:center;
        padding:5px;
            img{
                max-width:80%;
                max-height:80%;
            }
    }
    .quntity{
        p{    
            direction:ltr;
        }
    }
    .text ,.quntity{
    margin:10px 0;
    .title{
        margin:0 0 7px;
        font-size:${(props) => props.theme.fontSizes.body}rem;
        color:${(props) =>  props.theme.palette.font};
    }
    .price{
        font-size:${(props) => props.theme.fontSizes.body}rem;
        color:${(props) =>  props.theme.palette.font}};
    }
    .details{
        margin:10px 0 6px;
        line-height: 24px;
        width:70%;
        font-size:${(props) => props.theme.fontSizes.body}rem;
        color:${(props) =>  props.theme.palette.ColorApp.gray_500};
    }
    .buttons{
        button{
            width:fit-content;
            padding:10px;
        }
        display: flex;
        gap:10px;
        button:first-child{
            color:red;
        }
    }
    select{
        margin:12px 0 0%;
        width:123px;
    }
    @media (max-width: 576px) {
        flex-wrap:wrap;
        .quntity{
        margin:0 0 10px;
        width:100%;
        display: flex;
        justify-content:space-between;
        align-items: center;
        select{
            order: -1;
        }
    }
    .content{
    gap:0px;
    }
    .imgarea{
        min-width: 70px;
        min-height: 70px;
        max-width: 70px;
        max-height: 70px;
    }
    }
    .itemQuantity{
        display: flex;
        align-items: center;
        justify-content: center;
        gap:10px;
        margin: 20px 0;
        button{
            background-color: transparent;
            padding:2px 7px;
            cursor: pointer;
            font-size:${(props) => props.theme.fontSizes.body}rem;
            border-radius:4px;
            color:${({theme})=>theme.palette.ColorApp.primary};
            border:2px solid ${({theme})=>theme.palette.ColorApp.primary}
        }
        p{
            font-size:${(props) => props.theme.fontSizes.body}rem;
            color:${(props) =>  props.theme.palette.ColorApp.gray_500};
        }
    }
    .saveForLater{
        ${({isInSaved,theme})=>isInSaved&&
            `
            border: 1 px solid ${theme.palette.ColorApp.gray_300};
            background-color: ${theme.palette.ColorApp.primary};
            color: ${theme.palette.ColorApp.white};
            ` 
    }
    }
`