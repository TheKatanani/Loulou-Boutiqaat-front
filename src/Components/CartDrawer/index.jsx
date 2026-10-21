import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  clearCart,
  closeCartDrawer,
  quantityCartItem,
  quantityCartItemLocal,
  removeFromCart,
  removeFromCartLocal,
  resetState,
  selectCart,
  selectIsDrawerOpen,
  selectQuantity,
} from '../../redux/reducers/cart';
import { selectPublishedProducts } from '../../redux/reducers/products';
import { SelectIsAuthenticated, selectUser } from '../../redux/reducers/auth';
import { selectSocial } from '../../redux/reducers/social';
import { openWhatsAppOrder } from '../../utils/whatsappOrder';
import useAxiosPrivate from '../../Hook/useAxiosPrivet';
import { DrawerContainer, DrawerOverlay } from './styled';
import { OPERATOR } from '../../Actions';
import toast from 'react-hot-toast';

const CartDrawer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isOpen = useSelector(selectIsDrawerOpen);
  const cart = useSelector(selectCart) || [];
  const quantity = useSelector(selectQuantity) || 0;
  const products = useSelector(selectPublishedProducts) || [];
  const isAuthenticated = useSelector(SelectIsAuthenticated);
  const user = useSelector(selectUser);
  const social = useSelector(selectSocial);
  const axiosPrivate = useAxiosPrivate();
  const [isReserving, setIsReserving] = useState(false);

  // Close on Escape key and lock body scroll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        dispatch(closeCartDrawer());
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, dispatch]);

  const total = cart.reduce((acc, cartItem) => {
    const prod = products.find((p) => String(p.id) === String(cartItem.productId));
    return acc + (prod?.price || 0) * (cartItem.quantity || 1);
  }, 0);

  const handleRemove = (productId) => {
    if (isAuthenticated) {
      dispatch(removeFromCart({ productId, axiosPrivate }));
    } else {
      dispatch(removeFromCartLocal({ productId }));
    }
  };

  const handleQuantity = (productId, operator) => {
    if (isAuthenticated) {
      dispatch(quantityCartItem({ productId, operator, axiosPrivate }));
    } else {
      dispatch(quantityCartItemLocal({ productId, operator }));
    }
  };

  const handleQuickWhatsApp = async () => {
    if (!cart || cart.length === 0) return;
    setIsReserving(true);
    const toastId = toast.loading('جارٍ حجز المنتجات وتجهيز واتساب... ⏳');

    const result = await openWhatsAppOrder({
      cart,
      products,
      customerName: isAuthenticated ? user?.name : '',
      location: '',
      phone: isAuthenticated ? user?.phone : '',
      total,
      social,
      userId: user?.id || null,
    });

    toast.dismiss(toastId);
    setIsReserving(false);

    if (result && result.success) {
      if (isAuthenticated) {
        dispatch(clearCart({ axiosPrivate }));
      } else {
        localStorage.removeItem('cart');
      }
      dispatch(resetState());
      dispatch(closeCartDrawer());

      if (result.orderCode) {
        toast.success(`تم حجز طلبك ${result.orderCode} لمدة 60 دقيقة في المخزون! 🌸`);
      } else {
        toast.success('تم تحويل طلبك بنجاح إلى واتساب! 🌸');
      }
    }
  };

  const handleViewFullCart = () => {
    dispatch(closeCartDrawer());
    navigate('/home/cart');
  };

  return (
    <>
      <DrawerOverlay isOpen={isOpen} onClick={() => dispatch(closeCartDrawer())} />
      <DrawerContainer isOpen={isOpen}>
        {/* Header */}
        <div className="drawerHeader">
          <div className="headerTitle">
            <h3>سلة المشتريات</h3>
            <span className="badge">{quantity}</span>
          </div>
          <button
            type="button"
            className="closeBtn"
            onClick={() => dispatch(closeCartDrawer())}
            aria-label="إغلاق السلة"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="drawerBody">
          {cart.length === 0 ? (
            <div className="emptyState">
              <span className="emptyIcon">🛍️</span>
              <h4>سلتك فارغة حالياً</h4>
              <p>تصفح أرقى العطور الشرقية ومستحضرات التجميل والأزياء الفاخرة</p>
              <button
                type="button"
                className="shopBtn"
                onClick={() => {
                  dispatch(closeCartDrawer());
                  navigate('/home');
                }}
              >
                تصفح المنتجات ✨
              </button>
            </div>
          ) : (
            <div className="itemsList">
              {cart.map((cartItem) => {
                const prod = products.find((p) => String(p.id) === String(cartItem.productId));
                if (!prod) return null;

                const images = Array.isArray(prod.images) ? prod.images : [prod.images];
                const mainImg = images[0] || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400';

                return (
                  <div key={prod.id} className="drawerItem">
                    <div className="itemImg">
                      <img src={mainImg} alt={prod.name} loading="lazy" />
                    </div>
                    <div className="itemInfo">
                      <div className="itemTop">
                        <h4 className="itemTitle">{prod.name}</h4>
                        <button
                          type="button"
                          className="deleteItemBtn"
                          onClick={() => handleRemove(prod.id)}
                          title="حذف المنتج"
                        >
                          🗑️
                        </button>
                      </div>
                      <div className="itemBottom">
                        <span className="itemPrice">{(prod.price || 0) * (cartItem.quantity || 1)} ₪</span>
                        <div className="qtyPill">
                          <button
                            type="button"
                            onClick={() => handleQuantity(prod.id, OPERATOR.INCREASE)}
                            aria-label="زيادة"
                          >
                            +
                          </button>
                          <span>{cartItem.quantity || 1}</span>
                          <button
                            type="button"
                            onClick={() => handleQuantity(prod.id, OPERATOR.DECREASE)}
                            aria-label="إنقاص"
                          >
                            -
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="drawerFooter">
            <div className="deliveryNote">
              <span>🚚</span>
              <span>توصيل سريع لكافة مناطق قطاع غزة | الدفع عند الاستلام</span>
            </div>

            <div className="subtotalRow">
              <span>المجموع الكلي:</span>
              <span className="totalPrice">{total} ₪</span>
            </div>

            <div className="footerActions">
              <button
                type="button"
                className="waQuickBtn"
                onClick={handleQuickWhatsApp}
                disabled={isReserving}
                style={{ opacity: isReserving ? 0.7 : 1 }}
                title="حجز المنتجات والطلب المباشر عبر واتساب"
              >
                <span>💬</span>
                <span>{isReserving ? 'جارٍ الحجز والتجهيز... ⏳' : 'طلب سريع عبر واتساب'}</span>
              </button>

              <button
                type="button"
                className="fullCheckoutBtn"
                onClick={handleViewFullCart}
              >
                <span>عرض السلة وإتمام الطلب 🛍️</span>
              </button>
            </div>
          </div>
        )}
      </DrawerContainer>
    </>
  );
};

export default CartDrawer;
