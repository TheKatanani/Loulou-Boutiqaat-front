import styled from "styled-components";

export const ItemCardStayled = styled.div `
        ${props => props.type==="aside"?`
        display: flex;
        align-items:center;
        justify-content:space-between;
        gap:11px;
        .imgarea{
            width: 60px;
            height: 60px;
            max-width: 60px;
            max-height: 60px;
            margin:5px;
            border: 1px solid ${ props.theme.palette.ColorApp.gray_300};
            border-radius: 6px;
        }
        `:`
        .imgarea{
            background-color:  ${ props.theme.palette.ColorApp.gray_300};
            border-radius: 6px;
            
            min-height:${props.type==='RelatedProducts'?'173':'240'}px;
        }
        `}
    .imgarea{
        display: flex;
        align-items:center;
        justify-content:center;
        padding:5px;
        img{
            max-width:80%;
            max-height:80%;
        }
    }
    .text{
        margin:10px 0;
        .title{
            margin:0 0 7px;
            font-size:${(props) => props.theme.fontSizes.body}rem;
            color:${(props) =>  props.theme.palette.font};
        }
        .price{
            color:${(props) =>  props.theme.palette.ColorApp.gray_500}};
        }
`