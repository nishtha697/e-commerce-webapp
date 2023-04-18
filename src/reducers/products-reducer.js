import { createSlice } from "@reduxjs/toolkit";
import {
    createProductThunk,
    getAllProductsThunk,
    getProductByIdThunk,
    getProductBySellerThunk,
    getProductCategoriesThunk,
    getProductFilteredThunk,
    getProductSellersThunk,
    updateProductThunk
} from "../services/products-thunks";

const initialState = {
    allProducts: [],
    filteredProducts: [],
    loading: false,
    error: null,
    currentProduct: null,
    categories: null,
    newProductCreation: {
        product: null,
        complete: false,
        error: false
    },
    filters: {
        applied: false,
        categories: [],
        sellers: [],
    },
    appliedFilters: {
        title: null,
        description: null,
        maxPrice: null,
        minPrice: null,
        category: { category1: '', category2: '', category3: '' }
    }
}

const productsSlice = createSlice(
    {
        name: 'products',
        initialState,
        reducers: {
            updateAppliedFilters: (state, { payload }) => {
                state.filters.applied = true
                state.appliedFilters = {
                    ...state.appliedFilters,
                    ...payload
                }
            },
            clearNewProductCreation: (state) => {
                state.newProductCreation.complete = false
                state.newProductCreation.error = false
                state.newProductCreation.product = null
            },
            clearAppliedFilters: (state) => {
                state.filteredProducts = state.allProducts
                state.filters.applied = false
                state.appliedFilters = {
                    title: null,
                    description: null,
                    maxPrice: null,
                    minPrice: null,
                    category: { category1: '', category2: '', category3: '' }
                }
            },
        },
        extraReducers: {
            [getAllProductsThunk.pending]:
                (state) => {
                    state.currentProduct = null
                    state.loading = true
                    state.allProducts = []
                    state.error = null
                },
            [getAllProductsThunk.fulfilled]:
                (state, { payload }) => {
                    state.loading = false
                    state.allProducts = payload
                    state.error = null
                },
            [getAllProductsThunk.rejected]:
                (state, action) => {
                    state.loading = false
                    state.allProducts = []
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
                    state.allProducts = []
                    state.error = null
                },
            [getProductBySellerThunk.fulfilled]:
                (state, { payload }) => {
                    state.loading = false
                    state.allProducts = payload
                    state.error = null
                },
            [getProductBySellerThunk.rejected]:
                (state, action) => {
                    state.loading = false
                    state.allProducts = []
                    state.error = action.error
                },
            [updateProductThunk.fulfilled]:
                (state, { payload }) => {
                    state.loading = false
                    if (payload) {
                        state.currentProduct = payload
                    }
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
                    state.allProducts.push(payload)
                },
            [createProductThunk.rejected]:
                (state, { payload }) => {
                    state.newProductCreation.product = null
                    state.newProductCreation.complete = true
                    state.newProductCreation.error = true
                },

            [getProductCategoriesThunk.fulfilled]:
                (state, { payload }) => {
                    state.categories = payload
                    state.filters.categories = payload
                },
            [getProductSellersThunk.fulfilled]:
                (state, { payload }) => {
                    state.filters.sellers = payload
                },
            [getProductFilteredThunk.fulfilled]:
                (state, { payload }) => {
                    state.loading = false
                    state.filteredProducts = payload
                    state.error = null
                },
            [getProductFilteredThunk.rejected]:
                (state, action) => {
                    state.loading = false
                    state.filteredProducts = []
                    state.error = action.error
                },
        }
    });

export default productsSlice.reducer;
export const { updateAppliedFilters, clearNewProductCreation, clearAppliedFilters } = productsSlice.actions;