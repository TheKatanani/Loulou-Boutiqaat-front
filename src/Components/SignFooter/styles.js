import styled from "styled-components";

export const Footer=styled.footer`
    width: 100%;
    padding:24px 120px;
    display: flex;
    gap:30px;
    flex-wrap: wrap;
    text-align:center;
    align-items:center;
    justify-content:space-between;
    @media  screen and (max-width: 900px) {
    padding:10px 60px;
    justify-content:center;
}
    @media  screen and (max-width: 600px) {
    padding:10px;
}
    background-color:${(props)=>props.theme.palette.main};
    a{
        color:${(props)=>props.theme.palette.ColorApp.gray_800}
    }
    ul{
        display: flex;
        align-items:center;
        gap:30px;
        list-style: none;
    }
`