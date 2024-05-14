import styled from "styled-components";

export const FilterStyled =styled.div`
padding:11px;
    display: flex;
    flex-wrap: wrap;
    justify-content:space-between;
    align-items:center;
    background-color:${(props) =>  props.theme.palette.main};
    border: 2px solid ${(props) =>  props.theme.palette.ColorApp.gray_200};
    color: ${(props) =>  props.theme.palette.font};
    font-size:${(props) => props.theme.fontSizes.body}rem;
    border-radius: 6px;
    .searchBox{
        order:-1;
        .results{
            display: none;
        }    
    }
    .mood{
        gap:8px;
        width:76px;
        display: flex;
        align-items:center;
        padding:0;
        >div{
            width:38px;
            height:100%;
            padding:5px;
            display: flex;
            justify-content:center;
            align-items:center;
            cursor: pointer;
            &.active{
                background-color:${(props) =>  props.theme.palette.ColorApp.gray_200};
            }
        }
    }
`