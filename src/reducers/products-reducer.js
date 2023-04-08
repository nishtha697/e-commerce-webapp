import {createSlice} from "@reduxjs/toolkit";
import {
    createProductThunk,
    findProductsByIdThunk,
    findProductsThunk, updateProductThunk
} from "../services/products-thunks";

const initialState = {
    products: [],
    loading: false
}

const productsSlice = createSlice(
    {
        name: 'products',
        initialState,
        extraReducers: {
            [findProductsThunk.pending]:
                (state) => {
                    state.loading = true
                    state.products = []
                },
            [findProductsThunk.fulfilled]:
                (state, {payload}) => {
                    state.loading = false
                    state.products = payload
                },
            [findProductsThunk.rejected]:
                (state, action) => {
                    state.loading = false
                    state.error = action.error
                },
            [findProductsByIdThunk.fulfilled] :
                (state, { payload }) => {
                    state.loading = false
                    const productIndex = state.products
                        .findIndex((p) => p.product_id === payload.product_id)
                    state.products[productIndex] = {
                        ...state.products[productIndex],
                        ...payload
                    }
                },
            [createProductThunk.fulfilled]:
                (state, { payload }) => {
                    state.loading = false
                    state.products.push(payload)
                },
            [updateProductThunk.fulfilled]:
                (state, { payload }) => {
                    state.loading = false
                    const productIndex = state.products
                        .findIndex((p) => p.product_id === payload.product_id)
                    state.products[productIndex] = {
                        ...state.products[productIndex],
                        ...payload
                    }
                }
        },
        reducers: {}
    });

export default productsSlice.reducer;
