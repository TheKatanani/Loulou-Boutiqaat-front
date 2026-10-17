import React from 'react'
import { useDispatch } from 'react-redux'
import { StyledTable } from '../sytled'
import { removeOrder, updateOrder } from '../../../redux/reducers/orders'
import Checkbox from '../../../Components/Checkbox'
import PortalCard from '../../../Components/UI/PortalCard'
import Bill from '../../../Components/common/Bill'
import User from './User'
import useAxiosPrivate from '../../../Hook/useAxiosPrivet'
import dateFormater from '../../../utels/dateFormater'

const Table = ({ orders, handlePillShow, handleUserShow, bill, setBill, userState, setUserState }) => {
  const dispatch = useDispatch()
  const axiosPrivate = useAxiosPrivate()

  const handleCheckBoxChange = (orderId, value) => {
    dispatch(updateOrder({ orderId, data: { status: value }, axiosPrivate }))
  }

  return (
    <StyledTable>
      <table>
        <thead>
          <tr>
            <th className='id'>#</th>
            <th>العميل</th>
            <th>الفاتورة والمنتجات</th>
            <th>عنوان التوصيل</th>
            <th>إجمالي التكلفة</th>
            <th>حالة الدفع</th>
            <th>تاريخ الطلب</th>
            <th>اكتمال الطلب</th>
            <th>حذف</th>
          </tr>
        </thead>
        <tbody>
          {orders?.length ? (
            orders.map(order => (
              <tr key={order.id}>
                <td className='id'><strong>#{order?.id}</strong></td>
                <td>
                  <button 
                    type="button" 
                    className="update"
                    onClick={() => handleUserShow(order?.userId)}
                    style={{ fontSize: '0.8rem' }}
                  >
                    👤 عرض العميل
                  </button>
                </td>
                <td>
                  <button 
                    type="button" 
                    className="update"
                    onClick={() => handlePillShow(order?.orders)}
                    style={{ fontSize: '0.8rem' }}
                  >
                    🧾 عرض الفاتورة
                  </button>
                </td>
                <td>{order?.location || 'قطاع غزة'}</td>
                <td><strong style={{ color: '#059669' }}>{order?.totalCost} ₪</strong></td>
                <td>
                  <span className={`statusBadge ${order?.paid ? 'published' : 'unpublished'}`}>
                    {order?.paid ? '● تم الدفع' : '○ الدفع عند الاستلام'}
                  </span>
                </td>
                <td style={{ fontSize: '0.82rem', direction: 'ltr', textAlign: 'right' }}>
                  {order?.createdAt ? dateFormater(order.createdAt) : '-'}
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}>
                    <Checkbox 
                      id={`status-${order.id}`} 
                      onChange={(e) => handleCheckBoxChange(order?.id, e.target.checked)} 
                      checked={Boolean(order?.status)} 
                    />
                    <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                      {order?.status ? 'مكتمل' : 'قيد التجهيز'}
                    </span>
                  </div>
                </td>
                <td>
                  <button 
                    type="button"
                    className='delete'
                    onClick={() => {
                      if (window.confirm(`هل أنت متأكد من حذف الطلب رقم #${order.id}؟`)) {
                        dispatch(removeOrder({ orderId: order.id, axiosPrivate }))
                      }
                    }}
                  >
                    🗑️ حذف
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>
                لا توجد طلبات في هذا القسم حالياً
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

      {userState.show && (
        <PortalCard onClick={() => setUserState(prev => ({ ...prev, show: !userState.show }))}>
          <User userId={userState.userId} />
        </PortalCard>
      )}
    </StyledTable>
  )
}

export default Table