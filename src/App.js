import { ThemeProvider } from 'styled-components';
import { useEffect, useState } from 'react';
import { lightTheme ,darkTheme} from './Global/theme'
import { GlobalStyle } from './Global/style';
import { ThemeContext } from './Context'; 
import Toggle from './Components/Toggle';
import MyRoutes from './Routes' 
import { useDispatch, useSelector } from 'react-redux';
import { setProducts  } from './redux/reducers/products';
import { setCatigories } from './redux/reducers/catigories';
import { selectUser, setLogIn } from './redux/reducers/auth';
import { setCart } from './redux/reducers/cart';
import { setSaved } from './redux/reducers/saved';
import { setSocial } from './redux/reducers/social';
function App() {
  const [theme, setTheme] = useState(lightTheme); 
  const dispatch = useDispatch()
  const user = useSelector(selectUser) 
  useEffect(() => {
    dispatch(setCart({userId:user.id}))
    dispatch(setSaved({userId:user.id}))
    // let cart = JSON.parse(localStorage.getItem('cart')) 
    // if (cart) { 
    //   const foundedUserData = cart?.find(el => el.id === user.id)
    //   foundedUserData &&
    //     dispatch(setCart(foundedUserData)) 
    // }
    dispatch(setProducts())
    dispatch(setCatigories())
    dispatch(setSocial()) 
    localStorage.getItem('token')&&
    dispatch(setLogIn({ token: JSON.parse(localStorage.getItem('token')) }));
    setTheme(localStorage.getItem('theme')==='light'? darkTheme: lightTheme );
  }, [dispatch,user]);
  return (
    <ThemeProvider theme={theme} page="page4">
      <ThemeContext.Provider value={[theme, setTheme]}>  
            <GlobalStyle />
            <Toggle />
              {<MyRoutes/>} 
        </ThemeContext.Provider>
      </ThemeProvider>
  );
}

export default App;