import { ThemeProvider } from 'styled-components';
import { useState } from 'react';
import { darkTheme, lightTheme } from './Global/theme'
import { GlobalStyle } from './Global/style';
import { ThemeContext } from './Context';
import MyRoutes from './Routes'
import { useDispatch, useSelector } from 'react-redux';
import { setPublishedProducts } from './redux/reducers/products';
import { setPublishedCategories } from './redux/reducers/categories';
import { SelectIsAuthenticated, handleRefresh } from './redux/reducers/auth';
import { setCart, setCartLocal, uploadLocalCart } from './redux/reducers/cart';
import { setSaved, setSavedLocal, uploadLocalSaved } from './redux/reducers/saved';
import { setSocial } from './redux/reducers/social';
import { useEffect } from 'react';
import useAxiosPrivate from './Hook/useAxiosPrivet';
import ErrorBoundary from './Components/common/Errorboundary';
import { Toaster } from 'react-hot-toast';
import FloatingWhatsApp from './Components/common/FloatingWhatsApp';
import CartDrawer from './Components/CartDrawer';
import ScrollToTop from './Components/common/ScrollToTop';

function App() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') === 'dark' ? darkTheme : lightTheme;
    } catch (e) {
      return lightTheme;
    }
  });
  const dispatch = useDispatch()
  const axiosPrivate = useAxiosPrivate()
  const isAuthenticated = useSelector(SelectIsAuthenticated)

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(uploadLocalCart({ axiosPrivate }))
      dispatch(uploadLocalSaved({ axiosPrivate }))
      dispatch(setCart({ axiosPrivate }))
      dispatch(setSaved({ axiosPrivate }))
    } else {
      dispatch(handleRefresh())
      // this is for guest user before registration
      dispatch(setCartLocal())
      dispatch(setSavedLocal())
    }
    // Only fetch published products & categories on initial load for optimal speed
    dispatch(setPublishedProducts())
    dispatch(setPublishedCategories())
    dispatch(setSocial())
    const savedTheme = localStorage.getItem('theme');
    setTheme(savedTheme === 'dark' ? darkTheme : lightTheme);
  }, [dispatch, isAuthenticated, axiosPrivate]);

  return (
    <ThemeProvider theme={theme} page="page4">
      <ThemeContext.Provider value={[theme, setTheme]}>
        <GlobalStyle />
        <Toaster
          position="bottom-left"
          toastOptions={{
            style: {
              background: theme.palette.main,
              color: theme.palette.font,
              fontFamily: "'Cairo', 'Tajawal', sans-serif",
              fontSize: '14px',
              borderRadius: '10px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
              border: `1px solid ${theme.palette.ColorApp.gray_300}`,
              direction: 'rtl',
            },
            success: {
              iconTheme: {
                primary: theme.palette.ColorApp.primary,
                secondary: '#fff',
              },
            },
          }}
        />
        <ErrorBoundary>
          <MyRoutes />
        </ErrorBoundary>
        <ScrollToTop />
        <CartDrawer />
        <FloatingWhatsApp />
      </ThemeContext.Provider>
    </ThemeProvider>
  );
}

export default App;
