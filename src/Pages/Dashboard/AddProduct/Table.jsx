import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { adjustProductStock, deleteProduct, selectAddProductsState, selectMood, setUpdateProduct } from '../../../redux/reducers/products'
import { selectCategories } from '../../../redux/reducers/categories'
import { StyledTable } from '../sytled'
import { MOOD, ROLES } from '../../../Actions'
import useAxiosPrivate from '../../../Hook/useAxiosPrivet'
import { selectUser } from '../../../redux/reducers/auth'
import toast from 'react-hot-toast'

const Table = ({ products }) => {
  const categories = useSelector(selectCategories)
  const dispatch = useDispatch()
  const axiosPrivate = useAxiosPrivate()
  const { id } = useSelector(selectAddProductsState)
  const mood = useSelector(selectMood)
  const user = useSelector(selectUser)

  const handleAdjustStock = async (product) => {
    const current = Number(product.stock ?? 0)
    const input = window.prompt(
      `تعديل مخزون "${product.name}":\nالكمية المسجلة حالياً: ${current} قطعة.\nأدخلي الكمية الجديدة المتوفرة:`,
      current
    )
    if (input === null || input.trim() === '') return

    if (!/^\d+$/.test(input.trim())) {
      toast.error('يرجى إدخال عدد صحيح أكبر من أو يساوي الصفر دون فواصل أو أحرف')
      return
    }

    const parsed = Number(input.trim())

    try {
      await dispatch(
        adjustProductStock({
          id: product.id,
          stock: parsed,
          expectedStock: current,
          axiosPrivate,
        })
      ).unwrap()
      toast.success(`تم تحديث مخزون "${product.name}" إلى ${parsed} قطعة بنجاح! 📦`)
    } catch (err) {
      toast.error(err?.message || 'تعذر تحديث المخزون، قد يكون تغير في هذه الأثناء')
    }
  }

  return (
    <StyledTable>
      <table>
        <thead>
          <tr>
            <th className='id'>#</th>
            <th>اسم المنتج</th>
            <th className='description'>الوصف</th>
            <th className='price'>السعر</th>
            <th className='previous'>السابق</th>
            <th className='images'>الصور</th>
            <th className='stars'>التقييم</th>
            <th className='category'>القسم</th>
            <th className='stock'>المخزون</th>
            <th>حالة النشر</th>
            <th>تعديل</th>
            {user?.role === ROLES.ADMIN && <th>حذف</th>}
          </tr>
        </thead>
        <tbody>
          {products?.map(product => {
            const isPublished = product?.published === 1 || product?.published === true || product?.published === undefined;
            return (
              <tr 
                key={product.id} 
                className={(mood === MOOD.UPDATE && product.id === id) ? `underUpdate` : undefined}
              >
                <td className='id'><strong>#{product.id}</strong></td>
                <td><strong>{product.name}</strong></td>
                <td className='description' style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {product.description?.slice(0, 45)}...
                </td>
                <td className='price'><span style={{ color: '#059669', fontWeight: 700 }}>{product.price} ₪</span></td>
                <td className='previous'><span style={{ textDecoration: 'line-through', color: '#94a3b8' }}>{product.prevPrice ? `${product.prevPrice} ₪` : '-'}</span></td>
                <td className='images'>
                  {product?.images && typeof (product.images) === 'string' 
                    ? JSON.parse(product.images)?.slice(0, 2).map((img, i) => (
                        <img loading="lazy" key={i} src={img} alt={product.name} />
                      ))
                    : product.images?.slice(0, 2).map((img, i) => (
                        <img loading="lazy" key={i} src={img} alt={product.name} />
                      ))
                  }
                </td>
                <td className='stars'>⭐ {product.stars || 5}</td>
                <td className='category'>{categories.find(el => el.id === Number(product.categoryId))?.name || 'غير محدد'}</td>
                <td className='stock'>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}>
                    {Number(product?.stock) > 5 ? (
                      <span style={{ color: '#059669', fontWeight: 700 }}>{product.stock} قطعة</span>
                    ) : Number(product?.stock) > 0 ? (
                      <span style={{ color: '#d97706', fontWeight: 700 }}>{product.stock} (محدود)</span>
                    ) : (
                      <span style={{ color: '#dc2626', fontWeight: 700 }}>نفذت الكمية</span>
                    )}
                    <button
                      type="button"
                      title="تعديل المخزون المباشر بأمان"
                      onClick={() => handleAdjustStock(product)}
                      style={{
                        background: '#f8fafc',
                        border: '1px solid #cbd5e1',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        padding: '2px 6px',
                        fontSize: '0.78rem',
                      }}
                    >
                      🔢
                    </button>
                  </div>
                </td>
                <td className='visibility'>
                  <span className={`statusBadge ${isPublished ? 'published' : 'unpublished'}`}>
                    {isPublished ? '● منشور' : '○ مسودة'}
                  </span>
                </td>
                <td>
                  <button 
                    type="button"
                    className='update'
                    disabled={mood === MOOD.UPDATE && product.id === id}
                    onClick={() => dispatch(setUpdateProduct({ product }))}
                  >
                    ✏️ تعديل
                  </button>
                </td>
                {user?.role === ROLES.ADMIN && (
                  <td>
                    <button 
                      type="button"
                      className='delete'
                      onClick={() => {
                        if (window.confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
                          dispatch(deleteProduct({ id: product.id, axiosPrivate }))
                        }
                      }}
                    >
                      🗑️ حذف
                    </button>
                  </td>
                )}
              </tr>
            )
          })}
        </tbody>
      </table>
    </StyledTable>
  )
}

export default Table
