import {
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';
import {
  STATUS
} from '../../Actions';
import {
  validationSchema
} from '../../validationSchema';
import axios from '../../api/axios';
import { setAuthentecated } from './auth';
const initailState = {
  name: '',
  phone: "",
  selectPhone: "+972",
  password: "",
  gender: 'female',
  isLoading: false,
  barthDay: "2000-01-01"
}
const signupSlice = createSlice({
  name: 'signup',
  initialState: {
    formData: initailState,
    status: 'idle',
    error: null,
    success: null
  },
  reducers: {
    handleInputChange: (state, action) => {
      const {
        id,
        value
      } = action.payload
      state.formData[id] = value
    },
    handleCheckBoxChange: (state, action) => {
      const {
        id,
        checked
      } = action.payload
      state.formData[id] = checked
    },
    setGender: (state, action) => {
      state.formData.gender = action.payload
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
  extraReducers: (builder) => {
    builder
      .addCase(handleRegister.pending, (state) => {
        state.status = STATUS.LOADING;
        state.error = null;
      })
      .addCase(handleRegister.fulfilled, (state, action) => {
        if (action.payload?.errors) {
          state.status = STATUS.FAILED;
          state.error = action.payload?.errors
        } else if (action.payload?.data) {
          // // state.token = action.payload?.data?.accessToken;
          // state.status = STATUS.SUCCEEDED; 
          // state.formData = initailState
          // // state.isAuthenticated = true;
          // // state.user = action.payload?.data?.user

          state.token = action.payload?.data?.accessToken;
          state.isAuthenticated = true;
          state.user = action.payload?.data?.user
          state.status = STATUS.SUCCEEDED;

        } else {
          state.status = STATUS.FAILED;
        }
      })
      .addCase(handleRegister.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.error
      })
  }
});
export const handleRegister = createAsyncThunk(
  "signup/handleRegister",
  async ({
    formData
  }, {
    dispatch
  }) => {
    try {
      await validationSchema.validate(formData, {
        abortEarly: false // to get all the form errors
      });
      const res = await axios.post('/register', {
        phone: `${formData.selectPhone}${formData.phone}`,
        name: formData?.name,
        password: formData?.password,
        gender: formData?.gender,
        barthDay: formData?.barthDay,
      }, {
        withCredentials: true,
      }) 
      dispatch(setAuthentecated({token:res.data?.accessToken,user:res.data?.user}))
      return res
    } catch (err) {
      if (err?.response?.status) { // if there status then the error from the sarver and return {message:''} in the data
        return {
          errors: err?.response?.data
        }
      }
      const errors = err.inner?.reduce((acc, {
        path,
        message
      }) => {
        acc[path] = message;
        return acc;
      }, {});
      return {
        errors
      }
    }
  })
export const selectFormData = state => state.signup.formData
export const selectStatus = state => state.signup.status;
export const selectError = state => state.signup.error;
export const selectSuccess = state => state.signup.success;

export const {
  handleInputChange,
  setStatusIdle,
  setStatusLoading,
  setStatusSucceeded,
  setStatusFailed,
  clearError,
  setGender,
  handleCheckBoxChange,
} = signupSlice.actions;
export default signupSlice.reducer;