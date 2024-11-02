import React from 'react'
import { StyledSvg } from './style'

const LogoLoading = ({ loader = true, full }) => {
  return (
    <StyledSvg {...{ loader }}>
      <svg viewBox='0 0 800 290'>
        {
          full &&
          <text
            x="50%"
            y="50%"
            dy=".32rem"
            textAnchor='middle'
            className='text-body'
          >
            Loulou Boutiqaat
          </text>
        }
        <text
          x="50%"
          y="50%"
          dy="10rem"
          textAnchor='middle'
          className='infinity'
        >
          ∞
        </text>
      </svg>
    </StyledSvg>
  )
}

export default LogoLoading