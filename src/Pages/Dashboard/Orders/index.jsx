import React, { useEffect, useState } from 'react'
import { StyledTable } from '../sytled'
import { useDispatch, useSelector } from 'react-redux'
import { removeOrder, selectOrders, setOrders } from '../../../redux/reducers/orders'
import useAxiosPrivate from '../../../Hook/useAxiosPrivet'
import PortalCard from '../../../Components/UI/PortalCard'
import Bill from './Bill'
import User from './User'
import { setUsers } from '../../../redux/reducers/users'

const Orders = () => {
  const dispatch = useDispatch()
  const orders = useSelector(selectOrders)
  const [bill, setBill] = useState({
    orders: '',
    show: false
  })
  const [userState, setUserState] = useState({
    userId: '',
    show: false
  })
  const axiosPrivate = useAxiosPrivate()
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
  useEffect(() => {
    dispatch(setOrders({ axiosPrivate }))
    dispatch(setUsers({ axiosPrivate }))
  }, [dispatch, axiosPrivate]) 
  return (
    <StyledTable >
      <thead>
        <tr>
          <th className='id'>id</th>
          <th >user</th>
          <th >orders</th>
          <th >location</th>
          <th >total Cost</th>
          <th >paid</th>
          <th>delete</th>
        </tr>
      </thead>
      <tbody>
        {
          orders?.map(order => (
            <tr key={order.id}>
              <td className='id'>{order?.id}</td> 
              <td style={{cursor:'pointer'}}  onClick={() => handleUserShow(order?.userId)}>view the user</td>
              <td style={{cursor:'pointer'}}  onClick={() => handlePillShow(order?.orders)}>view the bill</td>
              <td >{order?.location}</td>
              <td >{order?.totalCost}</td>
              <td >{order?.paid}</td>
              <td>
                <button className='delete'
                  onClick={() => {
                    dispatch(removeOrder({ orderId: order.id, axiosPrivate }))
                  }}>
                  delete
                </button>
              </td>
            </tr>
          ))
        }
      </tbody>
      {
        bill.show &&
        <PortalCard onClick={() => setBill(prev => ({ ...prev, show: !bill.show }))}>
          <Bill orders={bill?.orders} />
        </PortalCard>
      }
      {
        userState.show &&
        <PortalCard onClick={() => setUserState(prev => ({ ...prev, show: !userState.show }))}>
          <User userId={userState.userId} />
        </PortalCard>
      }
    </StyledTable>
  )
}

export default Orders