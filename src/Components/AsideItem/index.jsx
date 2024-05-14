import React from 'react'
import { WhitePrimaryButton } from '../../Global/components'
import { Sopping } from '../../Icons'
import { ItemCardStayled } from './styled'

const ItemCard = ({ img, title, price, type, button }) => {
    return (
        <ItemCardStayled type={type}>
            <div className="imgarea">
                <img src={img} alt="" />
            </div>
            <div className="text">
                <p className='title'>{title}</p>
                <p className='price'>{price}</p>
            </div>
            {button && <WhitePrimaryButton> <Sopping /> Move to cart</WhitePrimaryButton>}
        </ItemCardStayled>
    )
}

export default ItemCard;