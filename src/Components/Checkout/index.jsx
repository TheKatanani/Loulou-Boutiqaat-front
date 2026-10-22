import React, { useState, useEffect } from 'react'
import { StyledCheckOut } from './styled'
import { useDispatch, useSelector } from 'react-redux'
import { MainButton } from '../../Global/components'
import { SelectIsAuthenticated, selectUser, selectToken } from '../../redux/reducers/auth'
import { clearCart, resetState, selectCart } from '../../redux/reducers/cart'
import { selectProducts } from '../../redux/reducers/products'
import { selectSocial } from '../../redux/reducers/social'
import { addOrder } from '../../redux/reducers/orders'
import { setStatusFailed, setStatusSucceeded } from '../../redux/reducers/checkout'
import useAxiosPrivate from '../../Hook/useAxiosPrivet'
import PortalCard from '../UI/PortalCard'
import { useNavigate } from 'react-router-dom'
import { openWhatsAppOrder, cancelActiveReservation } from '../../utils/whatsappOrder'
import toast from 'react-hot-toast'

const Checkout = ({ cancel }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(selectUser)
  const isAuthenticated = useSelector(SelectIsAuthenticated)
  const authToken = useSelector(selectToken)
  const cart = useSelector(selectCart)
  const products = useSelector(selectProducts)
  const social = useSelector(selectSocial)
  const axiosPrivate = useAxiosPrivate()

  // Guest inputs state
  const [guestName, setGuestName] = useState('')
  const [guestPhone, setGuestPhone] = useState('')
  const [guestLocation, setGuestLocation] = useState('')

  // Authenticated user location & phone
  const [userLocation, setUserLocation] = useState(user?.location || '')
  const [userPhone, setUserPhone] = useState(user?.phone || '')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [blockedWaUrl, setBlockedWaUrl] = useState('')
  const [activeReservation, setActiveReservation] = useState(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('lb_active_reservation');
      if (raw) {
        const res = JSON.parse(raw);
        if (res?.expiresAt && new Date(res.expiresAt) > new Date()) {
          setActiveReservation(res);
        } else {
          localStorage.removeItem('lb_active_reservation');
        }
      }
    } catch (e) {}
  }, []);

  const total = cart?.reduce((acc, cartItem) => {
    const foundedItem = products?.find(product => String(product.id) === String(cartItem.productId))
    if (foundedItem) {
      return acc + (foundedItem.price || 0) * (cartItem.quantity || 1)
    }
    return acc
  }, 0)

  const handleCancelActiveReservation = async () => {
    setIsSubmitting(true);
    const toastId = toast.loading('جارٍ إلغاء الحجز وإعادة الكميات للمخزون...');
    const res = await cancelActiveReservation();
    setIsSubmitting(false);
    toast.dismiss(toastId);
    if (res && res.success) {
      setActiveReservation(null);
      toast.success('تم إلغاء الحجز بنجاح وأعيدت الكميات للمخزون');
    } else {
      toast.error(res?.error || 'تعذر إلغاء الحجز على الخادم، يرجى التحقق من اتصالك والمحاولة مجدداً');
    }
  };

  // 1. WhatsApp Checkout Handler (Works for both Guests and Logged-In Users)
  const handleWhatsAppCheckout = async (e) => {
    if (e) e.preventDefault();

    if (!cart || cart.length === 0) {
      toast.error('سلة المشتريات فارغة!');
      return;
    }

    const customerName = isAuthenticated ? user?.name : guestName;
    const location = isAuthenticated ? userLocation : guestLocation;
    const phone = isAuthenticated ? (userPhone || user?.phone) : guestPhone;

    // Strict validation
    if (!customerName || customerName.trim().length < 2) {
      setErrorMessage('يرجى كتابة الاسم الكريم (حرفان على الأقل)');
      return;
    }
    if (!phone || phone.trim().length < 9) {
      setErrorMessage('يرجى إدخال رقم هاتف صالح للتواصل والتوصيل');
      return;
    }
    if (!location || location.trim().length < 5) {
      setErrorMessage('يرجى كتابة عنوان التوصيل بالتفصيل (المدينة، الحي، الشارع)');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);
    const toastId = toast.loading('جارٍ حجز المنتجات في المخزون وتجهيز الفاتورة... ⏳');

    const result = await openWhatsAppOrder({
      cart,
      products,
      customerName,
      location,
      phone,
      total,
      social,
      userId: user?.id || null,
      authToken: isAuthenticated ? authToken : null,
    });

    toast.dismiss(toastId);
    setIsSubmitting(false);

    if (result && result.success) {
      // Keep cart intact in Redux & localStorage! Do NOT wipe cart on draft reservation.
      dispatch(setStatusSucceeded());

      if (result.popupBlocked && result.waUrl) {
        setBlockedWaUrl(result.waUrl);
        toast('تم حجز طلبك بنجاح! يرجى النقر على الزر لفتح واتساب', { icon: '💬' });
      } else {
        toast.success(`تم حجز طلبك ${result.orderCode} لمدة 60 دقيقة في المخزون! 🌸`);
        if (cancel) cancel();
      }
    }
  };

  // 2. In-App Backend Order Handler (For Logged-In Users)
  const handleSendOrderInApp = async () => {
    if (!userLocation || userLocation.trim().length < 5) {
      setErrorMessage('يرجى كتابة عنوان التوصيل بالتفصيل (5 أحرف على الأقل)');
      dispatch(setStatusFailed({ location: 'Must Add Location!' }));
      return;
    }

    // Compute web order attempt signature to reuse idempotencyKey on retry
    const sortedItems = [...cart]
      .sort((a, b) => Number(a.productId || a.id) - Number(b.productId || b.id))
      .map((i) => `${Number(i.productId || i.id)}:${Number(i.quantity || 1)}`)
      .join('|');
    const signature = `web::${user?.id || 'auth'}::${userLocation.trim()}::${sortedItems}`;

    let idempotencyKey;
    try {
      const rawPending = sessionStorage.getItem('lb_pending_web_attempt');
      if (rawPending) {
        const pending = JSON.parse(rawPending);
        if (pending.signature === signature && Date.now() - pending.timestamp < 15 * 60 * 1000) {
          idempotencyKey = pending.key;
        }
      }
    } catch (e) {}

    if (!idempotencyKey) {
      idempotencyKey = `web-${user?.id || 'auth'}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      sessionStorage.setItem(
        'lb_pending_web_attempt',
        JSON.stringify({
          key: idempotencyKey,
          signature,
          timestamp: Date.now(),
        })
      );
    }

    const order = {
      userId: user?.id,
      orders: cart,
      location: userLocation.trim(),
      totalCost: total,
      paid: 0,
      customerName: user?.name || '',
      customerPhone: userPhone || user?.phone || '',
      idempotencyKey,
    };

    setIsSubmitting(true);
    const toastId = toast.loading('جارٍ تأكيد الطلب وخصم المخزون... ⏳');

    try {
      const res = await dispatch(addOrder({ order, axiosPrivate })).unwrap();
      sessionStorage.removeItem('lb_pending_web_attempt');
      toast.dismiss(toastId);
      setIsSubmitting(false);

      dispatch(resetState());
      dispatch(clearCart({ axiosPrivate }));
      dispatch(setStatusSucceeded());
      toast.success(`تهانينا 🌸 تم تسجيل طلبك ${res.orderCode || ''} بنجاح وسيتم التواصل معك للتوصيل!`);
      if (cancel) cancel();
    } catch (err) {
      toast.dismiss(toastId);
      setIsSubmitting(false);
      const msg = err?.message || 'تعذر إتمام الطلب، قد تكون بعض المنتجات غير متوفرة بالكمية المطلوبة';
      setErrorMessage(msg);
      toast.error(msg, { duration: 6000 });
    }
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

        {/* Active Reservation Banner (If customer already has an active draft) */}
        {activeReservation && (
          <div style={{
            background: 'linear-gradient(135deg, #fdf4ff 0%, #fae8ff 100%)',
            border: '1px solid #d946ef',
            borderRadius: 12,
            padding: '12px 16px',
            marginBottom: 16,
            direction: 'rtl'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontWeight: 800, color: '#86198f', fontSize: '0.9rem' }}>
                ⏳ لديك حجز نشط حالياً ({activeReservation.orderCode})
              </span>
              <span style={{ fontSize: '0.8rem', color: '#a21caf' }}>
                المجموع: {activeReservation.totalCost} ₪
              </span>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {activeReservation.waUrl && (
                <a
                  href={activeReservation.waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: '#25D366',
                    color: '#fff',
                    padding: '6px 14px',
                    borderRadius: 8,
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    textDecoration: 'none'
                  }}
                >
                  💬 فتح واتساب للطلب
                </a>
              )}
              <button
                type="button"
                onClick={handleCancelActiveReservation}
                disabled={isSubmitting}
                style={{
                  background: '#ef4444',
                  color: '#fff',
                  border: 'none',
                  padding: '6px 14px',
                  borderRadius: 8,
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                إلغاء هذا الحجز
              </button>
            </div>
          </div>
        )}

        {/* Popup Blocked Fallback */}
        {blockedWaUrl && (
          <div style={{
            background: '#ecfdf5',
            border: '1px solid #10b981',
            borderRadius: 12,
            padding: '14px',
            marginBottom: 16,
            textAlign: 'center',
            direction: 'rtl'
          }}>
            <p style={{ fontWeight: 800, color: '#065f46', marginBottom: 8 }}>
              ✅ تم حجز المنتجات بنجاح في المخزون!
            </p>
            <a
              href={blockedWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => { if (cancel) cancel(); }}
              style={{
                display: 'inline-block',
                background: '#25D366',
                color: '#fff',
                padding: '10px 20px',
                borderRadius: 8,
                fontSize: '0.92rem',
                fontWeight: 700,
                textDecoration: 'none'
              }}
            >
              💬 اضغط هنا لفتح محادثة واتساب الرسمية
            </a>
          </div>
        )}

        {/* Order Summary Pill */}
        <div className="orderSummaryPill">
          <span className="summaryCount">
            عدد العناصر: {cart?.length || 0} منتجات
          </span>
          <span className="summaryTotal">
            المجموع: {total} ₪
          </span>
        </div>

        {errorMessage && (
          <div style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: 12, fontWeight: 700, direction: 'rtl' }}>
            ⚠️ {errorMessage}
          </div>
        )}

        {!isAuthenticated ? (
          // ================= Guest Checkout Flow =================
          <div>
            {/* Option 1: WhatsApp Instant Checkout */}
            <div className="checkoutOptionCard featured">
              <div className="cardHeader">
                <span className="badgeIcon">💬</span>
                <span className="cardTitle">الطلب السريع عبر واتساب (حجز فوري 60 دقيقة)</span>
                <span className="recommendTag">الموصى به ⚡</span>
              </div>
              <p className="cardDesc">
                حجز فوري للكمية من المخزون لمدة 60 دقيقة وإرسال الفاتورة الرسمية عبر واتساب، وسيقوم فريقنا بتجهيز وتوصيل طلبك فوراً.
              </p>

              <div className="inputsGroup">
                <input
                  type="text"
                  placeholder="الاسم الكريم (مطلوب) *"
                  value={guestName}
                  onChange={(e) => { setGuestName(e.target.value); setErrorMessage(''); }}
                  disabled={isSubmitting}
                  required
                />
                <input
                  type="tel"
                  placeholder="رقم الهاتف للتواصل (مطلوب) *"
                  value={guestPhone}
                  onChange={(e) => { setGuestPhone(e.target.value); setErrorMessage(''); }}
                  dir="ltr"
                  disabled={isSubmitting}
                  required
                />
                <input
                  type="text"
                  placeholder="المنطقة أو عنوان التوصيل في غزة (مطلوب) *"
                  value={guestLocation}
                  onChange={(e) => { setGuestLocation(e.target.value); setErrorMessage(''); }}
                  disabled={isSubmitting}
                  required
                />
              </div>

              <button
                type="button"
                className="whatsappSubmitBtn"
                onClick={handleWhatsAppCheckout}
                disabled={isSubmitting}
                style={{ opacity: isSubmitting ? 0.7 : 1 }}
              >
                <span>{isSubmitting ? 'جارٍ الحجز والتجهيز... ⏳' : `💬 إرسال وحجز الطلب عبر واتساب (${total} ₪)`}</span>
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

            <div className="checkoutOptionCard" style={{ marginBottom: 16 }}>
              <div className="cardHeader">
                <span className="badgeIcon">📍</span>
                <span className="cardTitle">بيانات التوصيل والتأكيد</span>
              </div>
              <div className="inputsGroup" style={{ marginBottom: 14 }}>
                <input
                  type="tel"
                  placeholder="رقم الهاتف للتواصل للتوصيل *"
                  value={userPhone}
                  onChange={(e) => { setUserPhone(e.target.value); setErrorMessage(''); }}
                  dir="ltr"
                  disabled={isSubmitting}
                  required
                />
                <input
                  type="text"
                  placeholder="اكتب العنوان بالتفصيل (المدينة، الحي، الشارع، علامة مميزة) *"
                  value={userLocation}
                  onChange={(e) => {
                    setUserLocation(e.target.value);
                    setErrorMessage('');
                  }}
                  disabled={isSubmitting}
                  required
                />
              </div>

              <MainButton onClick={handleSendOrderInApp} disabled={isSubmitting}>
                <span>{isSubmitting ? 'جارٍ تأكيد الطلب... ⏳' : 'تأكيد الطلب وحفظه في حسابي 🚀'}</span>
              </MainButton>
            </div>

            <div className="orDivider">
              <span>أو</span>
            </div>

            <button
              type="button"
              className="whatsappSubmitBtn"
              onClick={handleWhatsAppCheckout}
              disabled={isSubmitting}
              style={{ opacity: isSubmitting ? 0.7 : 1 }}
            >
              <span>{isSubmitting ? 'جارٍ الحجز والتجهيز... ⏳' : `💬 حجز وتأكيد فوراً عبر واتساب (${total} ₪)`}</span>
            </button>
          </div>
        )}
      </StyledCheckOut>
    </PortalCard>
  );
};

export default Checkout;
