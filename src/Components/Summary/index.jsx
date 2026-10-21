import React from 'react';
import { SummaryStyled } from './styled';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, resetState, selectCart } from '../../redux/reducers/cart';
import { selectProducts } from '../../redux/reducers/products';
import { selectSocial } from '../../redux/reducers/social';
import { SelectIsAuthenticated, selectUser } from '../../redux/reducers/auth';
import useAxiosPrivate from '../../Hook/useAxiosPrivet';
import { openWhatsAppOrder } from '../../utils/whatsappOrder';
import toast from 'react-hot-toast';

const Summary = ({ setShow }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCart) || [];
  const products = useSelector(selectProducts) || [];
  const social = useSelector(selectSocial);
  const isAuthenticated = useSelector(SelectIsAuthenticated);
  const user = useSelector(selectUser);
  const axiosPrivate = useAxiosPrivate();

  const total = cartItems.reduce((acc, cartItem) => {
    const foundedItem = products.find((product) => String(product.id) === String(cartItem.productId));
    if (foundedItem) {
      return acc + (foundedItem.price || 0) * (cartItem.quantity || 1);
    }
    return acc;
  }, 0);

  const hasItems = cartItems && cartItems.length > 0;

  const handleQuickWhatsApp = () => {
    if (!hasItems) return;

    openWhatsAppOrder({
      cart: cartItems,
      products,
      customerName: user?.name || '',
      phone: user?.phone || '',
      location: user?.location || '',
      total,
      social,
    });

    if (isAuthenticated) {
      dispatch(clearCart({ axiosPrivate }));
    } else {
      localStorage.removeItem('cart');
    }
    dispatch(resetState());
    toast.success('تم تحويل طلبك بنجاح إلى واتساب! 🌸 شكراً لتسوقك من لولو بوتيكات');
  };

  return (
    <SummaryStyled>
      <h3 className="summaryTitle">
        <span>📋</span>
        <span>ملخص الطلب</span>
      </h3>

      <ul className="info">
        <li>
          <p>مجموع المنتجات</p>
          <p>{total} ₪</p>
        </li>
        <li>
          <p>رسوم التوصيل</p>
          <p className="freeDelivery">
            <span>مجاني لكافة مناطق غزة ✨</span>
          </p>
        </li>
        <li>
          <p>طريقة الدفع</p>
          <p>الدفع عند الاستلام 💵</p>
        </li>
      </ul>

      <div className="totalRow">
        <span className="totalLabel">المجموع النهائي:</span>
        <span className="totalAmount">{total} ₪</span>
      </div>

      <div className="actionsBox">
        <button
          type="button"
          className="mainCheckoutBtn"
          disabled={!hasItems}
          onClick={() => {
            if (hasItems) {
              setShow(true);
            }
          }}
        >
          <span>إتمام الطلب (Checkout) 🛍️</span>
        </button>

        <button
          type="button"
          className="quickWaSummaryBtn"
          disabled={!hasItems}
          onClick={handleQuickWhatsApp}
          title="طلب فوري ومباشر عبر واتساب بدون تسجيل"
        >
          <span>💬 طلب سريع عبر واتساب</span>
        </button>
      </div>

      <div className="trustPerks">
        <div className="perkItem">
          <span className="perkIcon">🛡️</span>
          <span>ضمان استرجاع واستبدال فوري</span>
        </div>
        <div className="perkItem">
          <span className="perkIcon">🚀</span>
          <span>توصيل سريع وآمن حتى باب بيتك</span>
        </div>
        <div className="perkItem">
          <span className="perkIcon">🌸</span>
          <span>منتجات أصلية ومضمونة 100%</span>
        </div>
      </div>
    </SummaryStyled>
  );
};

export default Summary;
