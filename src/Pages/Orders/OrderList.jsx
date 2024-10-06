import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Bill from '../../Components/common/Bill' 
import useAxiosPrivate from '../../Hook/useAxiosPrivet'
import { cancelOrder, selectOrders, setOrders } from '../../redux/reducers/orders'
import PortalCard from '../../Components/UI/PortalCard'
import { selectUser } from '../../redux/reducers/auth'
import { StayledOrdersTable } from './styled'

const OrderList = () => {
  const dispatch = useDispatch()
  const axiosPrivate = useAxiosPrivate()
  const orders = useSelector(selectOrders)
  const user = useSelector(selectUser)
  const [bill, setBill] = useState({
    orders: '',
    show: false
  })
  const handlePillShow = (orders) => {
    setBill({
      orders,
      show: true
    })
  }
  // console.log(orders)
  // filter the list depend on userId 
  const userOrders = orders.filter(order=>order.userId === user.id) 

  useEffect(() => {
    dispatch(setOrders({ axiosPrivate })) 
  }, [dispatch, axiosPrivate])
  return (
    <StayledOrdersTable >
      <thead>
        <tr>
          <th className='id'>المعرف</th>
          <th >الطلبات</th>
          <th className='address'>العنوان</th>
          <th >السعر</th> 
          <th >التاريخ</th>
          <th >الحالة</th>
          <th>الغاء</th>
        </tr>
      </thead>
      {
        orders.length ?
          <tbody>
            {
              userOrders?.map(order => (
                <tr key={order.id}>
                  <td className='id'>{order?.id}</td>
                  <td style={{ cursor: 'pointer' }} onClick={() => handlePillShow(order?.orders)}>عرض الفاتورة</td>
                  <td className='address'>{order?.location}</td>
                  <td >{order?.totalCost}</td>
                  {/* <td >{order?.paid}</td> */}
                  <td >{order?.createdAt}</td>
                    <td>
                      {order?.status == true ? 'مكتمل':'تحت التجهيز...'}
                    </td>
                  <td>
                    <button className={`delete ${order?.status == true ? 'disabled' : ''}`}
                      disabled={order?.status == true}
                      onClick={() => {  
                        dispatch(cancelOrder({ orderId: order.id, axiosPrivate }))
                      }}>
                      الغاء
                    </button>
                  </td> 
                </tr>
              ))
            }
          </tbody>
          :
          <tbody>
            <tr>
              لا يوجد طلبات
            </tr>
          </tbody>
      }
      {
        bill.show &&
        <PortalCard onClick={() => setBill(prev => ({ ...prev, show: !bill.show }))}>
          <Bill orders={bill?.orders} />
        </PortalCard>
      }
    </StayledOrdersTable>
  )
}

export default OrderList 