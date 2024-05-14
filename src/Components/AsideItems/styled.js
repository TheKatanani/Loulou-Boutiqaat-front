import styled from "styled-components";

export const AsideItemsStayled = styled.div`
    background-color:${(props) =>  props.theme.palette.main};
    flex: 0.33;
    min-width: 250px;
    ${({theme:{media}})=>media.xs}{
        flex: 1;
    }
    margin:30px 0;
    padding:16px 16px 36px;
    height:fit-content;
    border: 1px solid ${(props) =>  props.theme.palette.ColorApp.gray_300};;
    border-radius: 6px;
    h6{
        font-size:${(props) => props.theme.fontSizes.body}rem;
        color:${(props) =>  props.theme.palette.font};
    }

`