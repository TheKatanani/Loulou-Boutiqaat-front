import {
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';
import {
  STATUS
} from '../../Actions'; 
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    quantity: 0,
    error: [],
    status: ''
  },
  reducers: {
    getItemsQuantity: (state, action) => {
      state.quantity = action.payload
    },
    resetState: (state) => {
      state.cart = [];
      state.quantity = 0;
      state.error = [];
      state.status = ''
    },
    setCartLocal: (state) => {
      let cart = JSON.parse(localStorage.getItem('cart'))
      if (cart?.length) {
        state.cart = cart
        state.quantity = cart.reduce((_quantity, item) => item.quantity + _quantity, 0)
      }
    },
    addToCartLocal: (state, action) => {
      const {
        productId
      } = action.payload
      const newCart = [...state.cart, {
        productId,
        quantity: 1
      }]
      state.cart = newCart
      localStorage.setItem('cart', JSON.stringify(newCart))
      state.quantity = state.cart.reduce((_quantity, item) => item.quantity + _quantity, 0)
    },
    removeFromCartLocal: (state, action) => {
      const {
        productId
      } = action.payload
      state.cart = state.cart.filter(el => el.productId !== productId)
      state.quantity = state.cart.reduce((_quantity, item) => item.quantity + _quantity, 0)
    }
  },
  extraReducers: (builder) => {
    builder
      // setCart
      .addCase(setCart.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(setCart.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.cart = action.payload.data
        state.quantity = state?.cart?.reduce((_quantity, item) => item.quantity + _quantity, 0)
      })
      .addCase(setCart.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.error;
      })
      //  addToCart
      .addCase(addToCart.pending, (state) => {
        state.status = STATUS.LOADING;
        state.error = null
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.cart = [...state.cart, action.payload];
        state.quantity = state.cart?.reduce((_quantity, item) => item.quantity + _quantity, 0)
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.error;
      })
      //  uploadLocalCart
      .addCase(uploadLocalCart.pending, (state) => {
        state.status = STATUS.LOADING;
        state.error = null
      })
      .addCase(uploadLocalCart.fulfilled, (state) => {
        state.status = STATUS.SUCCEEDED;  
        localStorage.getItem('cart') && localStorage.removeItem('cart')
      })
      .addCase(uploadLocalCart.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.error;
      })
      // removeFromCart
      .addCase(removeFromCart.pending, (state) => {
        state.status = STATUS.LOADING;
        state.error = null
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.cart = state.cart.filter(item => +item.productId !== +action.payload);
        state.quantity = state.cart?.reduce((_quantity, item) => item.quantity + _quantity, 0)
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload;
      }) 
      // quantityCartItem
      .addCase(quantityCartItem.pending, (state) => {
        state.status = STATUS.LOADING;
        state.error = null
      })
      .addCase(quantityCartItem.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.cart = action.payload;
        state.quantity = state.cart?.reduce((_quantity, item) => item.quantity + _quantity, 0)
      })
      .addCase(quantityCartItem.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload;
      })
      // clearCart
      .addCase(clearCart.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.cart = [];
        state.quantity = state.cart?.reduce((_quantity, item) => item.quantity + _quantity, 0)
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload;
      })
  }
});
export const setCart = createAsyncThunk(
  "cart/setCart",
  async ({
    axiosPrivate
  }) => {
    const response = await axiosPrivate.get(`/cart`);
    return response.data
  }
)
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({
    productId,
    axiosPrivate
  }) => {
    const response = await axiosPrivate.post(`/cart`, {
      productId,
      quantity: 1
    });
    return response.data
  }
)
export const uploadLocalCart = createAsyncThunk(
  "cart/uploadLocalCart",
  async ({
    axiosPrivate
  }) => {
    const localCart = JSON.parse(localStorage.getItem('cart'))
    if (localCart?.length) {
      const response = await axiosPrivate.put(`/cart`, {
        localCart
      });
      return response.data
    }
  }
)

export const quantityCartItem = createAsyncThunk(
  "cart/quantityCartItem",
  async ({
    productId,
    operator,
    axiosPrivate
  }) => {

    const response = await axiosPrivate.put(`/cart/${productId}`, {
      operator
    });
    return response.data
  }
)
export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async ({
    userId,
    axiosPrivate
  }) => {
    const response = await axiosPrivate.delete(`/cart/clearCart`);
    return response.data
  }
)
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({
    productId,
    axiosPrivate
  }) => {
    const response = await axiosPrivate.delete(`/cart/${productId}`);
    return response.data
  }
)

export const {
  getItemsQuantity,
  addToCartLocal,
  removeFromCartLocal,
  resetState,
  setCartLocal
} = cartSlice.actions
export const selectCart = state => state.cart.cart
export const selectQuantity = state => state.cart.quantity
export default cartSlice.reducer;