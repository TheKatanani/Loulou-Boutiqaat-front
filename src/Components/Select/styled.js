import styled from "styled-components";

export const SelsctStyled =styled.select`
    ${props=> `
        color: ${props.theme.palette.font};
        font-size:${props.theme.fontSizes.body}rem;
        border-radius: 6px;
        border: 1px solid ${props.theme.palette.ColorApp.gray_300};
        height:fit-content;
        padding:9px 5px;
        background-color:transparent;
        outline:none;
        cursor:pointer;
        option{
            color: ${props.theme.palette.font};
        }
    `}
`