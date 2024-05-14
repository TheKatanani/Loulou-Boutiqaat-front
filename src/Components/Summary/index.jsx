import React from 'react'
import { MainButton } from '../../Global/components'
import Payments from '../Payments'
import { SummaryStyled } from './styled'
import { useSelector } from 'react-redux'
import { selectCart } from '../../redux/reducers/cart'
import { selectProducts } from '../../redux/reducers/products'

const Summary = () => {
    const cartItems = useSelector(selectCart)
  const products = useSelector(selectProducts)
    const total = cartItems?.reduce((total,cartItem )=> {
        const foundedItem = products?.find(product => product.id === cartItem.productId)
        if(foundedItem){
            return total + foundedItem?.price * cartItem?.quantity 
        }
        else return total
      },0)
  return (
    <SummaryStyled>
        {/* <div className="info">
            <ul>
                <li>
                    <p>Subtotal:</p>
                    <p>$1403.97</p>
                </li>
                <li>
                    <p>Discount:</p>
                    <p>- $60.00</p>
                </li>
                <li>
                    <p>Tax:</p>
                    <p>+ $14.00</p>
                </li>
            </ul>
        </div> */}
            <div className="total">
                <p>Total:</p>
                <p>{total}₪</p>
            </div>
            <MainButton>Checkout</MainButton>
            <Payments/>
    </SummaryStyled>
  )
}

export default Summary