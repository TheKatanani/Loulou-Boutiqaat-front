import React from 'react'
import { MainButton } from '../../Global/components'
import Payments from '../Payments'
import { SummaryStyled } from './styled'
import { useSelector } from 'react-redux'
import { selectCart } from '../../redux/reducers/cart'
import { selectProducts } from '../../redux/reducers/products'

const Summary = ({ setShow }) => {
    const cartItems = useSelector(selectCart)
    const products = useSelector(selectProducts)
    const total = cartItems?.reduce((total, cartItem) => {
        const foundedItem = products?.find(product => product.id == cartItem.productId)
        if (foundedItem) {
            return total + foundedItem?.price * cartItem?.quantity
        }
        else return total
    }, 0)
    return (
        <SummaryStyled> 
            <div className="total">
                <p>المجموع:</p>
                <p>{total}₪</p>
            </div>
            <MainButton onClick={() => { setShow(true) }}>أرسل الطلب</MainButton>
            <Payments />
        </SummaryStyled>
    )
}

export default Summary