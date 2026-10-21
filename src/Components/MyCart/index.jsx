import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Arrow } from '../../Icons';
import MyCartItem from '../MyCartItem';
import { MyCartStyled } from './styled';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, resetState as resetCartState, selectCart, selectQuantity } from '../../redux/reducers/cart';
import { selectPublishedProducts } from '../../redux/reducers/products';
import { SelectIsAuthenticated, selectUser } from '../../redux/reducers/auth';
import useAxiosPrivate from '../../Hook/useAxiosPrivet';
import toast from 'react-hot-toast';

const MyCart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const quantity = useSelector(selectQuantity) || 0;
  const cart = useSelector(selectCart) || [];
  const products = useSelector(selectPublishedProducts) || [];
  const user = useSelector(selectUser);
  const userId = user?.id;
  const isAuthenticated = useSelector(SelectIsAuthenticated);
  const axiosPrivate = useAxiosPrivate();

  const handleClearCart = () => {
    if (cart.length === 0) return;
    if (window.confirm('هل أنت متأكد من رغبتك في إفراغ السلة؟')) {
      if (isAuthenticated && userId) {
        dispatch(clearCart({ userId, axiosPrivate }));
      } else {
        localStorage.removeItem('cart');
        dispatch(resetCartState());
      }
      toast.success('تم إفراغ السلة بنجاح');
    }
  };

  const dataCart = cart.map((cartItem) => {
    const foundedItem = products.find((product) => String(product?.id) === String(cartItem?.productId));
    if (foundedItem) {
      return <MyCartItem key={foundedItem.id} data={foundedItem} itemQuantity={cartItem.quantity || 1} />;
    }
    return null;
  });

  return (
    <MyCartStyled>
      <div className="cartHeaderBox">
        <h3>
          <span>🛒 منتجات السلة</span>
          <span className="countPill">{quantity} منتج</span>
        </h3>
      </div>

      <div className="cartCard">
        <div className="items">
          {quantity > 0 ? (
            dataCart
          ) : (
            <div className="emptyBox">
              <span className="emptyEmoji">🛍️</span>
              <h4>سلتك فارغة حالياً</h4>
              <p>تصفح تشكيلة العطور ومستحضرات التجميل وأضف ما يعجبك للسلة</p>
            </div>
          )}
        </div>

        <div className="cartFooterActions">
          <button type="button" className="backBtn" onClick={() => navigate('/home')}>
            <Arrow />
            <span>متابعة التسوق</span>
          </button>

          {quantity > 0 && (
            <button type="button" className="clearBtn" onClick={handleClearCart}>
              <span>🗑️ إفراغ السلة بالكامل</span>
            </button>
          )}
        </div>
      </div>
    </MyCartStyled>
  );
};

export default MyCart;
