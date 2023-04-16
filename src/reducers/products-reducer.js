import { createSlice } from "@reduxjs/toolkit";
import {
    createProductThunk,
    findProductsByIdThunk,
    findProductsThunk,
    updateProductThunk
} from "../services/products-thunks";

const initialState = {
    products: [],
    loading: false,
    error: null,
    currentProduct : null
}

const productsSlice = createSlice(
    {
        name: 'products',
        initialState,
        reducers: {},
        extraReducers: {
            [findProductsThunk.pending]:
                (state) => {
                    state.loading = true
                    state.products = []
                    state.error = null
                },
            [findProductsThunk.fulfilled]:
                (state, { payload }) => {
                    state.loading = false
                    state.products = payload
                    state.error = null
                },
            [findProductsThunk.rejected]:
                (state, action) => {
                    state.loading = false
                    state.products = []
                    state.error = action.error
                },
            [findProductsByIdThunk.fulfilled]:
                (state, { payload }) => {
                    state.loading = false
                    const productIndex = state.products.findIndex((p) => p.product_id === payload.product_id)
                    state.products[productIndex] = {
                        ...state.products[productIndex],
                        ...payload
                    }
                    state.currentProduct = payload[0]
                },
            [createProductThunk.fulfilled]:
                (state, { payload }) => {
                    state.loading = false
                    state.products.push(payload)
                },
            [updateProductThunk.fulfilled]:
                (state, { payload }) => {
                    state.loading = false
                    const productIndex = state.products.findIndex((p) => p.product_id === payload.product_id)
                    state.products[productIndex] = {
                        ...state.products[productIndex],
                        ...payload
                    }
                }
        }
    });

export default productsSlice.reducer;
