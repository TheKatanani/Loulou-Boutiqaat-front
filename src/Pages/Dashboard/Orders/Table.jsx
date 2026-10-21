import React from 'react'
import { useDispatch } from 'react-redux'
import { StyledTable } from '../sytled'
import { removeOrder, updateOrder } from '../../../redux/reducers/orders'
import PortalCard from '../../../Components/UI/PortalCard'
import Bill from '../../../Components/common/Bill'
import User from './User'
import useAxiosPrivate from '../../../Hook/useAxiosPrivet'
import dateFormater from '../../../utels/dateFormater'
import toast from 'react-hot-toast'

const Table = ({ orders, handlePillShow, handleUserShow, bill, setBill, userState, setUserState }) => {
  const dispatch = useDispatch()
  const axiosPrivate = useAxiosPrivate()

  const handleStatusChange = async (orderId, orderStatus) => {
    try {
      await dispatch(updateOrder({ orderId, data: { orderStatus }, axiosPrivate })).unwrap()
      toast.success('تم تحديث حالة الطلب والمخزون بنجاح')
    } catch (err) {
      toast.error(err?.message || 'تعذر تحديث حالة الطلب')
    }
  }

  const renderStatusBadge = (order) => {
    const status = order.orderStatus || (order.status ? 'delivered' : 'confirmed')
    switch (status) {
      case 'pending_whatsapp':
        return <span style={{ background: '#fef3c7', color: '#b45309', padding: '4px 10px', borderRadius: 20, fontSize: '0.78rem', fontWeight: 700 }}>⏳ حجز واتساب</span>
      case 'confirmed':
        return <span style={{ background: '#e0e7ff', color: '#4338ca', padding: '4px 10px', borderRadius: 20, fontSize: '0.78rem', fontWeight: 700 }}>📦 مؤكد قيد التجهيز</span>
      case 'delivered':
        return <span style={{ background: '#dcfce7', color: '#15803d', padding: '4px 10px', borderRadius: 20, fontSize: '0.78rem', fontWeight: 700 }}>✅ تم التسليم</span>
      case 'cancelled':
        return <span style={{ background: '#fee2e2', color: '#b91c1c', padding: '4px 10px', borderRadius: 20, fontSize: '0.78rem', fontWeight: 700 }}>❌ ملغي</span>
      case 'expired':
        return <span style={{ background: '#f1f5f9', color: '#64748b', padding: '4px 10px', borderRadius: 20, fontSize: '0.78rem', fontWeight: 700 }}>⚠️ منتهي المهلة</span>
      default:
        return <span>{status}</span>
    }
  }

  return (
    <StyledTable>
      <table>
        <thead>
          <tr>
            <th className='id'>رقم الطلب</th>
            <th>العميل</th>
            <th>الفاتورة</th>
            <th>عنوان التوصيل</th>
            <th>التكلفة</th>
            <th>حالة الدفع</th>
            <th>التاريخ</th>
            <th>حالة الطلب</th>
            <th>إجراءات الإدارة</th>
            <th>حذف</th>
          </tr>
        </thead>
        <tbody>
          {orders?.length ? (
            orders.map(order => {
              const currentStatus = order.orderStatus || (order.status ? 'delivered' : 'confirmed')
              return (
                <tr key={order.id}>
                  <td className='id'><strong>{order?.orderCode || `#LB-${order?.id}`}</strong></td>
                  <td>
                    {order?.userId ? (
                      <button 
                        type="button" 
                        className="update"
                        onClick={() => handleUserShow(order?.userId)}
                        style={{ fontSize: '0.8rem' }}
                      >
                        👤 عضو مسجل
                      </button>
                    ) : (
                      <div style={{ textAlign: 'right', fontSize: '0.82rem' }}>
                        <p style={{ fontWeight: 800, color: '#6d28d9', margin: 0 }}>💬 {order.customerName || 'ضيف (واتساب)'}</p>
                        {order.customerPhone && <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0 }} dir="ltr">{order.customerPhone}</p>}
                      </div>
                    )}
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
                  <td style={{ fontSize: '0.82rem', maxWidth: 160 }}>{order?.location || 'قطاع غزة'}</td>
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
                    {renderStatusBadge(order)}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap' }}>
                      {currentStatus === 'pending_whatsapp' && (
                        <>
                          <button
                            type="button"
                            onClick={() => handleStatusChange(order.id, 'confirmed')}
                            style={{ background: '#10b981', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: 6, fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                          >
                            تأكيد الطلب
                          </button>
                          <button
                            type="button"
                            onClick={() => handleStatusChange(order.id, 'cancelled')}
                            style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: 6, fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                          >
                            إلغاء الحجز
                          </button>
                        </>
                      )}
                      {currentStatus === 'confirmed' && (
                        <>
                          <button
                            type="button"
                            onClick={() => handleStatusChange(order.id, 'delivered')}
                            style={{ background: '#059669', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: 6, fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                          >
                            تم التسليم
                          </button>
                          <button
                            type="button"
                            onClick={() => handleStatusChange(order.id, 'cancelled')}
                            style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: 6, fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                          >
                            إلغاء الطلب
                          </button>
                        </>
                      )}
                      {currentStatus === 'delivered' && (
                        <span style={{ fontSize: '0.78rem', color: '#15803d', fontWeight: 700 }}>مكتمل ومسلّم</span>
                      )}
                      {(currentStatus === 'cancelled' || currentStatus === 'expired') && (
                        <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>ملغي (أعيد المخزون)</span>
                      )}
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
              )
            })
          ) : (
            <tr>
              <td colSpan="10" style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>
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
