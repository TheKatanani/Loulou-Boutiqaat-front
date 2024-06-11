import { ThemeProvider } from 'styled-components';
import { useState } from 'react';
import { darkTheme, lightTheme } from './Global/theme'
import { GlobalStyle } from './Global/style';
import { ThemeContext } from './Context';
import Toggle from './Components/Toggle';
import MyRoutes from './Routes'
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from './redux/reducers/products';
import { setCategories } from './redux/reducers/categories';
import { selectUser } from './redux/reducers/auth';
import { setCart } from './redux/reducers/cart';
import { setSaved } from './redux/reducers/saved';
import { setSocial } from './redux/reducers/social';
import { useEffect } from 'react';
function App() {
  const [theme, setTheme] = useState(lightTheme);
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  useEffect(() => {
    dispatch(setCart({ userId: user.id }))
    dispatch(setSaved({ userId: user.id }))
    let cart = JSON.parse(localStorage.getItem('cart'))
    if (cart) {
      const foundedUserData = cart?.find(el => el.id === user.id)
      foundedUserData &&
        dispatch(setCart(foundedUserData))
    }
    dispatch(setProducts())
    dispatch(setCategories())
    dispatch(setSocial())
    setTheme(localStorage.getItem('theme') === 'light' ? darkTheme : lightTheme);
  }, [dispatch, user]);
  return (
    <ThemeProvider theme={theme} page="page4">
      <ThemeContext.Provider value={[theme, setTheme]}>
        <GlobalStyle /> {/* replace it into a css index file */}
        <Toggle />
        {<MyRoutes />}
      </ThemeContext.Provider>
    </ThemeProvider>
  );
}

export default App;