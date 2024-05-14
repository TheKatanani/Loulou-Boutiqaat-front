import styled from "styled-components";

export const Label = styled.label `
    display: block;
    font-weight: 500;
    font-size: 16px;
    color: ${(props)=>props.theme.palette.font};
    margin-top: 10px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: ${(props) => props.theme.fontSizes.body}rem;
    letter-spacing: -0.2px; 
`
export const Input = styled.input `
    width: 100%;
    height: 40px;
    border: 1px solid ${(props)=>props.theme.palette.ColorApp.gray_300};
    border-radius: 6px;
    font-weight: 500;
    font-size: ${(props) => props.theme.fontSizes.body2}rem;
    line-height: 17px;
    /* identical to box height */
    color: ${(props)=>props.theme.palette.ColorApp.gray_500};
    background-color:transparent;
    padding: 10px; 
    margin: 3px 0 10px;
    outline: none;
`