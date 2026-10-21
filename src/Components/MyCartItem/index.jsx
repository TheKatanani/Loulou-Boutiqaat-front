import React from 'react'
import { WhitePrimaryButton } from '../../Global/components'
import { MyCartItemStyled } from './styled'
import { Link } from 'react-router-dom';
import { quantityCartItem, quantityCartItemLocal, removeFromCart, removeFromCartLocal } from '../../redux/reducers/cart';
import { useDispatch, useSelector } from 'react-redux';
import { addToSaved, addTosavedLocal, removeFromSaved, removeFromsavedLocal, selectsaved } from '../../redux/reducers/saved';
import { SelectIsAuthenticated } from '../../redux/reducers/auth';
import ImagesSliderCard from '../common/ImagesSliderCard';
import { OPERATOR } from '../../Actions';
import useAxiosPrivate from '../../Hook/useAxiosPrivet';

const MyCartItem = ({ itemQuantity, data: { images, name, price = 0, description, id } }) => {
  const dispatch = useDispatch()
  const saved = useSelector(selectsaved)
  const isAuthenticated = useSelector(SelectIsAuthenticated)
  const axiosPrivate = useAxiosPrivate()
  const foundedCart = saved?.find(el => String(el) === String(id))
  const isInSaved = !!foundedCart;

  const handleRemove = () => {
    if (isAuthenticated) {
      dispatch(removeFromCart({ productId: id, axiosPrivate }))
    } else {
      dispatch(removeFromCartLocal({ productId: id }))
    }
  }

  const handleQuantity = (operator) => {
    if (isAuthenticated) {
      dispatch(quantityCartItem({ productId: id, operator, axiosPrivate }))
    } else {
      dispatch(quantityCartItemLocal({ productId: id, operator }))
    }
  }

  const handleToggleSaved = () => {
    if (isAuthenticated) {
      if (!isInSaved) {
        dispatch(addToSaved({ productId: id, axiosPrivate }))
      } else {
        dispatch(removeFromSaved({ productId: id, axiosPrivate }))
      }
    } else {
      if (!isInSaved) {
        dispatch(addTosavedLocal({ productId: id }))
      } else {
        dispatch(removeFromsavedLocal({ productId: id }))
      }
    }
  }

  return (
    <MyCartItemStyled {...{ isInSaved }}>
      <div className='content'>
        <div className="imgarea">
          <ImagesSliderCard className="cart" images={images} />
        </div>
        <div className="text">
          <p className='title'>{name}</p>
          <p className='details'>{description?.slice(0, 120)}...<Link to={`/home/products/${id}`}>المزيد</Link></p>
          <div className="buttons">
            <WhitePrimaryButton onClick={handleRemove}>حذف</WhitePrimaryButton>
            <WhitePrimaryButton className='saveForLater' onClick={handleToggleSaved}>
              {isInSaved ? 'إزالة من المفضلة' : 'اضافة للمفضلة'}
            </WhitePrimaryButton>
          </div>
        </div>
      </div>
      <div className="quntity">
        <p className='price'>{price}*{itemQuantity}={price * itemQuantity}₪</p>
        <div className="itemQuantity">
          <button className="increase" onClick={() => handleQuantity(OPERATOR.INCREASE)}>+</button>
          <p className="quantity">{itemQuantity}</p>
          <button className="decrease" onClick={() => handleQuantity(OPERATOR.DECREASE)}>-</button>
        </div>
      </div>
    </MyCartItemStyled>
  )
}

export default MyCartItem
