import styled from "styled-components";

export const CardStyle =styled.div`
            background-color:${(props) => props.theme.palette.main};
            border-radius: 6px;
            width:280px;
            .bg{
                height:120px;
                background-image: url(${props=>props.src});
                background-size: cover;
                position:relative;
                border-top-left-radius:6px;
                border-top-right-radius:6px;
                ::before{
                    content:"";
                    border-top-left-radius:6px;
                    border-top-right-radius:6px;
                    background: #000;;
                    position:absolute;
                    top:0;
                    left:0;
                    width:100%;
                    height:100%;
                    opacity:0.6;
                }
            }
            .content{
                padding:20px;
                color:${(props) =>  props.theme.palette.font};
                font-size:${(props) => props.theme.fontSizes.body}rem;
                position:relative;
                p{
                    max-width:175px;
                }
                .icon{
                    background-color: #D1E7FF;
                    border-radius: 50%;
                    width:55px;
                    height:55px;
                    position:absolute;
                    top:-30%;
                    right:21px;
                    border: 1px solid ${(props) => props.theme.palette.main};
                    display: flex;
                    align-items:center;
                    justify-content:center;
                }
            }
`