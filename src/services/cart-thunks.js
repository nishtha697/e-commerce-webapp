import axios from 'axios'
import { createAsyncThunk } from "@reduxjs/toolkit"

const SHOPPING_CART_API = 'http://localhost:4000/api/shopping-cart';

export const shoppingCartCreateThunk = createAsyncThunk('shopping-cart/create',
    async (shoppingCart, { rejectWithValue }) => {
        try {
            const response = await axios.post(SHOPPING_CART_API, shoppingCart);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }

    })

export const shoppingCartDeleteThunk = createAsyncThunk('shopping-cart/delete',
    async (username, { rejectWithValue }) => {
        try {

            const response = await axios.delete(`${SHOPPING_CART_API}/${username}`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    })

export const shoppingCartFindThunk = createAsyncThunk('shopping-cart/find',
    async (username, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${SHOPPING_CART_API}/${username}`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    })

export const shoppingCartAddProductThunk = createAsyncThunk('shopping-cart/add',
    async ({ username, product }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${SHOPPING_CART_API}/${username}/add`, product);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    })

export const shoppingCartDeleteProductThunk = createAsyncThunk('shopping-cart/deleteProduct',
    async ({ username, productId }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${SHOPPING_CART_API}/${username}/delete/${productId}`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    })

export const shoppingCartUpdateProductThunk = createAsyncThunk('shopping-cart/update',
    async ({ username, productId, quantity }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${SHOPPING_CART_API}/${username}/update/${productId}`, { quantity });
            return response.data;

        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    })
