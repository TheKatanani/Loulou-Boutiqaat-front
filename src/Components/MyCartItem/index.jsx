import { WhitePrimaryButton } from '../../Global/components'
import { MyCartItemStyled } from './styled'
import { Link } from 'react-router-dom';
import { decrease, increase, removeFromCart, selectCart } from '../../redux/reducers/cart';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/reducers/auth';
import { addToSaved, removeFromSaved, selectsaved } from '../../redux/reducers/saved';
import ImagesSliderCard from '../common/ImagesSliderCard';

const MyCartItem = ({ itemQuantity, data: { images, name, price = 0, description, id, isVisibile = 0, count = 1 } }) => {
  const dispatch = useDispatch()
  const cart = useSelector(selectCart)
  const user = useSelector(selectUser)
  const saved = useSelector(selectsaved)

  const foundedCart = saved?.find(el => el === id)
  const isInSaved = !!foundedCart;
  return (
    <>
      {
        parseInt(isVisibile) === 1 &&
        (
          <MyCartItemStyled {...{ isInSaved }}>
            <div className='content'>
              <div className="imgarea">
                <ImagesSliderCard className="cart" images={images} />
              </div>
              <div className="text">
                <p className='title'>{name}</p>
                <p className='details'>{description.slice(0, 150)}...<Link to={`/home/products/${id}`}>more</Link></p>
                <div className="buttons">
                  <WhitePrimaryButton onClick={() => dispatch(removeFromCart({ productId: id, cart, userId: user.id }))}> Remove</WhitePrimaryButton>
                  <WhitePrimaryButton className='saveForLater' onClick={() => {

                    if (!isInSaved) {
                      dispatch(addToSaved({ userId: user.id, productId: id, saved }))
                    } else {
                      dispatch(removeFromSaved({ userId: user.id, productId: id, saved }))
                    }

                  }}> Save for later</WhitePrimaryButton>
                </div>
              </div>
            </div>
            <div className="quntity">
              <p className='price'>{price}*{itemQuantity}={price * itemQuantity}₪</p>
              <div className="itemQuantity">
                <button disabled={count <= itemQuantity} className="increase" onClick={() => {
                  if (count > itemQuantity)
                    dispatch(increase({ productId: id, cart, userId: user.id }))
                }}>+</button>
                <p className="quantity">{itemQuantity}</p>
                <button className="decrease"
                  disabled={itemQuantity <= 0}
                  onClick={() => {
                    if (itemQuantity > 1) {
                      dispatch(decrease({ productId: id, cart, userId: user.id }))
                    } else {
                      dispatch(removeFromCart({ productId: id, cart, userId: user.id }))
                    }
                  }}
                >-</button>
              </div>
            </div>
          </MyCartItemStyled>
        )
      }
    </>
  )
}

export default MyCartItem