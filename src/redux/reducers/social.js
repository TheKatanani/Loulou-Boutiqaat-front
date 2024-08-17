import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit';
import {
    STATUS
} from '../../Actions';
import axios from '../../api/axios';

const socialSlice = createSlice({
    name: 'social',
    initialState: {
        formData: {},
        error: {},
        status: [],
        // status: [{
        //     name: 'Instagram',
        //     status: 'idle'
        // }],
    },
    reducers: {
        handleInputChange: (state, action) => {
            const {
                id,
                value
            } = action.payload
            state.formData = state.formData.map(social => (
                social.name === id ? {
                    ...social,
                    value
                } : social
            ))
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
            .addCase(updateSocial.pending, (state, action) => {
                // state.status = STATUS.LOADING;
                state.status = [];
                const name = action.meta.arg.social.name
                const index = state.status.findIndex(el => el.name === name)
                if (index !== -1) {
                    state.status[index] = {
                        ...state.status[index],
                        status: STATUS.LOADING
                    }
                } else {
                    state.status.push({
                        name,
                        status: STATUS.LOADING
                    })
                }
            })
            .addCase(updateSocial.fulfilled, (state, action) => {
                const name = action.meta.arg.social.name
                const index = state.status.findIndex(el => el.name === name)
                if (index !== -1) {
                    state.status[index] = {
                        ...state.status[index],
                        status: STATUS.SUCCEEDED
                    }
                }
            })
            .addCase(updateSocial.rejected, (state, action) => {
                const name = action.meta.arg.social.name
                const index = state.status.findIndex(el => el.name === name)
                if (index !== -1) {
                    state.status[index] = {
                        ...state.status[index],
                        status: STATUS.FAILED
                    }
                }
                state.error = action.payload;
            })
    }
});
export const setSocial = createAsyncThunk(
    "social/setSocial",
    async () => {
        const response = await axios.get(`/social`);
        return response.data
    }
)
export const updateSocial = createAsyncThunk(
    "socials/updateSocial",
    async ({
        social, // name and value object
        axiosPrivate
    }) => {
        const response = await axiosPrivate.put(`/social`, social);
        return response.data
    }
)
// export const saveSocial = createAsyncThunk(
//     "socials/saveSocial",
//     async ({
//         social
//     }) => {
//         const response = await axios.post(`${API}/social`, {
//             ...social
//         });
//         return response.data
//     }
// )
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