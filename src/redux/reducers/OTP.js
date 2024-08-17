// src/store/slices/OTPSlice.js
import {
  createSlice,
  createAsyncThunk
} from '@reduxjs/toolkit';
import {
  STATUS
} from '../../Actions';
import {
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential
} from 'firebase/auth';
import auth from '../../firebase';

const initialState = {
  phone: "",
  verificationId: "",
  OTP: "",
  status: STATUS.IDLE,
  error: null,
};

export const sendOTP = createAsyncThunk(
  "OTP/sendOTP",
  async ({
    phone,
    appVerifier,
    navigate
  }, {
    rejectWithValue,
    // getState
  }) => { 
    try {
      const confirmationResult = await signInWithPhoneNumber(auth, phone, appVerifier);
      return {
        verificationId: confirmationResult.verificationId,
        navigate
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const verifyOTP = createAsyncThunk(
  "OTP/verifyOTP",
  async ({
    verificationId,
    otp
  }, {
    rejectWithValue
  }) => {
    try {
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      const userCredential = await signInWithCredential(auth, credential);
      return {
        user: userCredential.user
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const OTPSlice = createSlice({
  name: 'OTP',
  initialState,
  reducers: {
    handleInputChangeReducer: (state, action) => {
      const {
        id,
        value
      } = action.payload;
      state[id] = value;
    },
    handleInputOTPChange: (state, action) => {
      state.OTP = action.payload;
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
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOTP.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(sendOTP.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        action.payload.navigate('/verifyOTP')
        state.verificationId = action.payload.verificationId;
      })
      .addCase(sendOTP.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload;
      })
      .addCase(verifyOTP.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload;
      });
  },
});

export const {
  handleInputChangeReducer,
  handleInputOTPChange,
  setStatusLoading,
  setStatusIdle,
  setStatusSucceeded,
  setStatusFailed,
  clearError,
} = OTPSlice.actions;

export const selectStatus = (state) => state.OTP.status;
export const selectOTPData = (state) => state.OTP;
export const selectError = (state) => state.OTP.error;

export default OTPSlice.reducer;