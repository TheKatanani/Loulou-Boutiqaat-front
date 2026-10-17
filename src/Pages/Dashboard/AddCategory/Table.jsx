import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCategory, selectCategories, selectCategoriesFormData, selectMood, setUpdateCategory } from '../../../redux/reducers/categories'
import { StyledTable } from '../sytled'
import { MOOD, ROLES } from '../../../Actions'
import useAxiosPrivate from '../../../Hook/useAxiosPrivet'
import { selectProducts } from '../../../redux/reducers/products'
import Alert from '../../../Components/common/Alert'
import { selectUser } from '../../../redux/reducers/auth'
import { Link } from 'react-router-dom'

const Table = () => {
  const [message, setMessage] = useState()
  const [isAlert, setIsAlert] = useState(false)
  const categories = useSelector(selectCategories)
  const products = useSelector(selectProducts)
  const dispatch = useDispatch()
  const { id } = useSelector(selectCategoriesFormData)
  const axiosPrivate = useAxiosPrivate()
  const mood = useSelector(selectMood)
  const user = useSelector(selectUser)

  const handleCancellation = () => {
    setIsAlert(false)
    setMessage('')
  }

  const handelDelete = (category) => {
    const categoryProducts = products.reduce((count, item) => {
      if (item?.categoryId === category.id) {
        return ++count
      }
      return count
    }, 0)

    if (categoryProducts > 0) {
      setMessage(`لا يمكنك حذف هذا القسم لأنه يحتوي على (${categoryProducts}) من المنتجات المتاحة. يجب نقل المنتجات أو حذفها أولاً.`)
      setIsAlert(true)
    } else {
      if (window.confirm(`هل أنت متأكد من حذف القسم: "${category.name}"؟`)) {
        dispatch(deleteCategory({ id: category.id, axiosPrivate }))
      }
    }
  }

  return (
    <StyledTable>
      <table>
        <thead>
          <tr>
            <th className='id'>#</th>
            <th>اسم القسم</th>
            <th className='description'>الوصف</th>
            <th>غلاف القسم</th>
            <th>الحالة</th>
            <th>المنتجات التابعة</th>
            <th>تعديل</th>
            {user?.role === ROLES.ADMIN && <th>حذف</th>}
          </tr>
        </thead>
        <tbody>
          {categories?.map((category) => {
            const productCount = products.reduce((prev, curre) => (curre.categoryId === category.id ? prev + 1 : prev), 0);
            return (
              <tr 
                key={category?.id} 
                className={(mood === MOOD.UPDATE && category.id === id) ? `underUpdate` : undefined}
              >
                <td className='id'><strong>#{category?.id}</strong></td>
                <td><strong>{category?.name}</strong></td>
                <td className='description' style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {category.description ? `${category.description.slice(0, 45)}...` : '-'}
                </td>
                <td className='images'>
                  {category?.background && (
                    <img loading="lazy" src={category.background} alt={category.name} />
                  )}
                </td>
                <td>
                  <span className={`statusBadge ${category?.published ? 'published' : 'unpublished'}`}>
                    {category?.published ? '● منشور' : '○ مخفي'}
                  </span>
                </td>
                <td>
                  <Link 
                    to={`${category.id}`} 
                    style={{ 
                      padding: '4px 12px', 
                      borderRadius: 12, 
                      background: 'rgba(109, 40, 217, 0.08)', 
                      color: '#6d28d9', 
                      fontWeight: 700, 
                      fontSize: '0.84rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4
                    }}
                  >
                    <span>📦</span>
                    <span>{productCount} منتج</span>
                  </Link>
                </td>
                <td>
                  <button 
                    type="button"
                    className='update'
                    disabled={mood === MOOD.UPDATE && category?.id === id}
                    onClick={() => dispatch(setUpdateCategory({ category }))}
                  >
                    ✏️ تعديل
                  </button>
                </td>
                {user?.role === ROLES.ADMIN && (
                  <td>
                    <button 
                      type="button"
                      className='delete' 
                      disabled={mood === MOOD.UPDATE && category?.id === id}
                      onClick={() => handelDelete(category)}
                    >
                      🗑️ حذف
                    </button>
                  </td>
                )}
                {isAlert && (
                  <Alert 
                    message={message} 
                    link={{ path: `/dashboard/addcategory/${category.id}`, message: 'عرض المنتجات التابعة' }} 
                    cancel={handleCancellation} 
                  />
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