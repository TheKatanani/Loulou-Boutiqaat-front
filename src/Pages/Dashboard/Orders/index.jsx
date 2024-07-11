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
    if (visibleOrders.length <= 0 || searchTerm.length <= 0) {
      setVisibleOrders(orders)
    }
  }, [visibleOrders, orders, searchTerm])
  useEffect(() => {
    if (searchTerm) {
      const visible = orders.filter(order => { 
        const user = users.find(u => u.id === order.userId) 
        return user.name.includes(searchTerm) 
      })
      setVisibleOrders(visible)
    }
  }, [searchTerm, orders, users])
  useEffect(() => {
    dispatch(setOrders({ axiosPrivate }))
    dispatch(setUsers({ axiosPrivate }))
  }, [dispatch, axiosPrivate])
  return (
    <StyledOrders>
      <Input
      label="Search By User Name"
        type='text'
        id='search'
        placeholder='search term'
        onChange={handleSearchChanged}
        value={searchTerm}
      />
      <h2>Current Orders</h2>
      <Table orders={visibleOrders.filter(order => !order.status)} {...{ handlePillShow, handleUserShow, bill, setBill, userState, setUserState }} />
      <br />
      <h2>Old Orders</h2>
      <Table orders={visibleOrders.filter(order => order.status)} {...{ handlePillShow, handleUserShow, bill, setBill, userState, setUserState }} />
    </StyledOrders>
  )
}

export default Orders