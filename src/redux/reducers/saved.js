import {
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';
import {
  STATUS
} from '../../Actions';
const savedSlice = createSlice({
  name: 'saved',
  initialState: {
    saved: [],
    error: [],
    status: ''
  },
  reducers: {
    resetState: (state) => {
      state.saved = [];
      state.error = [];
      state.status = ''
    },
    setSavedLocal: (state) => {
      let saved = JSON.parse(localStorage.getItem('saved'))
      if (saved?.length) {
        state.saved = saved
      }
    },
    addTosavedLocal: (state, action) => {
      const {
        productId
      } = action.payload
      const newSaved = [...state.saved, productId]
      state.saved = newSaved
      localStorage.setItem('saved', JSON.stringify(newSaved))
    },
    removeFromsavedLocal: (state, action) => {
      const {
        productId
      } = action.payload
      state.saved = state?.saved?.filter(el => el !== productId)
    }
  },
  extraReducers: (builder) => {
    builder
      // setSaved
      .addCase(setSaved.pending, (state) => {
        state.status = STATUS.LOADING;
        state.error = null
      })
      .addCase(setSaved.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.saved = action.payload.data 
      })
      .addCase(setSaved.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.error;
      })
      // uploadLocalSaved
      .addCase(uploadLocalSaved.pending, (state) => {
        state.status = STATUS.LOADING;
        state.error = null
      })
      .addCase(uploadLocalSaved.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED; 
        localStorage.getItem('saved') && localStorage.removeItem('saved')
      })
      .addCase(uploadLocalSaved.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.error;
      })
      // addToSaved
      .addCase(addToSaved.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(addToSaved.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.saved = [...state.saved, action.payload];
      })
      .addCase(addToSaved.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.error;
      })
      // removeFromSaved
      .addCase(removeFromSaved.pending, (state) => {
        state.status = STATUS.LOADING;
        state.error = null
      })
      .addCase(removeFromSaved.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.saved = state.saved.filter(item => +item !== +action.payload);
      })
      .addCase(removeFromSaved.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload;
      })
  }
});
export const setSaved = createAsyncThunk(
  "saved/setSaved",
  async ({
    axiosPrivate
  }) => {
    const response = await axiosPrivate.get(`/saved`);
    return response.data
  }
)
export const uploadLocalSaved = createAsyncThunk(
  "saved/uploadLocalSaved",
  async ({
    axiosPrivate
  }) => {
    const localSaved = JSON.parse(localStorage.getItem('saved'))
    if (localSaved?.length) {
      const response = await axiosPrivate.put(`/saved`, {
        localSaved
      });
      return response.data
    }
  }
)
export const addToSaved = createAsyncThunk(
  "saved/addTosaved",
  async ({
    productId,
    axiosPrivate
  }) => {
    const response = await axiosPrivate.post(`/saved`, {
      productId
    })
    return response.data
  }
)
export const removeFromSaved = createAsyncThunk(
  "saved/removeFromSaved",
  async ({
    productId,
    axiosPrivate
  }) => {
    const response = await axiosPrivate.delete(`/saved/${productId}`);
    return response.data
  }
)

export const {
  resetState,
  addTosavedLocal,
  removeFromsavedLocal,
  setSavedLocal
} = savedSlice.actions
export const selectsaved = state => state.saved.saved
export default savedSlice.reducer;