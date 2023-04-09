import {createSlice} from "@reduxjs/toolkit";
import {findBuyerByUsernameAndPasswordThunk,} from "../services/buyer-thunks.js";

const initialState = {
    currentUser: JSON.parse(localStorage.getItem('currentUser')) || {},
    type: ''
}

const userSlice = createSlice(
    {
        name: 'currentUser',
        initialState,
        extraReducers: {
            [findBuyerByUsernameAndPasswordThunk.fulfilled] :
                (state, { payload }) => {
                    state.currentUser = payload
                    state.type = "buyer" //need to fix
                    localStorage.setItem('currentUser', JSON.stringify(payload));
                },
        },
        reducers: {
            loadUserFromStorage: (state) => {
                state.currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
            },
            logoutUser: (state) => {
                state.currentUser = {};
                localStorage.removeItem('currentUser');
            }
        }
    });

export const { loadUserFromStorage, logoutUser } = userSlice.actions;

export default userSlice.reducer;
