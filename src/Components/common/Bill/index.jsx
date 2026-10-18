import React from 'react'
import { useSelector } from 'react-redux'
import { selectProducts } from '../../../redux/reducers/products'
import { StyledBill } from '../../../Pages/Dashboard/Orders/styled'

const Bill = ({ orders, paid = 0 }) => {
  const products = useSelector(selectProducts)
  const orderItems = Array.isArray(orders) ? orders : []
  let billTotal = 0

  return (
    <StyledBill>
      <h3 style={{ marginBottom: 14, fontSize: '1.1rem', fontWeight: 800, color: '#6d28d9', textAlign: 'right' }}>
        🧾 تفاصيل فاتورة الطلب والمنتجات
      </h3>
      <table>
        <thead>
          <tr>
            <th className='id'>#</th>
            <th>المنتج</th>
            <th>الكمية</th>
            <th>السعر الفردي</th>
            <th>الإجمالي</th>
          </tr>
        </thead>
        <tbody>
          {orderItems.length > 0 ? (
            orderItems.map(order => {
              const currentProduct = products?.find(pro => String(pro.id) === String(order.productId))
              const price = currentProduct?.price || 0
              const total = price * (order.quantity || 1)
              billTotal += total
              return (
                <tr key={order.productId}>
                  <td className='id'>#{order?.productId}</td>
                  <td><strong>{currentProduct?.name || `منتج رقم ${order.productId}`}</strong></td>
                  <td>{order?.quantity || 1}</td>
                  <td>{price} ₪</td>
                  <td><strong style={{ color: '#059669' }}>{total} ₪</strong></td>
                </tr>
              )
            })
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: '#94a3b8' }}>
                لا توجد عناصر في هذه الفاتورة
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <footer style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14, direction: 'rtl' }}>
        <p style={{ fontWeight: 700 }}>المجموع الكلي: <span style={{ color: '#6d28d9' }}>{billTotal} ₪</span></p>
        <p style={{ fontWeight: 700 }}>حالة السداد: <span style={{ color: paid ? '#059669' : '#e11d48' }}>{paid ? `مدفوع (${paid} ₪)` : 'الدفع عند الاستلام'}</span></p>
      </footer>
    </StyledBill>
  )
}

export default Bill