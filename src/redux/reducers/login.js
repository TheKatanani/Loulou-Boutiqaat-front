import {
    createSlice
} from '@reduxjs/toolkit';
import {
    STATUS
} from '../../Actions';
const initailState = {
    phone: "",
    selectPhone: "+972",
    password: "",
    agree: false,
    showPassword: false,
}
const loginSlice = createSlice({
    name: 'login',
    initialState: {
        formData: initailState,
        status: 'idle',
        error: null,
    },
    reducers: {
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
            state.error = action.payload.errors;
        },
        clearError: (state) => {
            state.error = null;
        },
        showPassword: (state) => {
            state.formData.showPassword = !state.showPassword
        },
    },
});
export const selectFormData = state => state.login.formData
export const selectStatus = state => state.login.status;
export const selectError = state => state.login.error;
export const {
    handleInputChange,
    setStatusIdle,
    setStatusLoading,
    setStatusSucceeded,
    setStatusFailed,
    clearError,
    handleCheckBoxChange,
    showPassword
} = loginSlice.actions;
export default loginSlice.reducer;