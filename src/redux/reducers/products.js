import {
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';
import {
  MOOD,
  STATUS
} from '../../Actions';
import axios from '../../api/axios';

const initialAddProductState = {
  name: '',
  description: '',
  price: 0,
  prevPrice: 0,
  images: [],
  count: 0,
  stars: 1,
  published: false,
  categoryId: ''
}
export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    publishedProducts: [],
    addProductState: initialAddProductState,
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
      state.addProductState[id] = value
    },
    resitProduct: (state) => {
      state.addProductState = initialAddProductState
      state.mood = MOOD.ADD
    },
    setUpdateProduct: (state, action) => {
      state.addProductState = action.payload.product
      state.mood = MOOD.UPDATE
      state.error = null
    },
    cancelUpdate: (state) => {
      state.mood = MOOD.ADD;
      state.error = null;
      state.addProductState = initialAddProductState;
    },
    setProductsReducer: (state, action) => {
      state.products = action.payload;
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
      state.error = action.payload?.errors;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setProducts.pending, (state) => {
        state.status = STATUS.LOADING;
        state.error = null
      })
      .addCase(setProducts.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.products = action.payload;
      })
      .addCase(setProducts.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        if (action.error?.name === "AxiosError") {
          state.error = {
            isAxiosError: action?.error?.message
          }
        } else {
          state.error = action?.error;
        }
      })
      .addCase(setPublishedProducts.pending, (state) => {
        state.status = STATUS.LOADING;
        state.error = null
      })
      .addCase(setPublishedProducts.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.publishedProducts = action.payload;
      })
      .addCase(setPublishedProducts.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        if (action.error?.name === "AxiosError") {
          state.error = {
            isAxiosError: action?.error?.message
          }
        } else {
          state.error = action?.error;
        }
      })
      .addCase(addNewProduct.pending, (state) => {
        state.status = STATUS.LOADING;
        state.error = null
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.products = [...state?.products, action?.payload];
        state.formData = initialAddProductState
      })
      .addCase(addNewProduct.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        if (action.error?.name === "AxiosError") {
          state.error = {
            isAxiosError: action?.error?.message
          }
        } else {
          state.error = action?.error;
        }
      })
      .addCase(deleteProduct.pending, (state) => {
        state.status = STATUS.LOADING;
        state.error = null
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.products = state.products.filter(product => product.id !== action.payload)
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        if (action.error?.name === "AxiosError") {
          state.error = {
            isAxiosError: action?.error?.message
          }
        } else {
          state.error = action?.error;
        }
      })
      .addCase(updateProduct.pending, (state) => {
        state.status = STATUS.LOADING;
        state.error = null
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.products = state.products.map(product => product.id === action.payload.id ? action.payload : product)
        state.mood = MOOD.ADD
        state.addProductState = initialAddProductState
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = STATUS.FAILED;
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
export const setProducts = createAsyncThunk(
  "products/setProducts",
  async () => {
    const response = await axios.get(`/product`);
    return response.data
  }
)
export const setPublishedProducts = createAsyncThunk(
  "products/setPublishedProducts",
  async () => {
    const response = await axios.get(`/product/published`);
    return response.data
  }
)
export const addNewProduct = createAsyncThunk(
  "products/addNewProduct",
  async ({
    newProduct,
    axiosPrivate
  }) => {
    const response = await axiosPrivate.post(`/product`, {
      ...newProduct,
      count: parseInt(newProduct?.count),
      price: parseInt(newProduct?.price),
      prevPrice: parseInt(newProduct?.prevPrice)
    });
    return response.data
  }
)
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({
    product,
    axiosPrivate
  }) => {
    const response = await axiosPrivate.put(`/product/${product.id}`, {
      ...product
    });
    return response.data
  }
)
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async ({
    id,
    axiosPrivate
  }) => {
    await axiosPrivate.delete(`/product/${id}`);
    return id
  }
)
export const {
  resitProduct,
  setUpdateProduct,
  handleInputChangeReducer,
  setProductsReducer,
  setStatusIdle,
  setStatusLoading,
  setStatusSucceeded,
  setStatusFailed,
  clearError,
  cancelUpdate
} = productsSlice.actions;

export const selectAddProductsState = state => state.products.addProductState;
export const selectProducts = state => state.products.products;
export const selectPublishedProducts = state => state.products.publishedProducts;
export const selectMood = state => state.products.mood;
export const selectStatus = state => state.products.status;
export const selectError = state => state.products.error;


export default productsSlice.reducer;