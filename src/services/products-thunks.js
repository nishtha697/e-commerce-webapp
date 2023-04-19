import axios from 'axios'
import { createAsyncThunk } from "@reduxjs/toolkit"

const PRODUCTS_API = 'http://localhost:4000/api/products';

export const getAllProductsThunk = createAsyncThunk('products/all',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${PRODUCTS_API}/all`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    })

export const getProductByIdThunk = createAsyncThunk('products/id',
    async (product_id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${PRODUCTS_API}/${product_id}`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    })

export const getProductBySellerThunk = createAsyncThunk('products/seller',
    async (seller, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${PRODUCTS_API}/seller/${seller}`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    })

export const createProductThunk = createAsyncThunk('products/create',
    async (product, { rejectWithValue }) => {
        try {
            const response = await axios.post(PRODUCTS_API, product);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }

    })

export const updateProductThunk = createAsyncThunk('products/update',
    async (product, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${PRODUCTS_API}/${product.product_id}`, product);
            if (response.data.acknowledged === true) {
                return product;
            }
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    })

export const getProductCategoriesThunk = createAsyncThunk('products/unique-categories',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${PRODUCTS_API}/all-categories`);
            return response.data
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    })

export const getProductFilteredThunk = createAsyncThunk('products/filtered',
    async (filters, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${PRODUCTS_API}/filtered`, filters);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }

    })
