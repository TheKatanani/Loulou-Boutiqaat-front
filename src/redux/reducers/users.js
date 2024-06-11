import {
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';
import {
  MOOD,
  ROLES,
  STATUS
} from '../../Actions';

const initialAddUserstate = {
  name: '',
  phone: "",
  selectPhone: "+972",
  password: "",
  confirmPassword: "",
  gender: 'female',
  barthDay: '2000-01-01',
  role: Object.keys(ROLES)[0],//user
  agree: false
}
export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    addUserState: initialAddUserstate,
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
      state.addUserState[id] = value
    },
    handleCheckBoxChange: (state, action) => {
      const {
        id,
        checked
      } = action.payload
      state.addUserState[id] = checked
    },
    showPassword: (state) => {
      state.showPassword = !state.showPassword
    },
    reSetUser: (state) => {
      state.addUserState = initialAddUserstate
      state.mood = MOOD.ADD
    },
    setUpdateUser: (state, action) => {
      const selectPhone = action.payload.user?.phone?.slice(0, 4)
      const phone = action.payload.user?.phone?.slice(4)
      const agree = true
      const user = {
        ...action.payload.user,
        selectPhone,
        phone,
        agree
      }
      state.addUserState = user
      state.mood = MOOD.UPDATE
      state.error = null
    },
    setUsersReducer: (state, action) => {
      state.users = action.payload;
    },
    setGender: (state, action) => {
      state.addUserState.gender = action.payload
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
    setError: (state, action) => {
      state.error = {
        ...state.error,
        ...action.payload.errors
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setUsers.pending, (state) => {
        state.status = STATUS.LOADING;
        state.error = null
      })
      .addCase(setUsers.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.users = action.payload;
      })
      .addCase(setUsers.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        if (action.error?.name === "AxiosError") {
          state.error = {
            isAxiosError: action?.error?.message
          }
        } else {
          state.error = action?.error;
        }
      })
      .addCase(addNewUser.pending, (state) => {
        state.status = STATUS.LOADING;
        state.error = null 
      })
      .addCase(addNewUser.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.addUserState = initialAddUserstate
        state.users = [...state?.users, action?.payload];
      })
      .addCase(addNewUser.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.users = state.users.filter(user => user.id !== action.payload)
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.mood = MOOD.ADD
        state.addUserState = initialAddUserstate
        state.users = state.users.map(user => user.id === action.payload.id ? action.payload : user)
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload;
      })
  }
});
export const setUsers = createAsyncThunk(
  "users/setUsers",
  async ({
    axiosPrivate
  }) => {
    const response = await axiosPrivate.get(`/users`);
    return response.data
  }
)
export const addNewUser = createAsyncThunk(
  "users/addNewUser",
  async ({
    user,
    axiosPrivate
  }) => {
    const response = await axiosPrivate.post(`/users`, {
      ...user
    });
    return response.data
  }
)
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({
    user,
    axiosPrivate
  }) => {
    const response = await axiosPrivate.put(`/users/${user.id}`, {
      ...user
    });
    return response.data
  }
)
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async ({
    id,
    axiosPrivate
  }) => {
    await axiosPrivate.delete(`/users/${id}`);
    return id
  }
)
export const {
  reSetUser,
  setUpdateUser,
  handleInputChangeReducer,
  handleCheckBoxChange,
  setUsersReducer,
  setStatusIdle,
  setStatusLoading,
  setStatusSucceeded,
  setStatusFailed,
  setError,
  setGender,
  showPassword,
  clearError,
} = usersSlice.actions;

export const selectAddUserState = state => state.users.addUserState;
export const selectUsers = state => state.users.users;
export const selectMood = state => state.users.mood;
export const selectStatus = state => state.users.status;
export const selectError = state => state.users.error;
export const selectShowPassword = state => state.users.showPassword;


export default usersSlice.reducer;