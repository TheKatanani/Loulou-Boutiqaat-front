import { useDispatch, useSelector } from 'react-redux';
import { MoveToCart } from '../../Icons';
import { StyledAddCart } from './styled';
import { selectUser } from '../../redux/reducers/auth';
import { addToCart, addToCartLocal, removeFromCart, removeFromCartLocal, selectCart } from '../../redux/reducers/cart';
import useAxiosPrivate from '../../Hook/useAxiosPrivet';
import toast from 'react-hot-toast';
const AddToCartButton = ({ id }) => {
  const dispatch = useDispatch()
  const cart = useSelector(selectCart)
  const user = useSelector(selectUser)
  const axiosPrivate = useAxiosPrivate()
  // let localStorageCart = localStorage.getItem('cart')||null
  let isInCart = false;
  if (cart) {
    const foundedCart = cart?.find(el => +el.productId === id)
    isInCart = !!foundedCart;  
  }
  const handleAddToCart = () => {
    if (user?.id) {
      if (!isInCart) {
        dispatch(addToCart({ productId: id, cart, axiosPrivate }))
        toast.success('تمت إضافة المنتج إلى السلة بنجاح')
      } else {
        dispatch(removeFromCart({ productId: id, axiosPrivate }))
        toast('تمت إزالة المنتج من السلة', { icon: '🗑️' })
      }
    } else {
      if (!isInCart) {
        dispatch(addToCartLocal({ productId: id }))
        toast.success('تمت إضافة المنتج إلى السلة بنجاح')
      } else {
        dispatch(removeFromCartLocal({ productId: id }))
        toast('تمت إزالة المنتج من السلة', { icon: '🗑️' })
      }
    }
  }
  return (
    <StyledAddCart {...{ isInCart }} className='cart' onClick={handleAddToCart}>
      <MoveToCart />
    </StyledAddCart>
  )
}

export default AddToCartButton