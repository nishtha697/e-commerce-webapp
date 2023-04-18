import { createSlice } from "@reduxjs/toolkit";
import {
    createProductThunk,
    getAllProductsThunk,
    getProductByIdThunk,
    getProductBySellerThunk,
    getProductCategoriesThunk,
    updateProductThunk
} from "../services/products-thunks";

const initialState = {
    products: [],
    loading: false,
    error: null,
    currentProduct: null,
    categories: null,
    newProductCreation: {
        product: null,
        complete: false,
        error: false
    }
}

const productsSlice = createSlice(
    {
        name: 'products',
        initialState,
        reducers: {
            clearNewProductCreation: (state) => {
                state.newProductCreation.complete = false
                state.newProductCreation.error = false
                state.newProductCreation.product = null
            },
        },
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
            [getProductCategoriesThunk.fulfilled]:
                (state, { payload }) => {
                    state.categories = payload
                },
            [createProductThunk.pending]:
                (state, { payload }) => {
                    state.newProductCreation.product = null
                    state.newProductCreation.complete = false
                    state.newProductCreation.error = false
                },
            [createProductThunk.fulfilled]:
                (state, { payload }) => {
                    state.newProductCreation.product = payload
                    state.newProductCreation.complete = true
                    state.newProductCreation.error = false
                    state.products.push(payload)
                },
            [createProductThunk.rejected]:
                (state, { payload }) => {
                    state.newProductCreation.product = null
                    state.newProductCreation.complete = true
                    state.newProductCreation.error = true
                }

        }
    });

export default productsSlice.reducer;
export const { clearNewProductCreation } = productsSlice.actions;