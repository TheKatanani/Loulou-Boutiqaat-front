import React from 'react'
import { StyledPortal } from './styled'

const PortalCard = ({ children , onClick}) => {
  return (
    <StyledPortal onClick={onClick}>
      {children}
    </StyledPortal>
  )
}

export default PortalCard