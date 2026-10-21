import React from 'react';
import { MyCartItemStyled } from './styled';
import { Link } from 'react-router-dom';
import { quantityCartItem, quantityCartItemLocal, removeFromCart, removeFromCartLocal } from '../../redux/reducers/cart';
import { useDispatch, useSelector } from 'react-redux';
import { addToSaved, addTosavedLocal, removeFromSaved, removeFromsavedLocal, selectsaved } from '../../redux/reducers/saved';
import { SelectIsAuthenticated } from '../../redux/reducers/auth';
import { OPERATOR } from '../../Actions';
import useAxiosPrivate from '../../Hook/useAxiosPrivet';
import toast from 'react-hot-toast';

const MyCartItem = ({ itemQuantity = 1, data: { images, name, price = 0, id } }) => {
  const dispatch = useDispatch();
  const saved = useSelector(selectsaved) || [];
  const isAuthenticated = useSelector(SelectIsAuthenticated);
  const axiosPrivate = useAxiosPrivate();

  const foundedSaved = saved.find((el) => String(el) === String(id));
  const isInSaved = Boolean(foundedSaved);

  const imageList = Array.isArray(images) ? images : [images];
  const mainImg = imageList[0] || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400';

  const handleRemove = () => {
    if (isAuthenticated) {
      dispatch(removeFromCart({ productId: id, axiosPrivate }));
    } else {
      dispatch(removeFromCartLocal({ productId: id }));
    }
    toast('تمت إزالة المنتج من السلة', { icon: '🗑️' });
  };

  const handleQuantity = (operator) => {
    if (isAuthenticated) {
      dispatch(quantityCartItem({ productId: id, operator, axiosPrivate }));
    } else {
      dispatch(quantityCartItemLocal({ productId: id, operator }));
    }
  };

  const handleToggleSaved = () => {
    if (isAuthenticated) {
      if (!isInSaved) {
        dispatch(addToSaved({ productId: id, axiosPrivate }));
        toast.success('تمت إضافة المنتج إلى المفضلة ❤️');
      } else {
        dispatch(removeFromSaved({ productId: id, axiosPrivate }));
        toast('تمت إزالة المنتج من المفضلة', { icon: '🤍' });
      }
    } else {
      if (!isInSaved) {
        dispatch(addTosavedLocal({ productId: id }));
        toast.success('تمت إضافة المنتج إلى المفضلة ❤️');
      } else {
        dispatch(removeFromsavedLocal({ productId: id }));
        toast('تمت إزالة المنتج من المفضلة', { icon: '🤍' });
      }
    }
  };

  return (
    <MyCartItemStyled>
      <div className="mainInfo">
        <Link to={`/home/products/${id}`} className="imgBox">
          <img src={mainImg} alt={name} loading="lazy" />
        </Link>
        <div className="textBox">
          <Link to={`/home/products/${id}`} className="itemTitle">
            {name}
          </Link>
          <span className="unitPrice">{price} ₪ للقطعة الواحدة</span>
          <div className="actionButtons">
            <button type="button" className="deleteBtn" onClick={handleRemove}>
              <span>🗑️</span>
              <span>حذف</span>
            </button>
            <button type="button" className="saveBtn" onClick={handleToggleSaved}>
              <span>{isInSaved ? '❤️ في المفضلة' : '🤍 إضافة للمفضلة'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="pricingAndQuantity">
        <div className="qtyPill">
          <button
            type="button"
            onClick={() => handleQuantity(OPERATOR.INCREASE)}
            aria-label="زيادة الكمية"
          >
            +
          </button>
          <span className="quantityValue">{itemQuantity}</span>
          <button
            type="button"
            onClick={() => handleQuantity(OPERATOR.DECREASE)}
            aria-label="إنقاص الكمية"
          >
            -
          </button>
        </div>

        <div className="subtotalBox">
          <span className="subtotalPrice">{price * itemQuantity} ₪</span>
          <span className="calcDetail">
            ({itemQuantity} × {price} ₪)
          </span>
        </div>
      </div>
    </MyCartItemStyled>
  );
};

export default MyCartItem;
