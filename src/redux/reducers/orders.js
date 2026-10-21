import {
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';
import {
  STATUS
} from '../../Actions';

export const setOrders = createAsyncThunk(
  "order/setOrders",
  async ({ axiosPrivate }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get(`/order`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const addOrder = createAsyncThunk(
  "order/addOrder",
  async ({ order, axiosPrivate }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post(`/order`, order);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async ({ orderId, data, axiosPrivate }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.put(`/order/${orderId}`, data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const removeOrder = createAsyncThunk(
  "order/removeOrder",
  async ({ orderId, axiosPrivate }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.delete(`/order/${orderId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const cancelOrder = createAsyncThunk(
  "order/cancelOrder",
  async ({ orderId, axiosPrivate }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.delete(`/order/cancel/${orderId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const ordersSlice = createSlice({
  name: 'order',
  initialState: {
    orders: [],
    error: null,
    status: STATUS.IDLE
  },
  reducers: {
    resetState: (state) => {
      state.orders = [];
      state.error = null;
      state.status = STATUS.IDLE;
    },
    setStatusIdle: (state) => {
      state.status = STATUS.IDLE;
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
        state.orders = action.payload;
      })
      .addCase(setOrders.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload || action.error;
      })
      // addToOrders
      .addCase(addOrder.pending, (state) => {
        state.status = STATUS.LOADING;
        state.error = null;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.orders = [...state.orders, action.payload];
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload || action.error;
      })
      // removeOrder
      .addCase(removeOrder.pending, (state) => {
        state.status = STATUS.LOADING;
        state.error = null;
      })
      .addCase(removeOrder.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.orders = state.orders.filter(order => String(order.id) !== String(action.payload));
      })
      .addCase(removeOrder.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload || action.error;
      })
      // cancelOrder
      .addCase(cancelOrder.pending, (state) => {
        state.status = STATUS.LOADING;
        state.error = null;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.orders = state.orders.filter(order => String(order.id) !== String(action.payload));
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload || action.error;
      })
      // updateOrder
      .addCase(updateOrder.pending, (state) => {
        state.status = STATUS.LOADING;
        state.error = null;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.orders = state.orders.map(order => String(order.id) === String(action.payload.id) ? {
          ...order,
          ...action.payload
        } : order);
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload || action.error;
      });
  }
});

export const {
  resetState,
  setStatusIdle
} = ordersSlice.actions;

export const selectOrders = state => state.order.orders;
export const selectOrdersStatus = state => state.order.status;

export default ordersSlice.reducer;
