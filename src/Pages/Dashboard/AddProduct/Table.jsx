import React, { useState } from 'react'
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

  const [stockModal, setStockModal] = useState({
    show: false,
    product: null,
    newStock: '',
    expectedStock: 0,
    isSubmitting: false,
    error: null,
  })

  const openStockModal = (product) => {
    const current = Number(product.stock ?? 0)
    setStockModal({
      show: true,
      product,
      newStock: String(current),
      expectedStock: current,
      isSubmitting: false,
      error: null,
    })
  }

  const closeStockModal = () => {
    setStockModal({
      show: false,
      product: null,
      newStock: '',
      expectedStock: 0,
      isSubmitting: false,
      error: null,
    })
  }

  const handleStockSubmit = async (e) => {
    e.preventDefault()
    const { product, newStock, expectedStock } = stockModal

    if (!/^\d+$/.test(newStock.trim())) {
      setStockModal(prev => ({
        ...prev,
        error: 'يرجى إدخال عدد صحيح أكبر من أو يساوي الصفر دون فواصل أو أحرف',
      }))
      return
    }

    const parsed = Number(newStock.trim())
    setStockModal(prev => ({ ...prev, isSubmitting: true, error: null }))

    try {
      await dispatch(
        adjustProductStock({
          id: product.id,
          stock: parsed,
          expectedStock,
          axiosPrivate,
        })
      ).unwrap()

      toast.success(`تم تحديث مخزون "${product.name}" إلى ${parsed} قطعة بنجاح! 📦`)
      closeStockModal()
    } catch (err) {
      const currentLive = err?.currentStock !== undefined ? err.currentStock : null
      const msg = err?.message || 'تعذر تحديث المخزون، قد يكون تغير في هذه الأثناء'
      setStockModal(prev => ({
        ...prev,
        isSubmitting: false,
        error: msg,
        expectedStock: currentLive !== null ? currentLive : prev.expectedStock,
        newStock: currentLive !== null ? String(currentLive) : prev.newStock,
      }))
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
                      onClick={() => openStockModal(product)}
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

      {/* In-App Stock Adjustment Modal (Zero window.prompt dependency) */}
      {stockModal.show && stockModal.product && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(3px)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget && !stockModal.isSubmitting) {
              closeStockModal()
            }
          }}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '24px 28px',
              maxWidth: '440px',
              width: '100%',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
              direction: 'rtl',
              textAlign: 'right',
            }}
          >
            <h3 style={{ margin: '0 0 10px', fontSize: '1.18rem', fontWeight: 800, color: '#1e293b' }}>
              🔢 تعديل مخزون المنتج
            </h3>
            <p style={{ margin: '0 0 16px', fontSize: '0.88rem', color: '#64748b', lineHeight: 1.5 }}>
              المنتج: <strong style={{ color: '#334155' }}>{stockModal.product.name}</strong>
              <br />
              الكمية المسجلة حالياً: <strong style={{ color: '#059669' }}>{stockModal.expectedStock} قطعة</strong>
            </p>

            {stockModal.error && (
              <div
                style={{
                  background: '#fef2f2',
                  border: '1px solid #fecaca',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  color: '#b91c1c',
                  fontSize: '0.84rem',
                  lineHeight: 1.4,
                  marginBottom: 16,
                }}
              >
                ⚠️ {stockModal.error}
              </div>
            )}

            <form onSubmit={handleStockSubmit}>
              <label
                htmlFor="newStockInput"
                style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#334155', marginBottom: 6 }}
              >
                الكمية الجديدة المتوفرة بالمخزون:
              </label>
              <input
                id="newStockInput"
                type="number"
                min="0"
                step="1"
                required
                autoFocus
                disabled={stockModal.isSubmitting}
                value={stockModal.newStock}
                onChange={(e) => setStockModal(prev => ({ ...prev, newStock: e.target.value, error: null }))}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  border: '2px solid #cbd5e1',
                  borderRadius: '10px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  marginBottom: 20,
                  textAlign: 'center',
                }}
              />

              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  disabled={stockModal.isSubmitting}
                  onClick={closeStockModal}
                  style={{
                    padding: '10px 18px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    background: '#f8fafc',
                    color: '#475569',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={stockModal.isSubmitting}
                  style={{
                    padding: '10px 22px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(79, 70, 229, 0.35)',
                  }}
                >
                  {stockModal.isSubmitting ? 'جارٍ الحفظ... ⏳' : '💾 حفظ التعديل'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </StyledTable>
  )
}

export default Table
