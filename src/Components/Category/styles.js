import styled from "styled-components";

export const CategoryStyled = styled.div `
        display: flex;
        /* width: 100%; */
        flex:1;
        gap:20px;
        justify-content:space-between;
        align-items:center;
        padding: 6px 0;
        ul{
            display: flex;
            gap: 10px;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            a{
                display: inline-block;
                padding: 6px 16px;
                border-radius: 20px;
                font-weight: 600;
                font-size: 0.92rem;
                color: ${props=>props.theme.palette.ColorApp.gray_600};
                transition: all 0.2s ease;
                &:hover {
                    color: ${props=>props.theme.palette.ColorApp.primary};
                    background: ${props=>props.theme.palette.ColorApp.primary_soft};
                }
                &.active {
                    color: #ffffff;
                    background: ${props=>props.theme.palette.ColorApp.primary};
                    box-shadow: 0 2px 8px rgba(109, 40, 217, 0.25);
                }
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