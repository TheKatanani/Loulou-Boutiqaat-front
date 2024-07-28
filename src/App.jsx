import { ThemeProvider } from 'styled-components';
import { useState } from 'react';
import { darkTheme, lightTheme } from './Global/theme'
import { GlobalStyle } from './Global/style';
import { ThemeContext } from './Context';
import Toggle from './Components/Toggle';
import MyRoutes from './Routes'
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, setPublishedProducts } from './redux/reducers/products';
import { setCategories, setPublishedCategories } from './redux/reducers/categories';
import { SelectIsAuthenticated, handleRefresh, selectRememberMe, selectUser } from './redux/reducers/auth';
import { setCart, setCartLocal, uploadLocalCart } from './redux/reducers/cart';
import { setSaved, setSavedLocal, uploadLocalSaved } from './redux/reducers/saved';
import { setSocial } from './redux/reducers/social';
import { useEffect } from 'react';
import useAxiosPrivate from './Hook/useAxiosPrivet';
import ErrorBoundary from './Components/common/Errorboundary';
function App() {
  const [theme, setTheme] = useState(lightTheme);
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const axiosPrivate = useAxiosPrivate()
  const isAuthenticated = useSelector(SelectIsAuthenticated)
  const remeberMe = useSelector(selectRememberMe)

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(uploadLocalCart({ axiosPrivate }))
      dispatch(uploadLocalSaved({ axiosPrivate }))
      setTimeout(() => {
        // this for finish the last requiest then stay up to date with the new data
      }, 2000);
      dispatch(setCart({ axiosPrivate }))
      dispatch(setSaved({ axiosPrivate }))
    } else { 
      remeberMe &&
        dispatch(handleRefresh())
      // this is for guest user before registeration
      dispatch(setCartLocal())
      dispatch(setSavedLocal())
    }
    dispatch(setProducts())
    dispatch(setPublishedProducts())
    dispatch(setCategories())
    dispatch(setPublishedCategories())
    dispatch(setSocial())
    setTheme(localStorage.getItem('theme') === 'light' ? darkTheme : lightTheme);//change this fucken line and dont put static values
  }, [dispatch, user, isAuthenticated,remeberMe, axiosPrivate]);
  return (
    <ThemeProvider theme={theme} page="page4">
      <ThemeContext.Provider value={[theme, setTheme]}>
        <GlobalStyle /> {/* replace it into a css index file */}
        <Toggle />
        <ErrorBoundary>
          <MyRoutes />
        </ErrorBoundary>
      </ThemeContext.Provider>
    </ThemeProvider>
  );
}

export default App;