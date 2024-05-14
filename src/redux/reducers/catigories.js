import {
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';
import axios from 'axios';
import {
  API,
} from '../../API';
import {
  MOOD,
  STATUS
} from '../../Actions';
const initailState = {
  name: "",
  discription: "",
  background: "",
  isVisibile: true
}
export const catigoriesSlice = createSlice({
  name: 'catigories',
  initialState: {
    catigories: [],
    state: initailState,
    mood: MOOD.ADD,
    status: 'idle',
    error: null,
  },
  reducers: {
    handleInputChangeReducer: (state, action) => {
      const {
        id,
        value
      } = action.payload
      state.state[id] = value
    },
    resitCatigory: (state) => {
      state.state = initailState
      state.mood = MOOD.ADD
    },
    setUpdateCatigory: (state, action) => {
      state.state = action.payload.catigory
      state.mood = MOOD.UPDATE
    },
    setStatusIdle: (state) => {
      state.status = 'idle';
    },
    setStatusLoading: (state) => {
      state.status = 'loading';
    },
    setStatusSucceeded: (state) => {
      state.status = 'succeeded';
    },
    setStatusFailed: (state, action) => {
      state.status = 'failed';
      state.error = action.payload.errors;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setCatigories.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(setCatigories.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.catigories = action.payload;
      })
      .addCase(setCatigories.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload.errors;
      })
      .addCase(addNewCatigory.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(addNewCatigory.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.catigories = [...state?.catigories, action?.payload];
      })
      .addCase(addNewCatigory.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload.errors;
      })
      .addCase(deleteCatigory.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(deleteCatigory.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.catigories = state.catigories.filter(catigory => catigory.id !== action.payload)
      })
      .addCase(deleteCatigory.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload.errors;
      })
      .addCase(updateCatigory.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(updateCatigory.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.catigories = state.catigories.map(catigory => catigory.id === action.payload.id ? action.payload : catigory)
      })
      .addCase(updateCatigory.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload.errors;
      })
  }
});
export const setCatigories = createAsyncThunk(
  "catigories/setCatigories",
  async () => {
    const response = await axios.get(`${API}/catigories`);
    return response.data
  }
)
export const addNewCatigory = createAsyncThunk(
  "catigories/addNewCatigory",
  async ({
    newCatigory
  }) => {
    const response = await axios.post(`${API}/catigories`, {
      ...newCatigory
    });
    return response.data
  }
)
export const updateCatigory = createAsyncThunk(
  "catigories/updateCatigory",
  async ({
    catigory
  }) => {
    const response = await axios.put(`${API}/catigories/${catigory.id}`, {
      ...catigory
    });
    return response.data
  }
)
export const deleteCatigory = createAsyncThunk(
  "catigories/deleteCatigory",
  async ({
    id
  }) => {
    await axios.delete(`${API}/catigories/${id}`);
    return id
  }
)
export const {
  handleInputChangeReducer,
  resitCatigory,
  setUpdateCatigory,
  setStatusLoading,
  setStatusSucceeded,
  setStatusFailed,
  clearError,
} = catigoriesSlice.actions;

export const selectStatus = state => state.catigories.status;
export const selectCatigories = state => state.catigories.catigories;
export const selectCatigoriesState = state => state.catigories.state;
export const selectError = state => state.catigories.error;
export const selectMood = state => state.catigories.mood;

export default catigoriesSlice.reducer;