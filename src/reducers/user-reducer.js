import { createSlice } from "@reduxjs/toolkit";
import {buyerLoginThunk, buyerUpdateThunk} from "../services/buyer-thunks.js";
import { sellerLoginThunk } from "../services/seller-thunks.js";

const initialState = {
    lastAttempt: null,
    profile: null,
    type: null,
    error: null
}

const userSlice = createSlice(
    {
        name: 'user',
        initialState,
        reducers: {
            clearLogin: (state) => {
                state.profile = null;
                state.type = null;
                state.error = null;
            },
            logoutUser: (state) => {
                state.profile = null;
                state.type = '';
                state.error = null;
            }
        },
        extraReducers: {
            [buyerLoginThunk.fulfilled]:
                (state, { payload }) => {;
                    state.lastAttempt = Date.now();
                    state.profile = payload;
                    state.type = 'buyer';
                    state.error = null;
                },
            [buyerLoginThunk.rejected]:
                (state, { payload }) => {
                    state.lastAttempt = Date.now();
                    state.profile = null;
                    state.type = null;
                    state.error = payload.error;
                },
            [buyerUpdateThunk.fulfilled]:
                (state, { payload }) => {
                    state.profile.addresses.push(payload.address);
                },
            [sellerLoginThunk.fulfilled]:
                (state, { payload }) => {
                    state.lastAttempt = Date.now();
                    state.profile = payload;
                    state.type = 'seller';
                    state.error = null;
                },
            [sellerLoginThunk.rejected]:
                (state, { payload }) => {
                    state.lastAttempt = Date.now();
                    state.profile = null;
                    state.type = null;
                    state.error = payload.error;
                },
        },

    });

export default userSlice.reducer;
export const { logoutUser, clearLogin } = userSlice.actions;
