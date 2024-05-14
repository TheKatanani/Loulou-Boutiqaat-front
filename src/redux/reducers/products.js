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

const initialAddProductState = {
  name: '',
  discription: '',
  price: 0,
  previousPrice: 0,
  images: [],
  count: 0,
  stars: 1,
  isVisibile: 1,
  catigoryId: ''
}
export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
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
      state.error = action.payload.errors;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setProducts.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(setProducts.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.products = action.payload;
      })
      .addCase(setProducts.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload.errors;
      })
      .addCase(addNewProduct.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.error = null
        state.products = [...state?.products, action?.payload];
      })
      .addCase(addNewProduct.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload.errors;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.products = state.products.filter(product => product.id !== action.payload)
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload.errors;
      })
      .addCase(updateProduct.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.error = null
        state.products = state.products.map(product => product.id === action.payload.id ? action.payload : product)
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload.errors;
      })
  }
});
export const setProducts = createAsyncThunk(
  "products/setProducts",
  async () => {
    const response = await axios.get(`${API}/products`);
    return response.data
  }
)
export const addNewProduct = createAsyncThunk(
  "products/addNewProduct",
  async ({
    newProduct
  }) => {
    const response = await axios.post(`${API}/products`, {
      ...newProduct
    });
    return response.data
  }
)
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({
    product
  }) => {
    const response = await axios.put(`${API}/products/${product.id}`, {
      ...product
    });
    return response.data
  }
)
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async ({
    id
  }) => {
    await axios.delete(`${API}/products/${id}`);
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
} = productsSlice.actions;

export const selectAddProductsState = state => state.products.addProductState;
export const selectProducts = state => state.products.products;
export const selectMood = state => state.products.mood;
export const selectStatus = state => state.products.status;
export const selectError = state => state.products.error;


export default productsSlice.reducer;