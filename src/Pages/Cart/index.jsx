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

const Cart = () => {
  const [show, setShow] = useState(false)
  const [isAlert, setIsAlert] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const orderStatus = useSelector(selectOrdersStatus)
  if (orderStatus === STATUS.SUCCEEDED) {
    if (show || !isAlert) {
      setShow(false)
      setIsAlert(true)
    }
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
            <Summary {...{ setShow }} />
          </aside>
          {
            show &&
            <ErrorBoundary>
              <Checkout cancel={() => setShow(false)} />
            </ErrorBoundary>
          }
          {
            isAlert &&
            <ErrorBoundary>
              <Alert cancel={() => {
                setIsAlert(false)
                dispatch(setStatusIdle())
                navigate('/home')
              }} link={{
                path: `https://wa.me/00970597229340`,
                message: 'receve your order',
                target: '_blank'
                // message: 'click here to contact us on whats app to give you your order'
              }}
                message={`Congrats🌸, The Order sent successfully 🚀`} />
            </ErrorBoundary>
          }
        </div>
      </Container>
    </PageStyled>
  )
}

export default Cart;