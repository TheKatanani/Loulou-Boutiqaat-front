import React from 'react'
import Header from '../Header'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer'
import styled from 'styled-components'
const StyleLayout = styled.div`
.outlet { 
  margin-top: 140px;
  ${({ theme: { media } }) => media.xs}{
    margin-top: 140px;
  }
  ${({ theme: { media } }) => media.s}{
    margin-top: 150px;
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
      <main className="outlet">
        <Outlet />
      </main>
      <Footer />
    </StyleLayout>
  )
}

export default Layout