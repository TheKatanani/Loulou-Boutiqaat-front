import styled from "styled-components";

export const StyledImagesSliderCard = styled.div `
        direction: ltr;
        ${({isImages})=>isImages && `
        height:210px;
        min-width: min(100%, 260px);
        `}
        width:100%;
        &.cart{
            height:110px;
        }
        overflow: hidden;
        text-align:center;
        display: flex;
        align-items:center;
        justify-content:center;
        img{
            max-width:205px;
            width: 80%;
            object-fit:cover;
            &.defaultImage{
            width: 100%;
            background-size:contain;
            margin:3px 0;
            max-width:initial;
            max-height:205px;
            object-fit:cover;
            }
        }
        position:relative;
        .prevImg,.nextImg{
            position: absolute;
            top:50% ;
            transform:translateY(-50%) ; 
            color:${(props) =>  props.theme.palette.ColorApp.primary};
            font-size: 2rem;
            z-index: 2;
            cursor: pointer; ;
            background-color:transparent;
            border-color: transparent; 
            &.disabled{
                visibility: hidden;
            }
        }
        .remove{
            position:absolute;
            right: 0;
            top: 0;
            background-color: red;
            width: 20px;
            height: 20px;
            border: 1px solid ${(props) =>  props.theme.palette.font};
            border-radius: 50%;
            cursor: pointer;
            color:${(props) =>  props.theme.palette.font};
        }
        .prevImg{
            left:0px;
        }
        .nextImg{
            right:0px;
        }
        &.cart{
            .prevImg{
                left:-2px;
                z-index: 2;
            font-size:1.5rem;
        }
        .nextImg{
                font-size:1.5rem;
                right:-2px;
                z-index: 2;
            }
        }
        .dots{
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            gap:2px;
            bottom: 10px;
            left: 50%;
            transform:translateX(-50%) ;  
            .imgDot{
                width: 8px;
                height: 8px;
                background-color: ${(props) =>  props.theme.palette.ColorApp.gray_300};
                border:1px solid ${(props) =>  props.theme.palette.ColorApp.primary};
                border-radius: 50%; 
                cursor: pointer;
                &.active{
                    background-color: ${(props) =>  props.theme.palette.ColorApp.primary};
                }
            }
        }
       &.cart{ 
        .dots{ 
            .imgDot{
                width: 7px;
                height: 7px; 
            }
        }}
`