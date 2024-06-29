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
import ErrorBoundary from '../../Components/common/Errorboundary'

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
          <ErrorBoundary>
            <MyCart />
          </ErrorBoundary>
          <aside>
            {/* <Coupon/> */}
            <Summary {...{ setShow }} />
          </aside>
          {show &&
            <ErrorBoundary>
              <Checkout cancel={() => setShow(false)} />
            </ErrorBoundary>
          }
        </div>
        {/* <DiscountSlide/> */}
      </Container>
    </PageStyled>
  )
}

export default Cart;