import styled from "styled-components";

export const Styledcategory = styled.div `
  >.container .data{ 
        background: linear-gradient(45deg,#843abc66,#843abc);
        display: grid;
        gap:20px;
        ${({theme})=>theme.media.xs}{
            grid-template-columns: auto;
            
        }
        ${({theme})=>theme.media.s}{
            grid-template-columns: repeat(2,auto); 
        }
        ${({theme})=>theme.media.m}{
            grid-template-columns: repeat(3,auto); 
            gap:10px;
            >div{
                padding: 10px;
            }
        }
        ${({theme})=>theme.media.l}{
            grid-template-columns: repeat(4,auto); 
            >div{
                padding: 10px;
            }
        } 
        ${({theme})=>theme.media.xl}{ 
            >div{
                padding: 20px;
            }
        } 
        justify-content: center;
        align-items: center;
        overflow: hidden;
        border-radius: 8px;
        border:2px solid ${(props) =>  props.theme.palette.ColorApp.gray_300};
        box-shadow: 10px 11px 19px 10px ${props=>props.theme.palette.ColorApp.primary}55;
        padding: 20px;
        margin: 30px 0;
        position:relative;
        > .prev,.next{
            position: absolute;
            top:50% ;
            transform:translateY(-50%) ; 
            color:${(props) =>  props.theme.palette.ColorApp.primary};
            font-size: 2rem;
            z-index: 2;
            cursor: pointer;
            background-color: ${(props) =>  props.theme.palette.ColorApp.gray_300};
            border:1px solid ${(props) =>  props.theme.palette.ColorApp.primary};
            border-radius: 50%;
            padding: 0px 7px; 
            &.disabled{
                visibility: hidden;
            }
        }
        > .prev{
            left:5px;
        }
        > .next{
            right:5px;
        }
    }
    padding: 60px 0;
    min-height: calc(100vh - 113px);
    .noData{
        text-align: center;
        color:${(props) =>  props.theme.palette.ColorApp.primary};
        font-size: 2rem;
        font-weight: bold;
    }
    `

export const StyeldCard = styled.div `
    max-width: 280px;
    padding:20px;
    background-color:${(props) =>  props.theme.palette.main};
    width:100%;
    border: 1px solid ${(props) =>  props.theme.palette.ColorApp.gray_300};;
    border-radius: 6px;
    color:${(props) =>  props.theme.palette.font};
    font-size:${(props) => props.theme.fontSizes.body}rem;
    transition: 0.3s ease-in-out;
    p{
        margin:10px 0;
    }
    .content{
        position:relative;
        display: flex;
        justify-content:center;
        flex-direction: column;
        .icons{
            cursor: pointer;
            position:absolute;
            top:5px;
            left:0px;
            display: flex;
            gap:3px;
            .Select svg{
                ${props=>props.isSelected&&`background-color:${props.theme.palette.ColorApp.primary_light}`};
            }
            .Like svg{
                ${props=>props.isLike&&`background-color:${props.theme.palette.ColorApp.primary_light}`};
            }
            svg{
                padding:5px;
                width:30px;
                height:30px;
                border: 1px solid ${(props) =>  props.theme.palette.ColorApp.gray_300};;
                border-radius: 5px;
            }
        }
        h3{
            min-height:50px;
            overflow:auto;
        }
        .title{
            ${props=>!props.full&&`color:${(props) =>  props.theme.palette.ColorApp.gray_800}`};
            font-size:${(props) => props.theme.fontSizes.body}rem;
            height:40px;
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
        .description{
            height:60px;
        color:${(props) =>  props.theme.palette.ColorApp.gray_600};
        span{
            color:${(props) =>  props.theme.palette.ColorApp.primary};
            margin:25px 0 0 ;
            cursor: pointer;
        }
        }
    }
`