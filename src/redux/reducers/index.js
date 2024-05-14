import { combineReducers } from 'redux';
import signupReducer from './signup';
import  authReducer  from './auth';
import  loginReducer  from './login'; 
import productsReducer from './products';
import catigoriesReducer from './catigories';
import searchReducer from './search';
import cartReducer from './cart';
import savedReducer from './saved';
import usersReducer from './users';
import socialReducer from './social';
const rootReducer = combineReducers({
  signup: signupReducer,
  auth: authReducer,
  login: loginReducer, 
  products: productsReducer ,
  catigories: catigoriesReducer ,
  search: searchReducer ,
  cart:cartReducer,
  saved:savedReducer,
  users:usersReducer,
  social:socialReducer
});

export default rootReducer;
