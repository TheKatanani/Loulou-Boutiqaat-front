import { Link } from "react-router-dom";
import { MyCart, Order, Orders, Profile } from "../../Icons";
import { SectionsStyle } from "./Styled";
import { useDispatch, useSelector } from "react-redux";
import { openCartDrawer, selectQuantity } from "../../redux/reducers/cart";
import { selectsaved } from "../../redux/reducers/saved";
import { SelectIsAuthenticated } from "../../redux/reducers/auth";

import { useContext } from "react";
import { ThemeContext } from "../../Context";
import { darkTheme, lightTheme } from "../../Global/theme";

const Sections = () => {
  const dispatch = useDispatch();
  const [theme, setTheme] = useContext(ThemeContext);
  const quantity = useSelector(selectQuantity);
  const saved = useSelector(selectsaved);
  const isAuthorized = useSelector(SelectIsAuthenticated);

  const toggleTheme = () => {
    const nextTheme = theme.theme === 'light' ? darkTheme : lightTheme;
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme.theme);
  };

  return (
    <SectionsStyle productLength={quantity} savedLength={saved?.length || 0}>
      <button
        type="button"
        className="icon themeToggle"
        onClick={toggleTheme}
        title={theme.theme === 'light' ? 'الوضع الليلي' : 'الوضع النهاري'}
      >
        <span className="themeEmoji">{theme.theme === 'light' ? '🌙' : '☀️'}</span>
        <p>{theme.theme === 'light' ? 'داكن' : 'فاتح'}</p>
      </button>
      {/* set it wen the user has profile */}
      {
        isAuthorized &&
        <Link to="/home/profile" className="icon">
          <Profile />
          <p>الصفحة الشخصية</p>
        </Link>
      } 
      <Link to="/home/orders" className="icon">
        <Order />
        <p>الطلبات</p>
      </Link>
      <Link to="/home/saved" className="icon savedLink">
        <Orders />
        <p>المفضلة</p>
      </Link>
      <div
        className="icon cartLink"
        onClick={() => dispatch(openCartDrawer())}
        role="button"
        tabIndex={0}
        title="فتح سلة المشتريات"
        style={{ cursor: 'pointer' }}
      >
        <MyCart />
        <p>السلة</p>
      </div>
    </SectionsStyle>
  );
};

export default Sections;
