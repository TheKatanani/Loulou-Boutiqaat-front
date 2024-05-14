import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
const BoxStyled=styled.div`
    li{
        color:${(props) => props.theme.palette.ColorApp.gray_500};
        font-size:${(props) => props.theme.fontSizes.body}rem;
        margin:3px 0 0;
        a{
            width: 100%;
        }
    }
    h4{
        font-size:${(props) => props.theme.fontSizes.body}rem;
        margin-bottom: 10px;
    }
`
const FooterList = ({ title, data }) => {
    return (
        <BoxStyled> 
            <h4>{title}</h4>
            <ul>{
                data.map((el, i) => (
                    <li key={i}><Link to={el?.link}>{el?.text}</Link></li>
                ))
            }
            </ul>
        </BoxStyled>
    )
}

export default FooterList