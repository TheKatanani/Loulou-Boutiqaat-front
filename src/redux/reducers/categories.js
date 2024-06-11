import {
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';
import {
  MOOD,
  STATUS
} from '../../Actions';
import axios from '../../api/axios'; 
const initailState = {
  name: "",
  description: "",
  background: "",
  published: true
}
export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    formData: initailState,
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
      state.formData[id] = value
    },
    resitCategory: (state) => {
      state.formData = initailState
      state.mood = MOOD.ADD
    },
    setUpdateCategory: (state, action) => {
      state.formData = action.payload.category
      state.mood = MOOD.UPDATE
      state.error = null
    },
    cancelUpdate:(state)=>{
      state.mood = MOOD.ADD;
      state.error = null;
      state.formData = initailState;
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
      .addCase(setCategories.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(setCategories.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.categories = action.payload;
      })
      .addCase(setCategories.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        if (action.error?.name === "AxiosError") {
          state.error = {
            isAxiosError: action?.error?.message
          }
        } else {
          state.error = action?.error;
        }
      })
      .addCase(addNewCategory.pending, (state) => {
        state.status = STATUS.LOADING;
        state.error = null
      })
      .addCase(addNewCategory.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.categories = [...state?.categories, action?.payload];
        state.formData = initailState 
      })
      .addCase(addNewCategory.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        if (action.error?.name === "AxiosError") {
          state.error = {
            isAxiosError: action?.error?.message
          }
        } else {
          state.error = action?.error;
        }
      })
      .addCase(deleteCategory.pending, (state) => {
        state.status = STATUS.LOADING;
        state.error = null
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.categories = state.categories.filter(category => category.id !== action.payload)
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        if (action.error?.name === "AxiosError") {
          state.error = {
            isAxiosError: action?.error?.message
          }
        } else {
          state.error = action?.error;
        }
      })
      .addCase(updateCategory.pending, (state) => {
        state.status = STATUS.LOADING;
        state.error = null
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.mood = MOOD.ADD
        state.formData = initailState
        state.categories = state.categories.map(category => category.id === action.payload.id ? action.payload : category)
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        console.log(action.error?.name === "AxiosError");
        if (action.error?.name === "AxiosError") {
          state.error = {
            isAxiosError: action?.error?.message
          }
        } else {
          state.error = action?.error;
        }
      })
  }
});
export const setCategories = createAsyncThunk(
  "categories/setCategories",
  async () => {
    const response = await axios.get(`/category`);
    return response.data
  }
)
export const addNewCategory = createAsyncThunk(
  "categories/addNewCategory",
  async ({
    newcategory,
    axiosPrivate
  }) => {
    const response = await axiosPrivate.post(`/category`, {
      ...newcategory
    });
    return response.data
  }
)
export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({
    category,
    axiosPrivate
  }) => {
    const response = await axiosPrivate.put(`/category/${category.id}`, {
      ...category
    });
    return response.data
  }
)
export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async ({
    id,
    axiosPrivate
  }) => {
    await axiosPrivate.delete(`/category/${id}`);
    return id
  }
)
export const {
  handleInputChangeReducer,
  resitCategory,
  setUpdateCategory,
  setStatusLoading,
  setStatusSucceeded,
  setStatusFailed,
  clearError,
  cancelUpdate
} = categoriesSlice.actions;

export const selectStatus = state => state.categories.status;
export const selectCategories = state => state.categories.categories;
export const selectCategoriesFormData = state => state.categories.formData;
export const selectError = state => state.categories.error;
export const selectMood = state => state.categories.mood;

export default categoriesSlice.reducer;