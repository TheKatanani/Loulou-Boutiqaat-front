import React, { useState } from 'react'
import { useContext } from 'react'
import { ThemeContext } from '../../Context'
import { Container, MainButton } from '../../Global/components'
import { Menu3 } from '../../Icons'
import Category from '../Category'
import Logo from '../Logo'
import Menu from '../Menu'
import Search from '../Search'
import Sections from '../Sections'
import { Header as Myheader } from './styles'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { SelectIsAuthenticated } from '../../redux/reducers/auth'

const Header = () => {
  const [show, setShow] = useState(false)
  const isAuthorized = useSelector(SelectIsAuthenticated)
  const [theme] = useContext(ThemeContext)
  return (
    <Myheader >
      <Container>
        <div style={{ padding: "0 15px" }}>
          <div className='logoBox'>
            <div className="menu" onClick={() => setShow(true)}>
              <Menu3 color={theme.palette.font} />
            </div>
            <Link to='/'>
              <Logo />
            </Link>
          </div>
          <Search isOnChangeRequest={true} />
          <Sections />
        </div>
        <div className='categoriesPart'>
          <Category />
          {
            !isAuthorized &&
            <div className="auth">
              <Link to="/login">
                <MainButton>
                  Sign In
                </MainButton>
              </Link>
              <Link to="/register">
                <MainButton>
                  Register
                </MainButton>
              </Link>
            </div>
          }
        </div>
      </Container>
      {show && <div className="layout" onClick={() => setShow(false)} />}
      <Menu {...{ show }} />
    </Myheader>
  )
}

export default Header