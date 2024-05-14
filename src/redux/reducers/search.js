import {
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';
import axios from 'axios';
import {
  API,
} from '../../API';
import {
  STATUS
} from '../../Actions';

export const productsSlice = createSlice({
  name: 'search', //this is a key
  initialState: {
    searchResults: [],
    status: 'idle',
    searchTerm: '',
    catigoryId: '',
    error: null,
  },
  reducers: {
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    setStatusIdle: (state) => {
      state.status = 'idle';
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setCatigory: (state, action) => {
      state.catigoryId = action.payload;
    },
    setStatusLoading: (state) => {
      state.status = 'loading';
    },
    setStatusSucceeded: (state) => {
      state.status = 'succeeded';
    },
    setStatusFailed: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.searchResults = action.payload;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload;
      })
  }
});
export const fetchSearchResults = createAsyncThunk(
  "products/fetchSearchResults",
  async (payload) => {
    const response = await axios.get(`${API}/products?name_like=${encodeURIComponent(payload.searchTerm)}${payload.catigoryId&&`&catigoryId=`+payload.catigoryId}`);
    return response
  }
)
export const {
  setSearchTerm,
  setCatigory,
  setSearchResults,
  setStatusIdle,
  setStatusLoading,
  setStatusSucceeded,
  setStatusFailed,
  clearError,
} = productsSlice.actions;

export const selectSearchResults = state => state.search.searchResults;
export const selectStatus = state => state.search.status;
export const selectSearchTerm = state => state.search.searchTerm;
export const selectCatigory = state => state.search.catigoryId;
export const selectError = state => state.search.error;

export default productsSlice.reducer;