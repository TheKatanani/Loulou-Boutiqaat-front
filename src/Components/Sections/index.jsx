import { Link } from "react-router-dom";
import { MyCart, Orders, Profile } from "../../Icons";
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
          <p>Profile</p>
        </Link>
      }
      {/* <Link to="/page2" className="icon">
        <Message />
        <p>Message</p>
      </Link> */}
      <Link to="/home/saved" className="icon">
        <Orders />
        <p>Orders</p>
      </Link>
      <Link to="/home/cart" className="icon">
        <MyCart />
        <p>My cart</p>
      </Link>
    </SectionsStyle>
  );
};

export default Sections;
