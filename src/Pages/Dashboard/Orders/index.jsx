import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectOrders, setOrders } from '../../../redux/reducers/orders'
import useAxiosPrivate from '../../../Hook/useAxiosPrivet'
import { selectUsers, setUsers } from '../../../redux/reducers/users'
import Table from './Table'
import Input from '../../../Components/Input'
import { StyledOrders } from './styled'

const Orders = () => {
  const dispatch = useDispatch()
  const orders = useSelector(selectOrders)
  const [visibleOrders, setVisibleOrders] = useState(orders)
  const users = useSelector(selectUsers)
  const [searchTerm, setSearchTerm] = useState('')
  const axiosPrivate = useAxiosPrivate()
  const [bill, setBill] = useState({
    orders: '',
    show: false
  })
  const [userState, setUserState] = useState({
    userId: '',
    show: false
  })

  const handlePillShow = (orders) => {
    setBill({
      orders,
      show: true
    })
  }

  const handleUserShow = (userId) => {
    setUserState({
      userId,
      show: true
    })
  }

  const handleSearchChanged = (e) => {
    const value = e.target.value
    setSearchTerm(value)
  }

  useEffect(() => {
    if (!searchTerm) {
      setVisibleOrders(orders)
    } else {
      const visible = orders.filter(order => { 
        const user = users.find(u => u.id === order.userId) 
        return user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
               user?.phone?.includes(searchTerm)
      })
      setVisibleOrders(visible)
    }
  }, [searchTerm, orders, users])

  useEffect(() => {
    dispatch(setOrders({ axiosPrivate }))
    dispatch(setUsers({ axiosPrivate }))
  }, [dispatch, axiosPrivate])

  const pendingOrders = visibleOrders.filter(order => !order.status);
  const completedOrders = visibleOrders.filter(order => order.status);

  return (
    <StyledOrders>
      <div style={{ marginBottom: 20 }}>
        <Input
          label="بحث في طلبات العملاء (اسم العميل أو رقم الهاتف)"
          type='text'
          id='search'
          placeholder='اكتب اسم العميل أو الهاتف...'
          onChange={handleSearchChanged}
          value={searchTerm}
        />
      </div>

      <div style={{ marginBottom: 35 }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f59e0b', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <span>⏳</span>
          <span>الطلبات الجارية والمطلوبة ({pendingOrders.length})</span>
        </h2>
        <Table orders={pendingOrders} {...{ handlePillShow, handleUserShow, bill, setBill, userState, setUserState }} />
      </div>

      <div>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#10b981', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <span>✅</span>
          <span>الطلبات المكتملة والمُسلَّمة ({completedOrders.length})</span>
        </h2>
        <Table orders={completedOrders} {...{ handlePillShow, handleUserShow, bill, setBill, userState, setUserState }} />
      </div>
    </StyledOrders>
  )
}

export default Orders