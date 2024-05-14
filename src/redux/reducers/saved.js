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
    addTosavedLocal: (state, action) => {
      const {
        productId
      } = action.payload
      state.saved = [...state.saved, productId]
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
      })
      .addCase(setSaved.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        if (Array.isArray(state.saved)) {
          let newSaved = [];
          [...state.saved, ...action.payload.data].forEach(el => {
            const founded = newSaved.find(e => e === el) 
            !founded && newSaved.push(el)
          })
          state.saved = newSaved
        } else {
          state.saved = action.payload.data
        }
      })
      .addCase(setSaved.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload;
      })
      // addToSaved
      .addCase(addToSaved.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(addToSaved.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.saved = action.payload.data;
      })
      .addCase(addToSaved.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload;
      })
      // removeFromSaved
      .addCase(removeFromSaved.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(removeFromSaved.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.saved = action.payload.data;
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
    userId
  }) => {
    const response = await axios.get(`${API}/saved/${userId}`);
    return response.data
  }
)
export const addToSaved = createAsyncThunk(
  "saved/addTosaved",
  async ({
    productId,
    userId,
    saved
  }) => {
    const savedItems = await axios.get(`${API}/saved`)
    const isExist = savedItems.data.find(el => el.id === userId)

    if (isExist) {
      const newsaved = [...(new Set([...saved, productId]))]
      const response = await axios.put(`${API}/saved/${userId}`, {
        data: newsaved
      });
      return response.data
    } else {
      const newsaved = [productId]
      const response = await axios.post(`${API}/saved`, {
        id: userId,
        data: newsaved
      });
      return response.data
    }
  }
)
export const removeFromSaved = createAsyncThunk(
  "saved/removeFromSaved",
  async ({
    productId,
    userId,
    saved
  }) => {
    const newSaved = saved?.filter(el => el !== productId)
    const response = await axios.put(`${API}/saved/${userId}`, {
      data: newSaved
    });
    return response.data
  }
)

export const {
  resetState,
  addTosavedLocal,
  removeFromsavedLocal
} = savedSlice.actions
export const selectsaved = state => state.saved.saved
export default savedSlice.reducer;