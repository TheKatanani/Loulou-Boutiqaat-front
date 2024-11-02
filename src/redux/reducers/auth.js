import {
    createAsyncThunk,
    // createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit';
import {
    STATUS
} from '../../Actions';
import {
    validationSchemaLogIn
} from '../../validationSchema';
import axios from '../../api/axios';
const initailFormState = {
    phone: "",
    selectPhone: "+972",
    password: "", 
    showPassword: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        token: null,
        status: 'idle',
        error: null,
        user: {},
        formData: initailFormState,
        // {
        //     "id": "",
        //     "name": "",
        //     "password": "",
        //     "gender": "",
        //     "phone": "",
        //     "barthDay": "", 
        //     "role":""
        // }
    },
    reducers: {
        setAxiosPrivate: (state, action) => {
            state.axiosPrivate = action.payload
        },
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
            state.error = action.payload?.error;
        },
        clearError: (state) => {
            state.error = null;
        },
        showPassword: (state) => {
            state.formData.showPassword = !state.formData.showPassword
        },
        setLogIn(state, action) {
            state.isAuthenticated = true;
            state.token = action.payload;
        },
        setAuthentecated(state, action) {
            state.token = action.payload?.token;
            state.isAuthenticated = true;
            state.user = action.payload?.user
            state.status = STATUS.SUCCEEDED; 
        },
        setUser(state, action) {
            state.user = action.payload
        },
        handlelocalLogout(state) {
            state.token = '';
            state.isAuthenticated = false;
            state.user = {}
        },
        resetUserInfo: (state) => {
            state.isAuthenticated = false
            state.token = null
            state.status = 'idle'
            state.error = null
            state.user = {}
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(handleLogin.pending, (state) => {
                state.status = STATUS.LOADING;
                state.error = null;
            })
            .addCase(handleLogin.fulfilled, (state, action) => {
                if (action.payload?.errors) {
                    state.status = STATUS.FAILED;
                    state.error = action.payload?.errors
                } else if (action.payload?.data) {
                    state.token = action.payload?.data?.accessToken;
                    state.isAuthenticated = true;
                    state.user = action.payload?.data?.user
                    state.status = STATUS.SUCCEEDED; 
                    state.formData = initailFormState
                } else {
                    state.status = STATUS.FAILED;
                }
            })
            .addCase(handleLogin.rejected, (state, action) => {
                state.status = STATUS.FAILED;
                state.error = action.error
            })
            .addCase(handleRefresh.pending, (state) => {
                state.status = STATUS.LOADING;
                state.error = null;
            })
            .addCase(handleRefresh.fulfilled, (state, action) => {
                state.token = action.payload?.accessToken;
                state.isAuthenticated = true;
                state.user = action.payload?.user
                state.status = STATUS.SUCCEEDED;
            })
            .addCase(handleRefresh.rejected, (state, action) => {
                state.status = STATUS.FAILED;
                // state.error = action?.error //you must add token expired while using the app
            })
            .addCase(handleLogout.pending, (state) => {
                state.status = STATUS.LOADING;
                state.error = null;
            })
            .addCase(handleLogout.fulfilled, (state, action) => {
                state.status = STATUS.SUCCEEDED;
                if (action.payload === 204) { // the sarver send this status for logout success with no content 
                    state.token = '';
                    state.isAuthenticated = false;
                    state.user = {} 
                }
            })
            .addCase(handleLogout.rejected, (state, action) => {
                state.status = STATUS.FAILED;
                state.error = action?.error
            })
    }
});
export const handleLogin = createAsyncThunk(
    "auth/handleLogin",
    async ({
        formData
    }) => {
        try {
            await validationSchemaLogIn.validate(formData, {
                abortEarly: false // to get all the form errors
            });
            const res = await axios.post('/login', {
                phone: `${formData.selectPhone}${formData.phone}`,
                password: formData.password, 
            }, {
                withCredentials: true,
                // signal: controller.signal
            })
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
export const handleRefresh = createAsyncThunk(
    "auth/handleRefresh",
    async () => {
        const res = await axios.get('/refresh', {
            withCredentials: true,
        })
        if (res) {
            return res?.data
        }
    })
export const handleLogout = createAsyncThunk(
    "auth/handleLogout",
    async () => {
        const res = await axios.post('/logout', undefined, {
            withCredentials: true,
        })
        if (res) {
            return res?.status
        }
    })
export const selectUser = state => state.auth.user
export const selectToken = state => state.auth.token
export const selectStatus = state => state.auth.status;
export const selectError = state => state.auth.error;
export const SelectIsAuthenticated = state => state.auth.isAuthenticated
export const selectFormData = state => state.auth.formData 

export const {
    handleInputChange,
    handleCheckBoxChange,
    setStatusIdle,
    setStatusLoading,
    setStatusSucceeded,
    setStatusFailed,
    clearError,
    showPassword,
    setLogIn,
    setAxiosPrivate,
    handlelocalLogout,
    setUser,
    resetUserInfo,
    setAuthentecated
} = authSlice.actions;
export default authSlice.reducer;