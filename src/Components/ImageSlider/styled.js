import styled from "styled-components";

export const ImageSliderStyled = styled.div`
    .imageArea{
        overflow: hidden;
        margin:0 auto 10px;
        display: flex;
        align-items:center;
        justify-content:center;
        background-color:${(props) => props.theme.palette.main};
        border: 1px solid ${(props) => props.theme.palette.ColorApp.gray_300};
        border-radius: 6px;
        width:280px;
        height:280px;
        @media (max-width: 576px) {
            width:100%;
        }
        img{
            width:315px;
            ${({theme:{media}})=>media.xs}{
                width:215px;
                
            }
        }
    }
    .images{
        display: flex;
        align-items:center;
        justify-content:space-evenly;
        gap:4.5px;
        img{
            background-color:${(props) => props.theme.palette.main};
            border: 1px solid ${(props) => props.theme.palette.ColorApp.gray_300};
            border-radius: 6px;
            width:56px;
            height:56px;
            cursor: pointer;
        }
            img:nth-child(${props=> (props.selected + 1)}){
            border-color:${(props) => props.theme.palette.ColorApp.gray_800};
        }
    }
`