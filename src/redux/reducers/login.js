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