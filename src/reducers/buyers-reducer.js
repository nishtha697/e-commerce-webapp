import { createSlice } from "@reduxjs/toolkit";
import {
    createBuyerThunk,
    findBuyersByIdThunk,
    findBuyersThunk,
    updateBuyerThunk
} from "../services/buyer-thunks.js";

const initialState = {
    buyers: [],
    loading: false
}

const buyersSlice = createSlice(
    {
        name: 'buyers',
        initialState,
        reducers: {},
        extraReducers: {
            [findBuyersThunk.pending]:
                (state) => {
                    state.loading = true
                    state.buyers = []
                },
            [findBuyersThunk.fulfilled]:
                (state, { payload }) => {
                    state.loading = false
                    state.buyers = payload
                },
            [findBuyersThunk.rejected]:
                (state, action) => {
                    state.loading = false
                    state.error = action.error
                },
            [findBuyersByIdThunk.fulfilled]:
                (state, { payload }) => {
                    state.loading = false
                    const buyerIndex = state.buyers.findIndex((p) => p.buyer_id === payload.buyer_id)
                    state.buyers[buyerIndex] = {
                        ...state.buyers[buyerIndex],
                        ...payload
                    }
                },
            [createBuyerThunk.fulfilled]:
                (state, { payload }) => {
                    state.loading = false
                    state.buyers.push(payload)
                },
            [createBuyerThunk.rejected]:
                (state, action) => {
                   console.log(action.payload)
                },
            [updateBuyerThunk.fulfilled]:
                (state, { payload }) => {
                    state.loading = false
                    const buyerIndex = state.buyers.findIndex((p) => p.buyer_id === payload.buyer_id)
                    state.buyers[buyerIndex] = {
                        ...state.buyers[buyerIndex],
                        ...payload
                    }
                }
        }
    });

export default buyersSlice.reducer;
