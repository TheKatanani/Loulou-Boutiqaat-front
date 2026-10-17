import styled from "styled-components";

export const ProductCardStyeld = styled.div `
    position: relative;
    padding: 20px;
    background-color: ${(props) => props.theme.palette.main};
    direction: rtl;
    width: 100%;
    border: 1px solid ${(props) => props.theme.palette.ColorApp.gray_300};
    border-radius: 14px;
    color: ${(props) => props.theme.palette.font};
    font-size: ${(props) => props.theme.fontSizes.body}rem;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 14px 30px rgba(132, 58, 188, 0.12);
        border-color: ${(props) => props.theme.palette.ColorApp.primary_light};
    }

    .discountBadge {
        position: absolute;
        top: 14px;
        right: 14px;
        background: linear-gradient(135deg, #e53e3e, #dd6b20);
        color: #ffffff;
        font-size: 0.78rem;
        font-weight: 700;
        padding: 4px 10px;
        border-radius: 20px;
        z-index: 5;
        box-shadow: 0 2px 8px rgba(229, 62, 62, 0.35);
        letter-spacing: 0.3px;
    }

    .content{
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
            gap:6px;
            .Select svg{
                ${props=>props.isSelected&&`background-color:${props.theme.palette.ColorApp.primary_light}`};
            }
            .Like svg{
                ${props=>props.isLike&&`background-color:${props.theme.palette.ColorApp.primary_light}`};
            }
            svg{
                padding:6px;
                width:34px;
                height:34px;
                border: 1px solid ${(props) =>  props.theme.palette.ColorApp.gray_300};
                border-radius: 8px;
                transition: all 0.2s ease;
                &:hover {
                    transform: scale(1.08);
                    border-color: ${(props) => props.theme.palette.ColorApp.primary};
                }
            }
        }
        .title{
            font-size: 1.1rem;
            font-weight: 700;
            margin: 6px 0;
            line-height: 1.4;
            ${props=>!props.full&&`color:${(props) =>  props.theme.palette.ColorApp.gray_800}`};
        }
        .price{
            font-size: 1.35rem;
            font-weight: 800;
            color: ${(props) => props.theme.palette.ColorApp.primary};
            .prevCost{
                color:${(props) =>  props.theme.palette.ColorApp.gray_500};
                font-size: 0.95rem;
                font-weight: normal;
                text-decoration: line-through;
                opacity:0.8;
                padding: 0 8px;
            }
        } 
        .description{
            color:${(props) =>  props.theme.palette.ColorApp.gray_600};
            line-height: 1.5;
            font-size: 0.92rem;
        }
        .ViewDetails{
            display: inline-block;
            text-align: center;
            color: ${(props) =>  props.theme.palette.ColorApp.primary};
            font-weight: 600;
            font-size: 0.92rem;
            margin: 18px 0 0;
            padding: 8px 16px;
            border-radius: 8px;
            border: 1px solid ${(props) => props.theme.palette.ColorApp.primary_light};
            background-color: ${(props) => props.theme.palette.ColorApp.gray_100};
            transition: all 0.25s ease;
            &:hover {
                background-color: ${(props) => props.theme.palette.ColorApp.primary};
                color: #ffffff;
            }
        }
    } 
    span{
        direction:ltr;
    }
        ${props=>props.full&&
            `display: flex;
            align-items:center;
            justify-content:center;
            gap:20px;
            margin:10px 0 0;
            .imagesSlider{
                max-width:30%;
            }
            .content{
                flex: 1;
                .title{
                    margin-bottom:16px;
                    color:${(props) =>  props.theme.palette.font};
                    order:-1;
                }
            }
            @media (max-width: 576px) {
                flex-direction: column;
                .imagesSlider {
                max-width: initial; 
                }           
                .img{
                    max-width:70px;
                    height: unset;
                    img{
                        width:80%;
                    }
                } 
                .price + div{
                    flex-wrap: wrap;
                }
            }
            `
        };
`