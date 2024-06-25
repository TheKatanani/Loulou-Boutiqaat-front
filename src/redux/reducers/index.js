import {
  combineReducers
} from 'redux';
import signupReducer from './signup';
import authReducer from './auth'; 
import productsReducer from './products';
import categoriesReducer from './categories';
import searchReducer from './search';
import cartReducer from './cart';
import savedReducer from './saved';
import usersReducer from './users';
import socialReducer from './social';
import checkoutReducer from './checkout';
import orderReducer from './orders';
const rootReducer = combineReducers({
  signup: signupReducer,
  auth: authReducer, 
  products: productsReducer,
  categories: categoriesReducer,
  search: searchReducer,
  cart: cartReducer,
  saved: savedReducer,
  users: usersReducer,
  checkout: checkoutReducer,
  order: orderReducer,
  social: socialReducer
});

export default rootReducer;