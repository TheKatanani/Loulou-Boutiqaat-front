import { WhitePrimaryButton } from '../../Global/components'
import { MyCartItemStyled } from './styled'
import { Link } from 'react-router-dom';
import { quantityCartItem, removeFromCart } from '../../redux/reducers/cart';
import { useDispatch, useSelector } from 'react-redux';
import { addToSaved, removeFromSaved, selectsaved } from '../../redux/reducers/saved';
import ImagesSliderCard from '../common/ImagesSliderCard';
import { OPERATOR } from '../../Actions';
import useAxiosPrivate from '../../Hook/useAxiosPrivet';

const MyCartItem = ({ itemQuantity, data: { images, name, price = 0, description, id } }) => {
  const dispatch = useDispatch()
  const saved = useSelector(selectsaved)
  const axiosPrivate = useAxiosPrivate()
  const foundedCart = saved?.find(el => el == id)
  const isInSaved = !!foundedCart;
  return (
    <MyCartItemStyled {...{ isInSaved }}>
      <div className='content'>
        <div className="imgarea">
          <ImagesSliderCard className="cart" images={images} />
        </div>
        <div className="text">
          <p className='title'>{name}</p>
          <p className='details'>{description.slice(0, 120)}...<Link to={`/home/products/${id}`}>المزيد</Link></p>
          <div className="buttons">
            <WhitePrimaryButton onClick={() => dispatch(removeFromCart({ productId: id, axiosPrivate }))}>حذف</WhitePrimaryButton>
            <WhitePrimaryButton className='saveForLater' onClick={() => {
              if (!isInSaved) {
                dispatch(addToSaved({
                  productId: id,
                  axiosPrivate
                }))
              } else {
                dispatch(removeFromSaved({
                  productId: id,
                  axiosPrivate
                }))
              }
            }}>اضافة للمفضلة</WhitePrimaryButton>
          </div>
        </div>
      </div>
      <div className="quntity">
        <p className='price'>{price}*{itemQuantity}={price * itemQuantity}₪</p>
        <div className="itemQuantity">
          <button className="increase" onClick={() => {
            dispatch(quantityCartItem({ productId: id, operator: OPERATOR.INCREASE, axiosPrivate }))
          }}>+</button>
          <p className="quantity">{itemQuantity}</p>
          <button className="decrease"
            onClick={() => {
              dispatch(quantityCartItem({ productId: id, operator: OPERATOR.DECREASE, axiosPrivate }))
            }}
          >-</button>
        </div>
      </div>
    </MyCartItemStyled>
  )
}

export default MyCartItem