import React from 'react'
import styled from 'styled-components'

const StyledCopy = styled.p`
  text-align: center;
  padding: 20px 0; 
  border-top: 1px solid ${(props) => props.theme.palette.border};
  background-color: ${(props) => props.theme.palette.card};
  color: ${(props) => props.theme.palette.font_secondary}; 
  font-size: 0.95rem;

  a {
    color: ${(props) => props.theme.palette.ColorApp.primary} !important;
    font-weight: 700;
    font-size: 1.05rem; 
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: #d4af37 !important;
      text-decoration: underline;
    }
  }
`

const Copy = () => {
  return (
    <StyledCopy>
      Made with 💜 by{' '}
      <a href="https://thekatanani.com" target="_blank" rel="noopener noreferrer">
        theKatanani
      </a>{' '}
      &copy; {new Date().getFullYear()}
    </StyledCopy>
  )
}

export default Copy