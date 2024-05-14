import React from 'react'
import { cartData } from '../../Mock'
import ItemCard from '../AsideItem'
import { AsideItemsStayled } from './styled'

const AsideItems = () => {
    return (
        <AsideItemsStayled>
            <h6>You may like</h6>
            <div className="items">
                {cartData.slice(0,5).map((el, i) => (
                    <ItemCard type="aside" key={i} title={el.title} price={el.price} img={el.img} />
                ))}
            </div>
        </AsideItemsStayled>
    )
}

export default AsideItems