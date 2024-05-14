import { createSlice } from '@reduxjs/toolkit';

const portalSlice = createSlice({
    name: 'portal',
    initialState:{
      show:false,
      id:1
    },
    reducers: {
        showPortal(state, action) {
            state.show = action.payload?.show||false;
            state.id=action.payload?.id||1
        },
    },
});

export const { showPortal } = portalSlice.actions;
export default portalSlice.reducer;