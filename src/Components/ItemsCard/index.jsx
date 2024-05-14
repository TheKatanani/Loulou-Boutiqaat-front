import React from 'react'
import { cartData } from '../../Mock'
import ItemCard from '../AsideItem'
import { ItemsCardStyled } from './styled'

const ItemsCard = ({ type,title,button }) => {
  const myData= cartData.slice(0,type==="RelatedProducts"?6:4);
  return (
    <ItemsCardStyled type={type}>
      <h6>{title}</h6>
      <div className="items">
        {myData.map((el, i) => (
          <ItemCard button={button} type={type} key={i} title={el.title} price={el.price} img={el.img} />
        ))}
      </div>
    </ItemsCardStyled>
  )
}

export default ItemsCard