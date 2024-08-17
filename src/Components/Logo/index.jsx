import React from 'react'
import styled from 'styled-components'
import logo from '../../Images/logo.png'
const LogoStyled = styled.div` 
  img{
    transform: translateY(10px);
    filter: drop-shadow(-1px 2px 0px ${props=>props.theme.palette.ColorApp.gray_300});
    ${({ theme }) => theme.media.xs}{ 
      width: 70px;
    }
    ${({ theme }) => theme.media.s}{ 
          width: 90px;
        }
        ${({ theme }) => theme.media.m}{ 
          width: 120px;
        }
  }
`
const Logo = () => {
  return (
    <LogoStyled> 
      <img src={logo} loading="lazy" alt="logo" />
    </LogoStyled>
  )
}

export default Logo