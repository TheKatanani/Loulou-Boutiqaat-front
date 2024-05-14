import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PrimaryButton, WhitePrimaryButton } from '../../Global/components'
import { Arrow } from '../../Icons'
import MyCartItem from '../MyCartItem'
import { MyCartStyled } from './styled'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, selectCart, selectQuantity } from '../../redux/reducers/cart'
import { selectProducts } from '../../redux/reducers/products'
import { selectUser } from '../../redux/reducers/auth'

const MyCart = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const quantity = useSelector(selectQuantity)
  const cartItems = useSelector(selectCart)
  const products = useSelector(selectProducts)
  const { id: userId } = useSelector(selectUser) 
  const dataCart = cartItems?.map(cartItem => {
    const foundedItem = products?.find(product => product?.id === cartItem?.productId)
    if(foundedItem){
      return <MyCartItem key={foundedItem?.id} data={foundedItem} itemQuantity={cartItem.quantity}/>
    }
    return ''
  })
  return (
    <MyCartStyled>
      <h6>My cart ({quantity})</h6>
      <div className="container">
        <div className="items">
          {
          quantity ?
            dataCart :
            <p className='empty'>your cart is empty</p>
          }
        </div>
        <div className="myButtons">
          <PrimaryButton onClick={() => navigate("/home")}><Arrow /> Back to shop</PrimaryButton>
          <WhitePrimaryButton onClick={() => dispatch(clearCart({userId}))}>Remove all</WhitePrimaryButton>
        </div>
      </div>
    </MyCartStyled>
  )
}

export default MyCart