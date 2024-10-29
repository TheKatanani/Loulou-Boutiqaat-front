import React from 'react'
import { StyledCheckOut } from './styled'
import Input from '../Input'
import { handleInputChange, selectError, selectFormData, setStatusFailed, setStatusSucceeded } from '../../redux/reducers/checkout'
import { useDispatch, useSelector } from 'react-redux'
import ErrorForm from '../ErrorForm'
import { MainButton } from '../../Global/components'
import { selectUser } from '../../redux/reducers/auth'
import { resetState, selectCart } from '../../redux/reducers/cart'
import { selectProducts } from '../../redux/reducers/products'
import { addOrder } from '../../redux/reducers/orders'
import useAxiosPrivate from '../../Hook/useAxiosPrivet'
import PortalCard from '../UI/PortalCard'

const Checkout = ({cancel}) => {
  const formData = useSelector(selectFormData)
  const errors = useSelector(selectError)
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const cart = useSelector(selectCart)
  const products = useSelector(selectProducts)
  const axiosPrivate = useAxiosPrivate()
  const total = cart?.reduce((total, cartItem) => {
    const foundedItem = products?.find(product => product.id == cartItem.productId)
    if (foundedItem) {
      return total + foundedItem?.price * cartItem?.quantity
    }
    else return total
  }, 0)
  const handleInputChangeFun = (e) => {
    const {
      id,
      value
    } = e.target
    dispatch(handleInputChange({ id, value }))
  }
  const handleSendOrder = () => {
    //get the name and phone from the user data and set it with the location and cart data and dispatsh them 
    if (formData?.location.trim().length >= 6) {
      const order = {
        userId: user.id,
        orders: cart,
        location: formData.location,
        totalCost: total,
        paid: 0
      }
      dispatch(addOrder({ order, axiosPrivate }))
      dispatch(resetState())
      // set check out status success to show it 
      dispatch(setStatusSucceeded())
    } else {
      dispatch(setStatusFailed({ location: 'Must Add Location!' }))
    }
  }
  return (
    <PortalCard>
      <StyledCheckOut>
        {errors?.location && <ErrorForm>{errors?.location}</ErrorForm>}
        <Input
          onChange={handleInputChangeFun}
          id="location"
          type="text"
          placeholder="أكتب هنا"
          label="أضف عنوانك"
          value={formData?.location}
        />
        {/* <MainButton disabled>Pay Now</MainButton> */}
        <MainButton onClick={handleSendOrder}>أرسل الطلب</MainButton>
        <span className='cancel' onClick={cancel}>x</span>
      </StyledCheckOut>
    </PortalCard>
  )
}

export default Checkout