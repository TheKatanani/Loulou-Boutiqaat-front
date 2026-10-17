import React, { useEffect, useState } from 'react'
import { Container } from '../../Global/components'
import MyCart from '../../Components/MyCart'
import Summary from '../../Components/Summary'
import { PageStyled } from './styled'
import Checkout from '../../Components/Checkout'
import { selectOrdersStatus, setStatusIdle } from '../../redux/reducers/orders'
import { useDispatch, useSelector } from 'react-redux'
import { STATUS } from '../../Actions'
import { useNavigate } from 'react-router-dom'
import ErrorBoundary from '../../Components/common/Errorboundary'
import Alert from '../../Components/common/Alert'
import { selectStatus, setStatusIdle as setCheckoutStatusIdle} from '../../redux/reducers/checkout'

const Cart = () => {
  const [show, setShow] = useState(false) 
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const orderStatus = useSelector(selectOrdersStatus)
  const checkOutStatus = useSelector(selectStatus)
  if (orderStatus === STATUS.SUCCEEDED) {
    if (show) {
      setShow(false) 
    }
  }
  useEffect(() => {
    dispatch(setStatusIdle())
    dispatch(setCheckoutStatusIdle())
  }, [dispatch])
  return (
    <PageStyled>
      <Container>
        <div className="flex">
          <ErrorBoundary>
            <MyCart />
          </ErrorBoundary>
          <aside>
            <Summary {...{ setShow }} />
          </aside>
          {
            show &&
            <ErrorBoundary>
              <Checkout cancel={() => setShow(false)} />
            </ErrorBoundary>
          }
          {
            checkOutStatus === STATUS.SUCCEEDED &&
            <ErrorBoundary>
              <Alert cancel={() => { 
                dispatch(setStatusIdle())
                dispatch(setCheckoutStatusIdle())
                navigate('/home')
              }} link={{
                path: `https://wa.me/972597229340`,
                message: 'تواصل معنا لاستلام طلبك عبر واتساب',
                target: '_blank'
              }}
                message={`تهانينا🌸، تم إرسال الطلب بنجاح 🚀`} />
            </ErrorBoundary>
          }
        </div>
      </Container>
    </PageStyled>
  )
}

export default Cart;