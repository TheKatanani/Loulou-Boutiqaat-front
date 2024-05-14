import { useDispatch, useSelector } from 'react-redux';
import { MoveToCart } from '../../Icons'; 
import { StyledAddCart } from './styled';
import { selectUser } from '../../redux/reducers/auth';
import { addToCart, addToCartLocal, removeFromCart, removeFromCartLocal, selectCart } from '../../redux/reducers/cart';
const AddToCartButton = ({id}) => { 
  const dispatch = useDispatch()
  let cart = useSelector(selectCart) 
  let user = useSelector(selectUser) 
  // let localStorageCart = localStorage.getItem('cart')||null
  let isInCart =false
  if(cart){   
    const foundedCart = cart?.find(el=>el.productId===id)  
    isInCart = !!foundedCart; 
  } 
  const handleAddToCart = ()=>{  
    if(user.id){
      if(!isInCart){
        dispatch(addToCart({userId:user.id,productId:id,cart}))
      }else{
        dispatch(removeFromCart({userId:user.id,productId:id,cart}))
      }
    }else{
      if(!isInCart){
        dispatch(addToCartLocal({productId:id}))
      }else{
        dispatch(removeFromCartLocal({productId:id}))
      }
    }
  } 
  return (
    <StyledAddCart {...{isInCart}} className='cart' onClick={handleAddToCart}>
        <MoveToCart/>
    </StyledAddCart>
  )
}

export default AddToCartButton