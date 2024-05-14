import React from 'react'
import { MainButton } from '../../Global/components'
import { DiscountSlideStyled } from './styled'

const DiscountSlide = () => {
  return (
    <DiscountSlideStyled>
        <div>
            <h6>Super discount on more than 100 USD</h6>
            <p>Have you ever finally just write dummy info</p>
        </div>
        <MainButton>Shop now</MainButton>
    </DiscountSlideStyled>
  )
}

export default DiscountSlide;