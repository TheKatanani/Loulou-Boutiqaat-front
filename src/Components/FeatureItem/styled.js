import styled from "styled-components";

export const FeatureItemStyled = styled.div`
    display: flex;
    gap:5px;
    align-items:center;
    .iconArea{
        display: flex;
        justify-content:center;
        align-items:center;
        width: 48px;
        height: 48px;
        background-color:${props=> props.theme.palette.ColorApp.gray_300};
        border-radius: 50%;
    }
    p{
        &.title{
            color:${props=>props.theme.palette.font}
        }
        &.description{
            color:${props=> props.theme.palette.ColorApp.gray_400};
        }
    }
    
`