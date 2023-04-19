import { createSlice } from "@reduxjs/toolkit";
import { buyerLoginThunk, buyerAddAddressThunk, buyerDeleteAddressThunk, buyerUpdateAddressThunk, buyerUpdateProfileThunk } from "../services/buyer-thunks.js";
import {
    sellerByUsernameThunk,
    sellerLoginThunk,
    sellerUpdateProfileThunk
} from "../services/seller-thunks.js";

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
                (state, { payload }) => {
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

            [buyerAddAddressThunk.fulfilled]:
                (state, { payload }) => {
                    state.profile.addresses.push(payload.address);
                },
            [buyerDeleteAddressThunk.fulfilled]:
                (state, { payload }) => {
                    state.profile.addresses = state.profile.addresses.filter(addr => addr.id !== payload.addressId);
                },
            [buyerUpdateAddressThunk.fulfilled]:
                (state, { payload }) => {
                    const newAddresses = state.profile.addresses.map(addr => {
                        if (addr.id === payload.address.id) {
                            return payload.address
                        }
                        return addr
                    })
                    state.profile.addresses = newAddresses
                },
            [buyerUpdateProfileThunk.fulfilled]:
                (state, { payload }) => {
                    state.profile = payload.newProfile;
                },
            [sellerLoginThunk.fulfilled]:
                (state, { payload }) => {
                    state.lastAttempt = Date.now();
                    state.profile = payload;
                    state.type = 'seller';
                    state.error = null;
                },
            [sellerLoginThunk.rejected]:
                (state, action ) => {
                    state.lastAttempt = Date.now();
                    state.profile = null;
                    state.type = null;
                    state.error = action.error;
                },
            [sellerUpdateProfileThunk.fulfilled]:
                (state, { payload }) => {
                    state.profile = payload.newProfile;
                },
        },

    });

export default userSlice.reducer;
export const { logoutUser, clearLogin } = userSlice.actions;
