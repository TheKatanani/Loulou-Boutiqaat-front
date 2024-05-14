import styled from "styled-components";
export const SendFormStyle = styled.form`
    position:relative;
    width:490px;
    padding:22px 20px;
    background-color:${(props) => props.theme.palette.main};
    border-radius: 6px;
    h6{
        color:${(props) =>  props.theme.palette.font};
        font-size:${(props) => props.theme.fontSizes.h6}rem;
    }
    #details{
        resize:vertical;
        height:73px;
        max-width:490px;
    }
    input,textarea{
        font-size:${(props) => props.theme.fontSizes.body}rem;
    }
    .box{
        display: flex;
        align-items:center;
        margin-bottom: 20px;
        gap:8px;
        select{
            color: ${(props)=>props.theme.palette.ColorApp.gray_400};
            font-size:${(props) => props.theme.fontSizes.body}rem;
            border-radius: 6px;
            border: 1px solid ${(props) => props.theme.palette.ColorApp.gray_300};
            height:fit-content;
            padding:9px;
            background-color:transparent;
        }
    }
`
