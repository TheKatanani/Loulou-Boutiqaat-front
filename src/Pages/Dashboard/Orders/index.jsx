import React, { useEffect, useState, useMemo } from 'react'
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
  const users = useSelector(selectUsers)
  const [searchTerm, setSearchTerm] = useState('')
  const axiosPrivate = useAxiosPrivate()

  const [bill, setBill] = useState({
    orders: [],
    show: false
  })
  const [userState, setUserState] = useState({
    userId: '',
    show: false
  })

  const handlePillShow = (orders) => {
    setBill({
      orders: orders || [],
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
    setSearchTerm(e.target.value)
  }

  useEffect(() => {
    dispatch(setOrders({ axiosPrivate }))
    dispatch(setUsers({ axiosPrivate }))
  }, [dispatch, axiosPrivate])

  const ordersList = useMemo(() => (Array.isArray(orders) ? orders : []), [orders]);
  const usersList = useMemo(() => (Array.isArray(users) ? users : []), [users]);

  const visibleOrders = useMemo(() => {
    if (!searchTerm?.trim()) return ordersList;
    const term = searchTerm.toLowerCase().trim();
    return ordersList.filter(order => { 
      const user = usersList.find(u => u?.id === order?.userId);
      return (
        user?.name?.toLowerCase().includes(term) || 
        user?.phone?.includes(term) ||
        String(order?.id)?.includes(term)
      );
    });
  }, [searchTerm, ordersList, usersList]);

  const pendingOrders = useMemo(() => visibleOrders.filter(order => !order?.status), [visibleOrders]);
  const completedOrders = useMemo(() => visibleOrders.filter(order => Boolean(order?.status)), [visibleOrders]);

  return (
    <StyledOrders>
      <div style={{ marginBottom: 20 }}>
        <Input
          label="بحث في طلبات العملاء (اسم العميل أو رقم الهاتف أو رقم الطلب)"
          type='text'
          id='search'
          placeholder='اكتب اسم العميل أو الهاتف أو رقم الطلب...'
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