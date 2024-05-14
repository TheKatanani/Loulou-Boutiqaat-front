import {
    // createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit';
// import axios from 'axios';
// import { DEV_API } from '../../API';
// import { STATUS } from '../../Actions';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: localStorage.getItem('token') ? true : false,
        token: JSON.parse(localStorage.getItem('token')) || null,
        status:'',
        user: JSON.parse(localStorage.getItem('user'))||{},
        // {
        //     "id": "",
        //     "name": "",
        //     "password": "",
        //     "gendar": "",
        //     "phone": "",
        //     "barthDay": "", 
        //     "role":""
        // }
    },
    reducers: {
        setLogIn(state, action) {
            state.isAuthenticated = true;
            state.token = action.payload.token;
            localStorage.setItem("token",JSON.stringify(action.payload.token))
        },
        setLogOut(state) {
            state.isAuthenticated = false;
            state.token = null;
            state.user = {};
            localStorage.removeItem("token")
            localStorage.removeItem("user")
        },
        setUser(state, action) {
            state.user = action.payload
            localStorage.setItem('user',JSON.stringify(action.payload))
        },  
    },
}); 
export const selectUser = state =>state.auth.user
export const SelectIsAuthenticated = state => state.auth.isAuthenticated
export const { 
    saveForLater,
    setLogIn,
    setLogOut,
    setUser
} = authSlice.actions;
export default authSlice.reducer;