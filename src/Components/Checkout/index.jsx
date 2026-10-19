import React, { useState } from 'react'
import { StyledCheckOut } from './styled'
import { useDispatch, useSelector } from 'react-redux'
import { MainButton } from '../../Global/components'
import { SelectIsAuthenticated, selectUser } from '../../redux/reducers/auth'
import { clearCart, resetState, selectCart } from '../../redux/reducers/cart'
import { selectProducts } from '../../redux/reducers/products'
import { selectSocial } from '../../redux/reducers/social'
import { addOrder } from '../../redux/reducers/orders'
import { setStatusFailed, setStatusSucceeded } from '../../redux/reducers/checkout'
import useAxiosPrivate from '../../Hook/useAxiosPrivet'
import PortalCard from '../UI/PortalCard'
import { useNavigate } from 'react-router-dom'
import { openWhatsAppOrder } from '../../utils/whatsappOrder'
import toast from 'react-hot-toast'

const Checkout = ({ cancel }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(selectUser)
  const isAuthenticated = useSelector(SelectIsAuthenticated)
  const cart = useSelector(selectCart)
  const products = useSelector(selectProducts)
  const social = useSelector(selectSocial)
  const axiosPrivate = useAxiosPrivate()

  // Guest inputs state
  const [guestName, setGuestName] = useState('')
  const [guestPhone, setGuestPhone] = useState('')
  const [guestLocation, setGuestLocation] = useState('')

  // Authenticated user location
  const [userLocation, setUserLocation] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const total = cart?.reduce((acc, cartItem) => {
    const foundedItem = products?.find(product => String(product.id) === String(cartItem.productId))
    if (foundedItem) {
      return acc + (foundedItem.price || 0) * (cartItem.quantity || 1)
    }
    return acc
  }, 0)

  // 1. WhatsApp Checkout Handler (Works for both Guests and Logged-In Users)
  const handleWhatsAppCheckout = (e) => {
    if (e) e.preventDefault();

    if (!cart || cart.length === 0) {
      toast.error('سلة المشتريات فارغة!');
      return;
    }

    const customerName = isAuthenticated ? user?.name : guestName;
    const location = isAuthenticated ? userLocation : guestLocation;
    const phone = isAuthenticated ? user?.phone : guestPhone;

    openWhatsAppOrder({
      cart,
      products,
      customerName,
      location,
      phone,
      total,
      social
    });

    // Clear cart after sending to WhatsApp
    if (isAuthenticated) {
      dispatch(clearCart({ axiosPrivate }));
    } else {
      localStorage.removeItem('cart');
    }
    dispatch(resetState());
    dispatch(setStatusSucceeded());
    toast.success('تم تحويل طلبك بنجاح إلى واتساب! 🌸 شكراً لتسوقك من لولو بوتيكات');
    if (cancel) cancel();
  };

  // 2. In-App Backend Order Handler (For Logged-In Users)
  const handleSendOrderInApp = () => {
    if (!userLocation || userLocation.trim().length < 5) {
      setErrorMessage('يرجى كتابة عنوان التوصيل بالتفصيل (5 أحرف على الأقل)');
      dispatch(setStatusFailed({ location: 'Must Add Location!' }));
      return;
    }

    const order = {
      userId: user?.id,
      orders: cart,
      location: userLocation.trim(),
      totalCost: total,
      paid: 0
    };

    dispatch(addOrder({ order, axiosPrivate }));
    dispatch(resetState());
    dispatch(clearCart({ axiosPrivate }));
    dispatch(setStatusSucceeded());
    toast.success('تهانينا 🌸 تم تسجيل طلبك بنجاح وسيتم التواصل معك للتوصيل!');
    if (cancel) cancel();
  };

  return (
    <PortalCard>
      <StyledCheckOut>
        {/* Modal Header */}
        <div className="modalHeader">
          <div className="titleBox">
            <h3>إتمام الطلب 🛍️</h3>
            <p>لولو بوتيكات • عطور ومستحضرات فاخرة</p>
          </div>
          <button type="button" className="closeBtn" onClick={cancel} title="إغلاق">
            ✕
          </button>
        </div>

        {/* Order Summary Pill */}
        <div className="orderSummaryPill">
          <span className="summaryCount">
            عدد العناصر: {cart?.length || 0} منتجات
          </span>
          <span className="summaryTotal">
            المجموع: {total} ₪
          </span>
        </div>

        {!isAuthenticated ? (
          // ================= Guest Checkout Flow =================
          <div>
            {/* Option 1: WhatsApp Instant Checkout */}
            <div className="checkoutOptionCard featured">
              <div className="cardHeader">
                <span className="badgeIcon">💬</span>
                <span className="cardTitle">الطلب السريع عبر واتساب (بدون تسجيل)</span>
                <span className="recommendTag">الموصى به ⚡</span>
              </div>
              <p className="cardDesc">
                أكمل طلبك بنقرة واحدة مباشرة لمحادثة واتساب الرسمية للمتجر، وسيقوم فريقنا بتجهيز وتوصيل طلبك فوراً.
              </p>

              <div className="inputsGroup">
                <input
                  type="text"
                  placeholder="الاسم الكريم (اختياري)"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                />
                <input
                  type="tel"
                  placeholder="رقم الهاتف للتواصل (اختياري)"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  dir="ltr"
                />
                <input
                  type="text"
                  placeholder="المنطقة أو عنوان التوصيل في غزة (اختياري)"
                  value={guestLocation}
                  onChange={(e) => setGuestLocation(e.target.value)}
                />
              </div>

              <button
                type="button"
                className="whatsappSubmitBtn"
                onClick={handleWhatsAppCheckout}
              >
                <span>💬 إرسال الطلب عبر واتساب ({total} ₪)</span>
              </button>
            </div>

            {/* Divider */}
            <div className="orDivider">
              <span>أو</span>
            </div>

            {/* Option 2: Login / Register */}
            <div className="checkoutOptionCard">
              <div className="cardHeader">
                <span className="badgeIcon">👤</span>
                <span className="cardTitle">تسجيل الدخول / حساب جديد</span>
              </div>
              <p className="cardDesc">
                لديك حساب سابق أو ترغب بحفظ طلبياتك ومتابعة حالتها داخل حسابك في المتجر؟
              </p>
              <button
                type="button"
                className="loginRedirectBtn"
                onClick={() => {
                  if (cancel) cancel();
                  navigate('/login');
                }}
              >
                <span>🔑 تسجيل الدخول للمتابعة</span>
              </button>
            </div>
          </div>
        ) : (
          // ================= Authenticated Checkout Flow =================
          <div>
            <div className="userBadge">
              <span>👤</span>
              <span>مرحباً بك، <strong>{user?.name || 'عميلنا العزيز'}</strong></span>
            </div>

            {errorMessage && (
              <div style={{ color: '#ef4444', fontSize: '0.84rem', marginBottom: 10, fontWeight: 700 }}>
                ⚠️ {errorMessage}
              </div>
            )}

            <div className="checkoutOptionCard" style={{ marginBottom: 16 }}>
              <div className="cardHeader">
                <span className="badgeIcon">📍</span>
                <span className="cardTitle">عنوان التوصيل</span>
              </div>
              <div className="inputsGroup" style={{ marginBottom: 14 }}>
                <input
                  type="text"
                  placeholder="اكتب العنوان بالتفصيل (المدينة، الحي، الشارع، علامة مميزة)"
                  value={userLocation}
                  onChange={(e) => {
                    setUserLocation(e.target.value);
                    setErrorMessage('');
                  }}
                />
              </div>

              <MainButton onClick={handleSendOrderInApp}>
                <span>تأكيد الطلب وحفظه في حسابي 🚀</span>
              </MainButton>
            </div>

            <div className="orDivider">
              <span>أو</span>
            </div>

            <button
              type="button"
              className="whatsappSubmitBtn"
              onClick={handleWhatsAppCheckout}
            >
              <span>💬 تأكيد الطلب فوراً عبر واتساب ({total} ₪)</span>
            </button>
          </div>
        )}
      </StyledCheckOut>
    </PortalCard>
  );
};

export default Checkout;