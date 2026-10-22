import React, { useEffect, useState } from 'react';
import { Container } from '../../Global/components';
import MyCart from '../../Components/MyCart';
import Summary from '../../Components/Summary';
import { PageStyled } from './styled';
import Checkout from '../../Components/Checkout';
import { selectOrdersStatus, setStatusIdle } from '../../redux/reducers/orders';
import { useDispatch, useSelector } from 'react-redux';
import { STATUS } from '../../Actions';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ErrorBoundary from '../../Components/common/Errorboundary';
import Alert from '../../Components/common/Alert';
import { selectStatus, setStatusIdle as setCheckoutStatusIdle } from '../../redux/reducers/checkout';
import { cancelActiveReservation, fetchServerDraftStatus } from '../../utils/whatsappOrder';
import toast from 'react-hot-toast';

const Cart = () => {
  const [show, setShow] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orderStatus = useSelector(selectOrdersStatus);
  const checkOutStatus = useSelector(selectStatus);

  // Active reservation banner state
  const [activeReservation, setActiveReservation] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isCancelling, setIsCancelling] = useState(false);

  // 1. Check URL param checkout=1 (from CartDrawer or deep links)
  useEffect(() => {
    if (searchParams.get('checkout') === '1') {
      setShow(true);
    }
  }, [searchParams]);

  // 2. Load and verify active reservation with backend
  useEffect(() => {
    try {
      const raw = localStorage.getItem('lb_active_reservation');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.expiresAt) {
          const diff = Math.max(0, Math.floor((new Date(parsed.expiresAt) - new Date()) / 1000));
          if (diff > 0) {
            setActiveReservation(parsed);
            setTimeLeft(diff);

            // Fetch live draft status from backend
            fetchServerDraftStatus(parsed.id, parsed.secretToken).then((serverDraft) => {
              if (!serverDraft) return;
              if (serverDraft.orderStatus === 'confirmed') {
                toast.success(`تم تأكيد طلبك ${parsed.orderCode} من قبل المتجر بنجاح! 🌸`);
                localStorage.removeItem('lb_active_reservation');
                setActiveReservation(null);
              } else if (serverDraft.orderStatus === 'cancelled' || serverDraft.orderStatus === 'expired') {
                toast('انتهت مهلة هذا الحجز أو تم إلغاؤه', { icon: '⌛' });
                localStorage.removeItem('lb_active_reservation');
                setActiveReservation(null);
              }
            });
          } else {
            localStorage.removeItem('lb_active_reservation');
          }
        }
      }
    } catch (e) {}
  }, []);

  // 3. Countdown timer for active reservation
  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setActiveReservation(null);
          localStorage.removeItem('lb_active_reservation');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const handleCancelReservation = async () => {
    setIsCancelling(true);
    const toastId = toast.loading('جارٍ إلغاء الحجز وإعادة المخزون...');
    const res = await cancelActiveReservation();
    setIsCancelling(false);
    toast.dismiss(toastId);
    if (res && res.success) {
      setActiveReservation(null);
      toast.success('تم إلغاء الحجز بنجاح وأعيدت الكميات للمخزون');
    } else {
      toast.error(res?.error || 'تعذر إلغاء الحجز على الخادم، يرجى المحاولة مجدداً');
    }
  };

  const minutes = timeLeft ? Math.floor(timeLeft / 60) : 0;
  const seconds = timeLeft ? timeLeft % 60 : 0;

  if (orderStatus === STATUS.SUCCEEDED) {
    if (show) {
      setShow(false);
    }
  }

  useEffect(() => {
    dispatch(setStatusIdle());
    dispatch(setCheckoutStatusIdle());
  }, [dispatch]);

  return (
    <PageStyled>
      <Container>
        {/* Persistent WhatsApp Reservation Resume Banner (Independent of Cart State) */}
        {activeReservation && timeLeft > 0 && (
          <div
            style={{
              background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
              border: '1.5px solid #10b981',
              borderRadius: '16px',
              padding: '16px 20px',
              marginBottom: '24px',
              boxShadow: '0 4px 15px rgba(16, 185, 129, 0.12)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '14px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: '#10b981',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  flexShrink: 0,
                }}
              >
                💬
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <strong style={{ color: '#065f46', fontSize: '1.05rem' }}>
                    حجز نشط مؤقت برقم {activeReservation.orderCode}
                  </strong>
                  <span
                    style={{
                      background: '#dcfce7',
                      color: '#166534',
                      padding: '2px 10px',
                      borderRadius: '20px',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                    }}
                  >
                    ⏳ متبقي: {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                  </span>
                </div>
                <p style={{ margin: '4px 0 0', color: '#047857', fontSize: '0.88rem' }}>
                  المنتجات محجوزة لكِ في المخزون. يمكنكِ فتح المحادثة لاستكمال الطلب أو إلغاء الحجز في أي وقت.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              {activeReservation.waUrl && (
                <a
                  href={activeReservation.waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: '#10b981',
                    color: '#fff',
                    padding: '8px 18px',
                    borderRadius: '10px',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span>استئناف في واتساب</span>
                  <span>💬</span>
                </a>
              )}
              <button
                type="button"
                onClick={handleCancelReservation}
                disabled={isCancelling}
                style={{
                  background: '#fee2e2',
                  color: '#b91c1c',
                  border: '1px solid #fca5a5',
                  padding: '8px 14px',
                  borderRadius: '10px',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: isCancelling ? 'not-allowed' : 'pointer',
                }}
              >
                {isCancelling ? 'جارٍ الإلغاء...' : 'إلغاء الحجز وإعادة المخزون'}
              </button>
            </div>
          </div>
        )}

        <div className="cartLayout">
          <section className="cartItemsSection">
            <ErrorBoundary>
              <MyCart />
            </ErrorBoundary>
          </section>

          <aside className="cartSummarySection">
            <ErrorBoundary>
              <Summary {...{ setShow }} />
            </ErrorBoundary>
          </aside>

          {show && (
            <ErrorBoundary>
              <Checkout cancel={() => setShow(false)} />
            </ErrorBoundary>
          )}

          {checkOutStatus === STATUS.SUCCEEDED && (
            <ErrorBoundary>
              <Alert
                cancel={() => {
                  dispatch(setStatusIdle());
                  dispatch(setCheckoutStatusIdle());
                  navigate('/home');
                }}
                link={{
                  path: 'https://wa.me/972597229340',
                  message: 'تواصل معنا لاستلام طلبك عبر واتساب',
                  target: '_blank',
                }}
                message="تهانينا🌸، تم إرسال الطلب بنجاح 🚀"
              />
            </ErrorBoundary>
          )}
        </div>
      </Container>
    </PageStyled>
  );
};

export default Cart;
