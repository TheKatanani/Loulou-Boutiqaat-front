import {
  createSlice
} from '@reduxjs/toolkit';
import {
  STATUS
} from '../../Actions';
const initailState = {
  name: '',
  phone: "",
  selectPhone: "+972",
  password: "",
  gendar: '',
  error: {},
  passwordStrength: "",
  isLoading: false,
}
const signupSlice = createSlice({
  name: 'signup',
  initialState: {
    formData: initailState,
    status: 'idle',
    error: null,
  },
  reducers: {
    handleInputChange: (state, action) => {
      const {
        id,
        value
      } = action.payload
      state[id] = value
    },
    handleCheckBoxChange: (state, action) => {
      const {
        id,
        checked
      } = action.payload
      state[id] = checked
    },
    setGendar: (state, action) => {
      state.formData.gendar = action.payload
    },
    setStatusIdle: (state) => {
      state.status = 'idle';
    },
    setStatusLoading: (state) => {
      state.status = STATUS.LOADING;
    },
    setStatusSucceeded: (state) => {
      state.status = STATUS.SUCCEEDED;
    },
    setStatusFailed: (state, action) => {
      state.status = STATUS.FAILED;
      state.error = action.payload.errors;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});
export const selectFormData = state => state.signup.formData
export const selectStatus = state => state.signup.status;
export const selectError = state => state.signup.error;

export const {
  handleInputChange,
  setStatusIdle,
  setStatusLoading,
  setStatusSucceeded,
  setStatusFailed,
  clearError,
  setGendar,
  handleCheckBoxChange,
} = signupSlice.actions;
export default signupSlice.reducer;