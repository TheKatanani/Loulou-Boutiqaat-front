import React, { useContext } from 'react'
import { darkTheme, lightTheme } from '../../Global/theme'
import { ThemeContext } from '../../Context/index';
import Dark from '../../Images/moon.png'
import Light from '../../Images/brightness.png'
import { MainButton } from '../../Global/components';
import { ButtonStayled, MainStayled } from './styled';
import { useDispatch, useSelector } from 'react-redux';
import { SelectIsAuthenticated, handleLogout,  selectUser } from '../../redux/reducers/auth';
import { resetState } from '../../redux/reducers/cart';
import { resetState as resetSavedState } from '../../redux/reducers/saved';
import { ROLES } from '../../Actions';
import { Link } from 'react-router-dom';
const Toggle = () => {
  const [theme, setTheme] = useContext(ThemeContext);
  const isAuthenticated = useSelector(SelectIsAuthenticated)

  const user = useSelector(selectUser)
  const dispath = useDispatch()
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === lightTheme ? darkTheme : lightTheme);
    localStorage.setItem('theme', theme.theme);
  }
  return (
    <MainStayled>
      <ButtonStayled onClick={toggleTheme}><img loading="lazy" src={theme.theme === "light" ? Dark : Light} alt="mood" /></ButtonStayled>
      {isAuthenticated && <MainButton onClick={() => {
        dispath(handleLogout())
        // to delete all user date from cart and saved
        dispath(resetState())
        dispath(resetSavedState())
      }}>تسجيل خروج</MainButton>}
      {
        (user?.role === ROLES.EDITOR || user?.role === ROLES.ADMIN) &&
        <Link className='dashboardLink' to='/dashboard'>
          <MainButton>
            لوحة التحكم
          </MainButton>
        </Link>
      }
    </MainStayled>
  )
}

export default Toggle