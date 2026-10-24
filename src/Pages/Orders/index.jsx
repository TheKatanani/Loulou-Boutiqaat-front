import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OrderList from './OrderList'
import { StayledOrders } from './styled' 
import { Container, MainButton } from '../../Global/components'
import { selectOrders, selectOrdersStatus, setOrders } from '../../redux/reducers/orders'
import useAxiosPrivate from '../../Hook/useAxiosPrivet'
import { STATUS } from '../../Actions'

const Orders = () => {
  const dispatch = useDispatch()
  const axiosPrivate = useAxiosPrivate()
  const userOrders = useSelector(selectOrders)
  const status = useSelector(selectOrdersStatus)
  const error = useSelector(state => state.order.error)

  useEffect(() => {
    dispatch(setOrders({ axiosPrivate }))
  }, [dispatch, axiosPrivate])

  const handleRetry = () => {
    dispatch(setOrders({ axiosPrivate }))
  }

  return (
    <Container>
      <StayledOrders>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <h1 style={{ margin: 0 }}>سجل طلباتي السابقة</h1>
          <button
            type="button"
            onClick={handleRetry}
            style={{
              background: '#f8fafc',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              padding: '8px 16px',
              fontSize: '0.85rem',
              cursor: 'pointer',
              color: '#475569',
              fontWeight: 600,
            }}
          >
            🔄 تحديث القائمة
          </button>
        </div>

        {status === STATUS.LOADING && (!userOrders || userOrders.length === 0) ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#6366f1' }}>
            <p style={{ fontSize: '1.1rem', fontWeight: 700 }}>جارٍ تحميل طلباتكِ... ⏳</p>
          </div>
        ) : status === STATUS.FAILED && (!userOrders || userOrders.length === 0) ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', background: '#fef2f2', borderRadius: '12px', border: '1px solid #fecaca' }}>
            <p style={{ color: '#b91c1c', fontWeight: 700, marginBottom: 12 }}>
              {error?.message || error || 'تعذر تحميل قائمة الطلبات حالياً'}
            </p>
            <MainButton type="button" onClick={handleRetry} style={{ padding: '8px 24px', fontSize: '0.9rem' }}>
              إعادة المحاولة
            </MainButton>
          </div>
        ) : (
          <OrderList userOrders={userOrders} />
        )}
      </StayledOrders>
    </Container>
  )
}

export default Orders
