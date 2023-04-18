import { createSlice } from "@reduxjs/toolkit";
import {
    shoppingCartCreateThunk,
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
            [shoppingCartCreateThunk.pending]:
                (state, { payload }) => {
                    state.shoppingCart = {}
                },
            [shoppingCartCreateThunk.fulfilled]:
                (state, { payload }) => {
                    state.shoppingCart.product = payload
                },
            [shoppingCartCreateThunk.rejected]:
                (state, { payload }) => {
                    state.shoppingCart = {}
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
