import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit';
import axios from 'axios';
import {
    API
} from '../../API';
import {
    STATUS
} from '../../Actions';

const socialSlice = createSlice({
    name: 'social',
    initialState: {
        formData: {},
        error: {},
        status: 'idle',
    },
    reducers: {
        handleInputChange: (state, action) => {
            const {
                id,
                value
            } = action.payload
            state.formData[id] = value
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
            state.error = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload.errors
        },
        showPassword: (state) => {
            state.showPassword = !state.showPassword
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(setSocial.pending, (state) => {
                state.status = STATUS.LOADING;
            })
            .addCase(setSocial.fulfilled, (state, action) => {
                state.status = STATUS.SUCCEEDED;
                state.formData = action.payload;
            })
            .addCase(setSocial.rejected, (state, action) => {
                state.status = STATUS.FAILED;
                state.error = action.payload;
            })
            .addCase(saveSocial.pending, (state) => {
                state.status = STATUS.LOADING;
            })
            .addCase(saveSocial.fulfilled, (state, action) => {
                state.status = STATUS.SUCCEEDED;
                state.formData = action.payload;
            })
            .addCase(saveSocial.rejected, (state, action) => {
                state.status = STATUS.FAILED;
                state.error = action.payload;
            })
    }
});
export const setSocial = createAsyncThunk(
    "social/setSocial",
    async () => {
        const response = await axios.get(`${API}/social`);
        return response.data
    }
)
export const saveSocial = createAsyncThunk(
    "socials/saveSocial",
    async ({
        social
    }) => {
        const response = await axios.post(`${API}/social`, {
            ...social
        });
        return response.data
    }
)
export const selectFormData = state => state.social.formData
export const selectSocial = state => state.social.formData
export const selectStatus = state => state.social.status

export const {
    handleInputChange,
    setLoading,
    setError,
    handleCheckBoxChange,
    showPassword
} = socialSlice.actions;
export default socialSlice.reducer;