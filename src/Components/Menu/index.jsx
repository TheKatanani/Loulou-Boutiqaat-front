import { Link } from "react-router-dom"
import { Categories, ContactUs, Favorites, Home, MyCart, MyOrders, Order, Profile } from "../../Icons"
import Toggle from "../Toggle"
import { MenuStyled } from "./styeld"
import Logo from "../Logo"
import { MainButton } from "../../Global/components"
import { useSelector } from "react-redux"
import { SelectIsAuthenticated } from "../../redux/reducers/auth"
import { selectSocial, selectStatus } from "../../redux/reducers/social"
import { STATUS } from "../../Actions"
import LogoLoading from "../common/LogoLoading"
import { selectQuantity } from "../../redux/reducers/cart"

const Menu = ({ show }) => {
    const quantity = useSelector(selectQuantity)
    const isAuthorized = useSelector(SelectIsAuthenticated)
    const social = useSelector(selectSocial)
    const status = useSelector(selectStatus)
    if (status !== STATUS.SUCCEEDED) {
        return <LogoLoading />
    }
    return (
        <MenuStyled  {...{ show }} productLength={quantity}>
            <header>
                <Logo />
            </header>
            <ul>
                <li>
                    <Link to="/Home/">
                        <div className="iconArea"><Home /></div>
                        <p>الصفحة الرئيسية</p>
                    </Link>
                </li>
                <li>
                    <Link to="/home/categories">
                        <div className="iconArea"><Categories /></div>
                        <p>الأقسام</p>
                    </Link>
                </li>
                <li>
                    <Link to="/home/saved">
                        <div className="iconArea"><Favorites /></div>
                        <p>المفضلة</p>
                    </Link>
                </li>
                <li>
                    <Link to="/home/orders">
                        <div className="iconArea"><Order /></div>
                        <p>الطلبات</p>
                    </Link>
                </li>
                <li>
                    <Link to="/home/cart">
                        <div className="iconArea cartIcon"><MyCart /></div>
                        <p>السلة</p>
                    </Link>
                </li>
                <li>
                    <Link to="/home/profile">
                        <div className="iconArea"><Profile /></div>
                        <p>الصفحة الشخصية</p>
                    </Link>
                </li>
                <li>
                    {/* contact us WhatsApp */}
                    <Link to={`https://wa.me/${social?.find(el => el?.name === 'whatsApp')?.value || ''}`} target="_blank">
                        <div className="iconArea"><ContactUs /></div>
                        <p>تواصل معنا</p>
                    </Link>
                </li>
                {/* <li>
                    <Link to="">
                        <div className="iconArea"><About /></div>
                        <p>About</p>
                    </Link>
                </li>  */}
                {
                    !isAuthorized &&
                    <li className="auth">
                        <Link to="/login">
                            <MainButton>
                                تسجيل الدخول
                            </MainButton>
                        </Link>
                        <Link to="/register">
                            <MainButton>
                                انشاء حساب
                            </MainButton>
                        </Link>
                    </li>
                }
                <li><Toggle /></li>
            </ul>
        </MenuStyled>
    )
}

export default Menu