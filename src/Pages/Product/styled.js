import styled from "styled-components";

export const StyledProductPage = styled.div `
    margin: 140px 0 20px;
    direction: rtl;
    padding:20px;
    background-color:${(props) =>  props.theme.palette.main};
    width:100%;
    border: 1px solid ${(props) =>  props.theme.palette.ColorApp.gray_300};;
    border-radius: 6px;
    color:${(props) =>  props.theme.palette.font};
    font-size:${(props) => props.theme.fontSizes.body}rem;
    .card{
        display: flex;
        justify-content: space-between;
        align-items: center; 
        ${({theme:{media}})=>media.xs}{
            flex-wrap: wrap;
            justify-content: center;
        }
        gap:20px;
        .title{
            margin: 20px 0;
    }
    }
    .content{
        min-width:min(400px,100%);
        flex:1;
        position:relative;
        display: flex;
        justify-content:center;
        flex-direction: column;
        .icons{
            cursor: pointer;
            position:absolute;
            top:0px;
            left:0px;
            display: flex;
            gap:3px; 
        }
        .title{
            margin:35px 0 10px;
            ${props=>!props.full&&`color:${(props) =>  props.theme.palette.ColorApp.gray_800}`};
        }
        .price{
            font-size:${(props) => props.theme.fontSizes.h6}rem;
            .prevCost{
                color:${(props) =>  props.theme.palette.ColorApp.gray_500};
                font-size:${(props) => props.theme.fontSizes.body}rem;
                text-decoration: line-through;
                opacity:0.8;
                padding:5px;
            }
        }
      }
      pre{
        text-wrap:wrap;
        margin:15px 0;
      }
`