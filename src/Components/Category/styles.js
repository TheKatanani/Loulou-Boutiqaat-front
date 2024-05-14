import styled from "styled-components";

export const CatigoryStyled = styled.div `
        display: flex;
        width: 100%;
        gap:20px;
        justify-content:space-between;
        align-items:center;
        padding:8px 0;
        ul{
            display: flex;
            gap:20px;
            justify-content:center;
            align-items:center;
            a{
                color:${props=>props.theme.palette.font};
            }
        }  
        .active{
            position: relative;
            ::before{
                content: '';
                position: absolute;
                width: 100%;
                height: 3px;
                bottom: -6px;
                left: 0; 
                border-radius: 4px;
                background-color:${props=>props.theme.palette.ColorApp.primary};
            }
            ::after{
                content: '';
                position: absolute;
                width: 8px;
                height: 8px;
                bottom: -10px;
                left: 50%;
                border:3px solid ${props=>props.theme.palette.main};
                transform: translateX(-50%);
                border-radius: 50%;
                background-color:${props=>props.theme.palette.ColorApp.primary};
            }
        }
        ${({theme:{media}})=>media.xs}{
            overflow-x:scroll;
            /* svg,li:nth-last-child(1),li:nth-last-child(2){
                display: none;
            } */
            li{
                width:109px;
                padding:9px;
                border-radius:6px;
                text-align:center;
                background-color:${props=>props.theme.palette.ColorApp.gray_200};
                a{
                    color:${props=>props.theme.palette.ColorApp.primary};
                }
            }
    }
    ${({theme:{media}})=>media.s}{
        flex-wrap:wrap;
        justify-content:space-around;
    }
    `