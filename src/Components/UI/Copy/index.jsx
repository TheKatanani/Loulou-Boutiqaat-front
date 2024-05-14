import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
const StyledCopy = styled.p`
        text-align: center;
        padding: 20px 0; 
        border-top:1px solid ${(props) => props.theme.palette.ColorApp.primary};
        background-color: ${(props) => props.theme.palette.ColorApp.primary_light};
        color:${(props) => props.theme.palette.ColorApp.dark}; 
        a{
            color:${(props) => props.theme.palette.ColorApp.primary};
            font-weight:bold;
            font-size:1.2rem;
            text-shadow: 1px 1px 1px ${(props) => props.theme.palette.ColorApp.dark};
        }
`
const Copy = () => {
  return (
    <StyledCopy>made by <Link to={"https://thekatanani.netlify.app"}>theKatanani</Link> &copy; 2024</StyledCopy>
  )
}

export default Copy