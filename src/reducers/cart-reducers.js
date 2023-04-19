import { createSlice } from "@reduxjs/toolkit";
import {
    shoppingCartDeleteProductThunk,
    shoppingCartDeleteThunk,
    shoppingCartFindThunk,
    shoppingCartUpdateProductThunk
} from "../services/cart-thunks";

const initialState = {
    shoppingCart: {},
    error: null
}

const shoppingCartSlice = createSlice(
    {
        name: 'shoppingCart',
        initialState,
        reducers: {},
        extraReducers: {
            [shoppingCartFindThunk.pending]:
                (state) => {
                    state.shoppingCart = {}
                    state.error = null
                },
            [shoppingCartFindThunk.fulfilled]:
                (state, { payload }) => {
                    state.shoppingCart = payload
                    state.error = null
                },
            [shoppingCartFindThunk.rejected]:
                (state, action) => {
                    state.shoppingCart = {}
                    state.error = action.error
                },
            [shoppingCartDeleteThunk.fulfilled]:
                (state, { payload }) => {
                    state.error = null
                    state.shoppingCart = {}
                },
            [shoppingCartDeleteThunk.rejected]:
                (state, action) => {
                    state.error = action.error
                },
            [shoppingCartUpdateProductThunk.fulfilled]:
                (state, { payload }) => {
                    state.error = null
                    state.shoppingCart.products = state.shoppingCart.products.map(product => {
                        if (product.productId === Number(payload.productId)) {
                            return { ...product, quantity: payload.quantity };
                        } else {
                            return product;
                        }
                    });
                },
            [shoppingCartDeleteProductThunk.fulfilled]:
                (state, { payload }) => {
                    state.error = null
                    state.shoppingCart.products =
                        state.shoppingCart.products.filter(
                            product => product.productId !== Number(payload.deletedProductId));
                },

        }
    });

export default shoppingCartSlice.reducer;
