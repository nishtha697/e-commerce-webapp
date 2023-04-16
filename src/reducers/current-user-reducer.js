import { createSlice } from "@reduxjs/toolkit";
import { findBuyerByUsernameAndPasswordThunk } from "../services/buyer-thunks.js";

const initialState = {
    currentUser: null,
    type: '',
    error: null
}

const userSlice = createSlice(
    {
        name: 'currentUser',
        initialState,
        reducers: {
            logoutUser: (state) => {
                state.currentUser = null;
                state.type = '';
                state.error = null;
            }
        },
        extraReducers: {
            [findBuyerByUsernameAndPasswordThunk.fulfilled]:
                (state, { payload }) => {
                    state.currentUser = payload;
                    state.type = "buyer"; //need to fix
                },
            [findBuyerByUsernameAndPasswordThunk.rejected]:
                (state, { payload }) => {
                    state.currentUser = null;
                    state.type = '';
                    state.error = 'Username/password is incorrect';
                },
        },

    });

export default userSlice.reducer;
export const { logoutUser } = userSlice.actions;
