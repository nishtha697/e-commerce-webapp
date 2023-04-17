import { createSlice } from "@reduxjs/toolkit";
import {
    createProductThunk,
    getAllProductsThunk,
    getProductByIdThunk,
    getProductBySellerThunk,
    updateProductThunk
} from "../services/products-thunks";

const initialState = {
    products: [],
    loading: false,
    error: null,
    currentProduct: null
}

const productsSlice = createSlice(
    {
        name: 'products',
        initialState,
        reducers: {},
        extraReducers: {
            [getAllProductsThunk.pending]:
                (state) => {
                    state.currentProduct = null
                },
            [getAllProductsThunk.fulfilled]:
                (state, { payload }) => {
                    state.loading = false
                    state.products = payload
                    state.error = null
                },
            [getAllProductsThunk.rejected]:
                (state, action) => {
                    state.loading = false
                    state.products = []
                    state.error = action.error
                },
            [getProductByIdThunk.fulfilled]:
                (state, { payload }) => {
                    state.loading = false
                    state.currentProduct = payload
                },
            [getProductBySellerThunk.pending]:
                (state) => {
                    state.loading = true
                    state.products = []
                    state.error = null
                },
            [getProductBySellerThunk.fulfilled]:
                (state, { payload }) => {
                    state.loading = false
                    state.products = payload
                    state.error = null
                },
            [getProductBySellerThunk.rejected]:
                (state, action) => {
                    state.loading = false
                    state.products = []
                    state.error = action.error
                },
            [updateProductThunk.fulfilled]:
                (state, { payload }) => {
                    state.loading = false
                    if (payload) {
                        state.currentProduct = payload
                    }
                },
            [createProductThunk.fulfilled]:
                (state, { payload }) => {
                    state.loading = false
                    state.products.push(payload)
                }

        }
    });

export default productsSlice.reducer;
