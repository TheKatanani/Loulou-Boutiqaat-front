import React from 'react'
import styled from 'styled-components'
const PathStyled = styled.div`
    margin:20px 0;
    color:${(props) => props.theme.palette.ColorApp.gray_500};
    font-size:${(props) => props.theme.fontSizes.body}rem;
    span:not(:last-child)::after{
        content:">";
        margin:0 7px;
    }
`
const Path = ({ path }) => {
    return (
        <PathStyled>
            {path.map((el, i) => (
                <span key={i}>{el}</span>
            ))}
        </PathStyled>
    )
}

export default Path