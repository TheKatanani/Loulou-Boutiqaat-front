import React from 'react'
import { MainButton } from '../../Global/components'
import { SummaryStyled } from './styled'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, resetState, selectCart } from '../../redux/reducers/cart'
import { selectProducts } from '../../redux/reducers/products'
import { selectSocial } from '../../redux/reducers/social'
import { SelectIsAuthenticated, selectUser } from '../../redux/reducers/auth'
import useAxiosPrivate from '../../Hook/useAxiosPrivet'
import { openWhatsAppOrder } from '../../utils/whatsappOrder'
import toast from 'react-hot-toast'

const Summary = ({ setShow }) => {
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCart)
  const products = useSelector(selectProducts)
  const social = useSelector(selectSocial)
  const isAuthenticated = useSelector(SelectIsAuthenticated)
  const user = useSelector(selectUser)
  const axiosPrivate = useAxiosPrivate()

  const total = cartItems?.reduce((acc, cartItem) => {
    const foundedItem = products?.find(product => String(product.id) === String(cartItem.productId))
    if (foundedItem) {
      return acc + (foundedItem.price || 0) * (cartItem.quantity || 1)
    }
    return acc
  }, 0)

  const hasItems = cartItems && cartItems.length > 0

  const handleQuickWhatsApp = () => {
    if (!hasItems) return

    openWhatsAppOrder({
      cart: cartItems,
      products,
      customerName: user?.name || '',
      phone: user?.phone || '',
      location: user?.location || '',
      total,
      social
    })

    if (isAuthenticated) {
      dispatch(clearCart({ axiosPrivate }))
    } else {
      localStorage.removeItem('cart')
    }
    dispatch(resetState())
    toast.success('تم تحويل طلبك بنجاح إلى واتساب! 🌸 شكراً لتسوقك من لولو بوتيكات')
  }

  return (
    <SummaryStyled>
      <div className="total">
        <p>المجموع:</p>
        <p>{total}₪</p>
      </div>

      <MainButton
        disabled={!hasItems}
        onClick={() => {
          if (hasItems) {
            setShow(true)
          }
        }}
      >
        <span>إتمام الطلب 🛍️</span>
      </MainButton>

      <button
        type="button"
        className="quickWaSummaryBtn"
        disabled={!hasItems}
        onClick={handleQuickWhatsApp}
        title="طلب فوري ومباشر عبر واتساب بدون تسجيل"
      >
        <span>💬 طلب سريع عبر واتساب</span>
      </button>
    </SummaryStyled>
  )
}

export default Summary