import {
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';
import {
  STATUS
} from '../../Actions';
import {
  API
} from '../../API';
import axios from 'axios';
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
    addToCartLocal: (state, action) => {
      const {
        productId
      } = action.payload
      state.cart = [...state.cart, {
        productId,
        quantity: 1
      }]
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
        // to see if the user add any item when he was a gust
        if (Array.isArray(state.cart)) {
          let newCart = [];
          [...state.cart, ...action.payload.data].forEach(el => {
            const founded = newCart.find(e => e.productId === el.productId) 
            !founded && newCart.push(el)
          })
          state.cart = newCart
        } else {
          state.cart = action.payload.data
        }
        state.quantity = state?.cart?.reduce((_quantity, item) => item.quantity + _quantity, 0)
      })
      .addCase(setCart.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload;
      })
      //  addToCart
      .addCase(addToCart.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.cart = action.payload.data;
        state.quantity = action?.payload?.data?.reduce((_quantity, item) => item.quantity + _quantity, 0)
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload;
      })
      // removeFromCart
      .addCase(removeFromCart.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.cart = action.payload.data;
        state.quantity = action?.payload?.data?.reduce((_quantity, item) => item.quantity + _quantity, 0)
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload;
      })
      // increase
      .addCase(increase.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(increase.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.cart = action.payload.data;
        state.quantity = action?.payload?.data?.reduce((_quantity, item) => item.quantity + _quantity, 0)
      })
      .addCase(increase.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload;
      })
      // decrease
      .addCase(decrease.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(decrease.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.cart = action.payload.data;
        state.quantity = action?.payload?.data?.reduce((_quantity, item) => item.quantity + _quantity, 0)
      })
      .addCase(decrease.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload;
      })
      // clearCart
      .addCase(clearCart.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.cart = action.payload.data;
        state.quantity = action?.payload?.data?.reduce((_quantity, item) => item.quantity + _quantity, 0)
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
    userId
  }) => {
    const response = await axios.get(`${API}/cart/${userId}`);
    return response.data
  }
)
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({
    productId,
    userId,
    cart
  }) => {
    const cartItems = await axios.get(`${API}/cart`)
    const isExist = cartItems.data.find(el => el.id === userId)
    if (isExist) {
      const newCart = [...(new Set([...cart, {
        productId,
        quantity: 1
      }]))]
      const response = await axios.put(`${API}/cart/${userId}`, {
        data: newCart
      });
      return response.data
    } else {
      const newCart = [...(new Set([{
        productId,
        quantity: 1
      }]))]
      const response = await axios.post(`${API}/cart`, {
        id: userId,
        data: newCart
      });
      return response.data
    }
  }
)
export const increase = createAsyncThunk(
  "cart/increse",
  async ({
    productId,
    userId,
    cart
  }) => {
    const newCart = cart.map(el => el.productId === productId ? {
      productId,
      quantity: el.quantity + 1
    } : el)
    const response = await axios.put(`${API}/cart/${userId}`, {
      data: newCart
    });
    return response.data
  }
)
export const decrease = createAsyncThunk(
  "cart/decrease",
  async ({
    productId,
    userId,
    cart
  }) => {
    const newCart = cart.map(el => el.productId === productId ? {
      productId,
      quantity: el.quantity - 1
    } : el)
    const response = await axios.put(`${API}/cart/${userId}`, {
      data: newCart
    });
    return response.data
  }
)
export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async ({
    userId
  }) => {
    const response = await axios.delete(`${API}/cart/${userId}`);
    return response.data
  }
)
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({
    productId,
    userId,
    cart
  }) => {
    const newCart = cart?.filter(el => el.productId !== productId)
    const response = await axios.put(`${API}/cart/${userId}`, {
      data: newCart
    });
    return response.data
  }
)

export const {
  getItemsQuantity,
  addToCartLocal,
  removeFromCartLocal,
  resetState
} = cartSlice.actions
export const selectCart = state => state.cart.cart
export const selectQuantity = state => state.cart.quantity
export default cartSlice.reducer;