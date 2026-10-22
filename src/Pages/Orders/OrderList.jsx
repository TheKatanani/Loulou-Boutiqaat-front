import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { cancelOrder } from '../../redux/reducers/orders'
import { StyledTable } from '../Dashboard/sytled'
import PortalCard from '../../Components/Portal'
import Bill from '../../Components/Bill'
import dateFormater from '../../utils/dateFormater'
import useAxiosPrivate from '../../Hook/useAxiosPrivet'

const renderOrderStatusBadge = (order) => {
  const status = order?.orderStatus || (order?.status ? 'delivered' : 'confirmed');
  switch (status) {
    case 'delivered':
      return <span style={{ color: '#059669', fontWeight: 700 }}>● مكتمل ومسلّم</span>;
    case 'confirmed':
      return <span style={{ color: '#2563eb', fontWeight: 700 }}>● مؤكد وجارٍ التجهيز</span>;
    case 'pending_whatsapp':
      return <span style={{ color: '#d97706', fontWeight: 700 }}>⏳ بانتظار واتساب</span>;
    case 'cancelled':
      return <span style={{ color: '#dc2626', fontWeight: 600 }}>✕ تم الإلغاء</span>;
    case 'expired':
      return <span style={{ color: '#64748b', fontWeight: 600 }}>⌛ انتهت المهلة</span>;
    default:
      return <span>{status}</span>;
  }
};

const OrderList = ({ userOrders }) => {
  const [bill, setBill] = useState({ show: false, orders: [] })
  const dispatch = useDispatch()
  const axiosPrivate = useAxiosPrivate()

  const handlePillShow = (orders) => {
    setBill({
      show: true,
      orders
    })
  }

  return (
    <StyledTable>
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
            userOrders.map(order => {
              const canCancel = (order.orderStatus === 'pending_whatsapp' || order.orderStatus === 'confirmed') || (!order.orderStatus && !order.status);
              const displayCode = order?.orderCode || `#${order?.id}`;
              return (
                <tr key={order.id}>
                  <td className='id'><strong>{displayCode}</strong></td>
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
                    {renderOrderStatusBadge(order)}
                  </td>
                  <td>
                    <button 
                      type="button"
                      className={`delete ${!canCancel ? 'disabled' : ''}`}
                      disabled={!canCancel}
                      onClick={() => {  
                        if (window.confirm('هل أنتِ متأكدة من إلغاء هذا الطلب وإعادة المنتجات للمخزون؟')) {
                          dispatch(cancelOrder({ orderId: order.id, axiosPrivate }))
                        }
                      }}
                    >
                      {canCancel ? 'إلغاء الطلب' : 'لا يمكن الإلغاء'}
                    </button>
                  </td> 
                </tr>
              );
            })
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
    </StyledTable>
  )
}

export default OrderList
