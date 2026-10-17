import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Bill from '../../Components/common/Bill' 
import useAxiosPrivate from '../../Hook/useAxiosPrivet'
import { cancelOrder, selectOrders, setOrders } from '../../redux/reducers/orders'
import PortalCard from '../../Components/UI/PortalCard'
import { selectUser } from '../../redux/reducers/auth'
import { StayledOrdersTable } from './styled'
import dateFormater from '../../utels/dateFormater'

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

  const userOrders = orders.filter(order => order.userId === user?.id) 

  useEffect(() => {
    dispatch(setOrders({ axiosPrivate })) 
  }, [dispatch, axiosPrivate])

  return (
    <StayledOrdersTable>
      <table>
        <thead>
          <tr>
            <th className='id'>رقم الطلب</th>
            <th>تفاصيل المنتجات</th>
            <th className='address'>عنوان التوصيل</th>
            <th>إجمالي التكلفة</th> 
            <th>تاريخ الطلب</th>
            <th>حالة الطلب</th>
            <th>إلغاء الطلب</th>
          </tr>
        </thead>
        <tbody>
          {userOrders?.length ? (
            userOrders.map(order => (
              <tr key={order.id}>
                <td className='id'><strong>#{order?.id}</strong></td>
                <td>
                  <button 
                    type="button" 
                    className="update"
                    onClick={() => handlePillShow(order?.orders)}
                  >
                    🧾 عرض الفاتورة
                  </button>
                </td>
                <td className='address'>{order?.location || 'قطاع غزة'}</td>
                <td><strong style={{ color: '#059669' }}>{order?.totalCost} ₪</strong></td> 
                <td style={{ fontSize: '0.82rem', direction: 'ltr', textAlign: 'right' }}>
                  {dateFormater(order?.createdAt)}
                </td>
                <td>
                  <span className={`statusBadge ${order?.status ? 'published' : 'unpublished'}`}>
                    {order?.status ? '● مكتمل ومسلّم' : '○ قيد التجهيز'}
                  </span>
                </td>
                <td>
                  <button 
                    type="button"
                    className={`delete ${order?.status ? 'disabled' : ''}`}
                    disabled={order?.status}
                    onClick={() => {  
                      if (window.confirm('هل أنتِ متأكدة من إلغاء هذا الطلب؟')) {
                        dispatch(cancelOrder({ orderId: order.id, axiosPrivate }))
                      }
                    }}
                  >
                    {order?.status ? 'لا يمكن الإلغاء' : 'إلغاء الطلب'}
                  </button>
                </td> 
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>
                لا توجد طلبات سابقة لكِ حتى الآن
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {bill.show && (
        <PortalCard onClick={() => setBill(prev => ({ ...prev, show: !bill.show }))}>
          <Bill orders={bill?.orders} />
        </PortalCard>
      )}
    </StayledOrdersTable>
  )
}

export default OrderList