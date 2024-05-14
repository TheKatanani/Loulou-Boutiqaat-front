import styled from "styled-components";
export const ItemsStyle = styled.div`
    margin:30px 0;
    padding:10px 0;
    border-top: 2px solid ${(props) =>  props.theme.palette.ColorApp.gray_300};
    >div{
        display: flex;
        gap:6px;
        label{
            color:${(props) =>  props.theme.palette.font}
        }
        input{
            background-color:${(props) =>  props.theme.palette.main};
        }
    }
    button{
        color:${(props) =>  props.theme.palette.ColorApp.primary};
        background-color:${(props) =>  props.theme.palette.main};
    }
    .title{
        display: flex;
        justify-content:space-between;
        align-items:center;
        h6{
        color:${(props) =>  props.theme.palette.font};
        font-size:${(props) => props.theme.fontSizes.body}rem;
        }
        .icon{
            cursor: pointer;
            transform:rotate(90deg) scaleY(-1.5);
            transition:0.3s;
            color:${(props) =>  props.theme.palette.font};
            font-size:${(props) => props.theme.fontSizes.body}rem;
        }
    }
    `
