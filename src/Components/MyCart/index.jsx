import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PrimaryButton, WhitePrimaryButton } from '../../Global/components'
import { Arrow } from '../../Icons'
import MyCartItem from '../MyCartItem'
import { MyCartStyled } from './styled'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, selectCart, selectQuantity } from '../../redux/reducers/cart'
import { selectPublishedProducts } from '../../redux/reducers/products'
import { selectUser } from '../../redux/reducers/auth'
import useAxiosPrivate from '../../Hook/useAxiosPrivet'

const MyCart = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const quantity = useSelector(selectQuantity)
  const cart = useSelector(selectCart)
  const products = useSelector(selectPublishedProducts)
  const { id: userId } = useSelector(selectUser)
  const axiosPrivate = useAxiosPrivate()
  const dataCart = cart?.map(cartItem => {
    const foundedItem = products?.find(product => +product?.id === +cartItem?.productId)
    if (foundedItem) {
      return <MyCartItem key={foundedItem?.id} data={foundedItem} itemQuantity={cartItem.quantity} />
    }
    return undefined
  })
  return (
    <MyCartStyled>
      <h6>سلتي ({quantity})</h6>
      <div className="container">
        <div className="items">
          {
            quantity ?
              dataCart :
              <p className='empty'>سلتك فارغة</p>
          }
        </div>
        <div className="myButtons">
          <PrimaryButton onClick={() => navigate("/home")}><Arrow />عد للمتجر</PrimaryButton>
          <WhitePrimaryButton onClick={() => dispatch(clearCart({ userId, axiosPrivate }))}>افرغ السلة</WhitePrimaryButton>
        </div>
      </div>
    </MyCartStyled>
  )
}

export default MyCart