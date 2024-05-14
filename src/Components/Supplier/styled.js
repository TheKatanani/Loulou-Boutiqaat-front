import styled from "styled-components";

export const SupplierStyled = styled.div `
        width:280px;
        @media (max-width: 576px) {
            flex: 1;
        }
        height:fit-content;
        padding:16px;
        border: 1px solid ${(props) =>  props.theme.palette.ColorApp.gray_200};
        border-radius: 6px;
        .header{
            border-bottom: 1px solid ${(props) =>  props.theme.palette.ColorApp.gray_200};
            display: flex;
            align-items:center ;
            gap:5px;
            .img{
                width:40px;
                height:40px;
                background: #C6F3F1;
                border-radius: 4px;
                display: flex;
                justify-content:center ;
                align-items:center ;
                span{
                    font-weight: 600;
                    font-size: 28px;
                    color: rgba(76, 167, 167, 0.6);
                }
            }
            .text{
                color:${(props) =>  props.theme.palette.font};
                font-size:${(props) => props.theme.fontSizes.body}rem;
                padding:10px;
            }
        }
        p{
            color:${props=>props.theme.palette.ColorApp.gray_500};
            margin:10px 0 ;
            span{
                min-width:45px;
                margin: 0 8px 0 0;
                svg{
                    margin:0 0 0 8px;
                }
            }
        }
        button:nth-of-type(1){
            margin-bottom: 7px;
            background-color:${props=>props.theme.palette.ColorApp.primary};
            color:${props=>props.theme.palette.ColorApp.white};
        }
        button:nth-of-type(2){
            border: 1px solid ${(props) => props.theme.palette.ColorApp.gray_300};
            background-color:${props=>props.theme.palette.ColorApp.white};
            color:${props=>props.theme.palette.ColorApp.primary};
        }
`