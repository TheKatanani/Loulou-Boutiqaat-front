import { Link } from "react-router-dom"
import { Categories, ContactUs, Favorites, Home, MyOrders, Profile } from "../../Icons"
import Toggle from "../Toggle"
import { MenuStyled } from "./styeld"
import Logo from "../Logo"
import { MainButton } from "../../Global/components"
import { useSelector } from "react-redux"
import { SelectIsAuthenticated } from "../../redux/reducers/auth"
import { selectSocial, selectStatus } from "../../redux/reducers/social"
import { STATUS } from "../../Actions"
import LogoLoading from "../common/LogoLoading"

const Menu = ({ show }) => {
    const isAuthorized = useSelector(SelectIsAuthenticated)
    const social = useSelector(selectSocial)
    const status = useSelector(selectStatus)
    if(status !== STATUS.SUCCEEDED){
        return <LogoLoading/>
    } 
    return (
        <MenuStyled  {...{ show }}>
            <header>
                <Logo />
            </header>
            <ul>
                <li>
                    <Link to="/Home/">
                        <div className="iconArea"><Home /></div>
                        <p>Home</p>
                    </Link>
                </li>
                <li>
                    <Link to="/home/categories">
                        <div className="iconArea"><Categories /></div>
                        <p>Categories</p>
                    </Link>
                </li>
                <li>
                    <Link to="/home/saved">
                        <div className="iconArea"><Favorites /></div>
                        <p>Favorites</p>
                    </Link>
                </li>
                <li>
                    <Link to="/home/cart">
                        <div className="iconArea"><MyOrders /></div>
                        <p>My cart</p>
                    </Link>
                </li>
                <li>
                    <Link to="/home/profile">
                        <div className="iconArea"><Profile /></div>
                        <p>Profile</p>
                    </Link>
                </li>
                <li>
                    {/* contact us WhatsApp */}
                    <Link to={`https://wa.me/${social?.find(el => el?.name === 'whatsApp')?.value || ''}`} target="_blank">
                        <div className="iconArea"><ContactUs /></div>
                        <p>Contact us</p>
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
                                logIn
                            </MainButton>
                        </Link>
                        <Link to="/register">
                            <MainButton>
                                register
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