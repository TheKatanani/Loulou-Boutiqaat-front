import styled from "styled-components";

export const ItemsStyle = styled.div `
    margin:30px 0;
    padding:10px 0;
    border-top: 2px solid ${(props) =>  props.theme.palette.ColorApp.gray_300};;
   
    li{
        color:${(props) =>  props.theme.palette.ColorApp.gray_800};
        margin:10px 0;
        display: flex;
        align-items:baseline;
        cursor: pointer;
    }
    label{
        color:${(props) =>  props.theme.palette.font};
        margin-left: 15px;
    }
    input{
        transform:translateY(3.5px);
        border: 2px solid ${(props) =>  props.theme.palette.ColorApp.gray_800};;
        border-radius: 5px;
        width: 20px;
        height: 20px;
    }
    button{
        background-color:transparent;
        border:none;
        color:${(props) =>  props.theme.palette.ColorApp.primary};
        font-size:${(props) => props.theme.fontSizes.body}rem;
        cursor: pointer;
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