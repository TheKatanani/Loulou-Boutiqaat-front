import { 
  createSlice
} from '@reduxjs/toolkit';
import {
  STATUS
} from '../../Actions';

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: {
    formData: {
      location:''
    },
    error: {},
    status: '', 
  },
  reducers: {
    handleInputChange: (state, action) => {
      const {
        id,
        value
      } = action.payload
      state.formData[id] =  value
    },
    setStatusIdle: (state) => {
      state.status = STATUS.IDLE;
    },
    setStatusLoading: (state) => {
      state.status = STATUS.LOADING;
    },
    setStatusSucceeded: (state) => {
      state.status = STATUS.SUCCEEDED;
    },
    setStatusFailed: (state, action) => {
      state.status = STATUS.FAILED;
      state.error = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload.errors
    },
    showPassword: (state) => {
      state.showPassword = !state.showPassword
    },
  }
});

export const selectFormData = state => state.checkout.formData
export const selectcheckout = state => state.checkout.formData
export const selectStatus = state => state.checkout.status
export const selectError = state => state.checkout.error

export const {
  handleInputChange,
  setLoading,
  setError,
  handleCheckBoxChange,
  setStatusSucceeded,
  showPassword,
  setStatusIdle,
  setStatusFailed
} = checkoutSlice.actions;
export default checkoutSlice.reducer;