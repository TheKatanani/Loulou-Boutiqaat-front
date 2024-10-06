import { Link } from "react-router-dom";
import { MyCart, Order, Orders, Profile } from "../../Icons";
import { SectionsStyle } from "./Styled";
import { useSelector } from "react-redux";
import { selectQuantity } from "../../redux/reducers/cart";
import { SelectIsAuthenticated } from "../../redux/reducers/auth";

const Sections = () => {
  const quantity = useSelector(selectQuantity)
  const isAuthorized = useSelector(SelectIsAuthenticated)
  return (
    <SectionsStyle productLength={quantity}>
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
      <Link to="/home/saved" className="icon">
        <Orders />
        <p>المفضلة</p>
      </Link>
      <Link to="/home/cart" className="icon">
        <MyCart />
        <p>السلة</p>
      </Link>
    </SectionsStyle>
  );
};

export default Sections;
