import {
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';
import {
  STATUS
} from '../../Actions';
const ordersSlice = createSlice({
  name: 'order',
  initialState: {
    orders: [],
    error: [],
    status: ''
  },
  reducers: {
    resetState: (state) => {
      state.orders = [];
      state.error = [];
      state.status = ''
    },
    setStatusIdle: (state) => {
      state.status = STATUS.IDLE
    }
  },
  extraReducers: (builder) => {
    builder
      // setOrders
      .addCase(setOrders.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(setOrders.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.orders = action.payload
      })
      .addCase(setOrders.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.error;
      })
      //  addToOrders
      .addCase(addOrder.pending, (state) => {
        state.status = STATUS.LOADING;
        state.error = null
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.orders = [...state.orders, action.payload];
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.error;
      })
      // removeOrder
      .addCase(removeOrder.pending, (state) => {
        state.status = STATUS.LOADING;
        state.error = null
      })
      .addCase(removeOrder.fulfilled, (state, action) => { 
        state.status = STATUS.SUCCEEDED;
        state.orders = state.orders.filter(order => order.id != action.payload)
        // state.orders = state.orders.map(order => order.id == orderId ?
        //   order.filter(item => item.productId != action.payload) :
        //   order
        //   )
        // .filter(item => item.productId != action.payload);
      })
      .addCase(removeOrder.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload;
      })
  }
});
export const setOrders = createAsyncThunk(
  "order/setOrders",
  async ({
    axiosPrivate
  }) => {
    const response = await axiosPrivate.get(`/order`);
    return response.data
  }
)
export const addOrder = createAsyncThunk(
  "order/addOrder",
  async ({
    order,
    axiosPrivate
  }) => {
    const response = await axiosPrivate.post(`/order`, order);
    return response.data
  }
)

export const removeOrder = createAsyncThunk(
  "order/removeOrder",
  async ({
    orderId,
    axiosPrivate
  }) => {
    const response = await axiosPrivate.delete(`/order/${orderId}`);
    return response.data
  }
)

export const {
  resetState,
  setStatusIdle
} = ordersSlice.actions

export const selectOrders = state => state.order.orders
export const selectOrdersStatus = state => state.order.status

export default ordersSlice.reducer;