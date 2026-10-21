import React from 'react';
import Header from '../Header';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer';
import styled from 'styled-components';

const StyleLayout = styled.div`
  .outlet { 
    margin-top: 205px;
    min-height: calc(100vh - 380px);
    padding-bottom: 50px;
    animation: pageTransitionFade 0.35s cubic-bezier(0.16, 1, 0.3, 1);

    ${({ theme: { media } }) => media.xs} {
      margin-top: 190px;
      padding-bottom: 30px;
    }

    ${({ theme: { media } }) => media.s} {
      margin-top: 200px;
    }

    ${({ theme: { media } }) => media.m} {
      margin-top: 205px;
    }

    ${({ theme: { media } }) => media.l} {
      margin-top: 215px;
    }

    ${({ theme: { media } }) => media.xl} {
      margin-top: 220px;
    }
  }

  @keyframes pageTransitionFade {
    0% {
      opacity: 0;
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Layout = () => {
  return (
    <StyleLayout>
      <Header />
      <main className="outlet">
        <Outlet />
      </main>
      <Footer />
    </StyleLayout>
  );
};

export default Layout;
