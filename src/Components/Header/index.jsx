import React, { useState } from 'react'
import { useContext } from 'react'
import { ThemeContext } from '../../Context'
import { darkTheme, lightTheme } from '../../Global/theme'
import { Container } from '../../Global/components'
import { Menu3 } from '../../Icons'
import Category from '../Category'
import Logo from '../Logo'
import Menu from '../Menu'
import Search from '../Search'
import Sections from '../Sections'
import { StyledHeader } from './styles'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { SelectIsAuthenticated, handleLogout, selectUser } from '../../redux/reducers/auth'
import { resetState as resetCartState } from '../../redux/reducers/cart'
import { resetState as resetSavedState } from '../../redux/reducers/saved'
import { ROLES } from '../../Actions'
import toast from 'react-hot-toast'

const Header = () => {
  const [show, setShow] = useState(false)
  const isAuthorized = useSelector(SelectIsAuthenticated)
  const user = useSelector(selectUser)
  const [theme, setTheme] = useContext(ThemeContext)
  const dispatch = useDispatch()

  const toggleTheme = () => {
    const isLight = theme.theme === 'light';
    const nextTheme = isLight ? darkTheme : lightTheme;
    setTheme(nextTheme);
    try {
      localStorage.setItem('theme', nextTheme.theme);
    } catch (e) {
      console.error(e);
    }
  };

  const onLogout = () => {
    dispatch(handleLogout())
    dispatch(resetCartState())
    dispatch(resetSavedState())
    toast.success('تم تسجيل الخروج بنجاح')
  }

  return (
    <StyledHeader>
      <div className="topAnnouncement">
        <span>✨ توصيل فوري لكافة مناطق قطاع غزة | منتجات أصلية ومضمونة 100% | للطلب والاستفسار عبر واتساب: 0597229340 🛍️</span>
      </div>
      <Container>
        <div className="mainRow">
          <div className='logoBox'>
            <div className="menu" onClick={() => setShow(true)}>
              <Menu3 color={theme.palette.font} />
            </div>
            <Link to='/'>
              <Logo />
            </Link>
          </div>
          <Search isOnChangeRequest={true} />
          <button
            type="button"
            className="mobileThemeToggle"
            onClick={toggleTheme}
            aria-label="تبديل الوضع"
            title={theme.theme === 'light' ? 'الوضع الليلي' : 'الوضع النهاري'}
          >
            <span>{theme.theme === 'light' ? '🌙' : '☀️'}</span>
          </button>
          <div className="headerActions">
            <Sections />
            <div className="authZone">
              {
                isAuthorized ? (
                  <div className="userLoggedIn">
                    {
                      (user?.role === ROLES.EDITOR || user?.role === ROLES.ADMIN) && (
                        <Link to="/dashboard" className="dashboardPill">
                          لوحة التحكم
                        </Link>
                      )
                    }
                    <button type="button" onClick={onLogout} className="logoutPill">
                      خروج
                    </button>
                  </div>
                ) : (
                  <div className="authButtons">
                    <Link to="/login" className="loginPill">
                      دخول
                    </Link>
                    <Link to="/register" className="registerPill">
                      حساب جديد
                    </Link>
                  </div>
                )
              }
            </div>
          </div>
        </div>
        <div className='categoriesPart'>
          <Category />
        </div>
      </Container>
      {show && <div className="layout" onClick={() => setShow(false)} />}
      <Menu {...{ show }} />
    </StyledHeader>
  )
}

export default Header