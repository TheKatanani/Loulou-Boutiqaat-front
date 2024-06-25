import React, { useEffect, useState } from 'react'
import { Container } from '../../Global/components'
import MyCart from '../../Components/MyCart'
// import Coupon from '../../Components/Coupon'
import Summary from '../../Components/Summary'
import { PageStyled } from './styled'
import Checkout from '../../Components/Checkout'
import { selectOrdersStatus, setStatusIdle } from '../../redux/reducers/orders'
import { useDispatch, useSelector } from 'react-redux'
import { STATUS } from '../../Actions'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const [show, setShow] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const orderStatus = useSelector(selectOrdersStatus)
  if (orderStatus === STATUS.SUCCEEDED) {
    dispatch(setStatusIdle())
    navigate('/home')
    alert('Order Sent Successfolly ✔️')
  }
  useEffect(() => {
    dispatch(setStatusIdle())
  }, [dispatch])
  return (
    <PageStyled>
      <Container>
        <div className="flex">
          <MyCart />
          <aside>
            {/* <Coupon/> */}
            <Summary {...{ setShow }} />
          </aside>
          {show &&
            <Checkout />
          }
        </div>
        {/* <DiscountSlide/> */}
      </Container>
    </PageStyled>
  )
}

export default Cart;