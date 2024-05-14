import styled from "styled-components";

export const CheckStyled = styled.div `
    display: flex;
    align-items: center;
    margin:10px 0;
    input{
    width: 18px;
    height: 18px;
    background: #1565D8;
    border-radius: 4px;
    cursor: pointer;
    transform:translateY(-3px);
}
    label{
    /* width: 220px; */
    height: 19px;
    font-weight: 500;
    font-size: ${(props) => props.theme.fontSizes.body}rem;
    line-height: 10px;
    margin-left: 7px;
    color: ${(props)=>props.theme.palette.font};
}
.primary{
    color:${props=> props.theme.palette.ColorApp.primary};
}

`