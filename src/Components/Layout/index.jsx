import React from 'react'
import Header from '../Header'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer'
import styled from 'styled-components'
const StyleLayout = styled.div`
.outlet{ 
  margin-top:170px;
  ${({ theme: { media } }) => media.s}{
    margin-top: 200px;
  }
  ${({ theme: { media } }) => media.xl}{
    margin-top: 110px;
  }
}
`
const Layout = () => {
  return (
    <StyleLayout>
      <Header />
      <div className="outlet" >
        <Outlet />
      </div>
      <Footer />
    </StyleLayout>
  )
}

export default Layout