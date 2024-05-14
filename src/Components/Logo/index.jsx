import React from 'react'
import styled from 'styled-components'
import logo from '../../Images/logo.png'
const LogoStyled = styled.div`
  /* h1 {
    font-size:1.3rem;
    color:#8f46c5;  
  }   */
  img{
    transform: translateY(10px);
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
      {/* <h1>
           LOULOU BOUTIQAAT 
         </h1>  */}
      <img src={logo} alt="" />
    </LogoStyled>
  )
}

export default Logo