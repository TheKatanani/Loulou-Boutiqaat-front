import styled from "styled-components";

export const OrStyled=styled.div`
    position: relative;
    margin: 15px auto;
    text-align: center;
    font-size:${(props) => props.theme.fontSizes.body}rem;
    color:${(props)=>props.theme.palette.ColorApp.gray_400};
    font-weight: 400;
    ::before{
    content: "";
    width: 142px;
    height: 1px;
    background-color: ${(props)=>props.theme.palette.ColorApp.gray_400};
    position: absolute;
    top: 50%;
    right: 0px;
    transform: translateY(-50%);
}
    ::after{
    content: "";
    width: 142px;
    height: 1px;
    background-color: ${(props)=>props.theme.palette.ColorApp.gray_400};
    position: absolute;
    top: 50%;
    left: 0px;
    transform: translateY(-50%);
}

`