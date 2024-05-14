import styled from 'styled-components'
export const AvaterStyled = styled.img`
    border-radius: 50%;
    width:92px;
    height:92px;
    object-fit:contain;
    border: 1px solid ${props=>props.theme.palette.ColorApp.gray_500};

`