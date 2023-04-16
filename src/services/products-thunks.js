import axios from 'axios'
import { createAsyncThunk } from "@reduxjs/toolkit"

const PRODUCTS_API = 'http://localhost:4000/api/products';

export const findProductsThunk = createAsyncThunk('products/findProducts',
    async () => {
        const response = await axios.get(PRODUCTS_API);
        return response.data;
    })

export const findProductsByIdThunk = createAsyncThunk('products/findProductById',
    async (product_id) => {
        const response = await axios.get(`${PRODUCTS_API}/${product_id}`);
        return response.data;
    })

export const createProductThunk = createAsyncThunk('products/createProduct',
    async (product) => {
        const response = await axios.post(PRODUCTS_API, product);
        return response.data;
    })

export const updateProductThunk = createAsyncThunk('products/updateProduct',
    async (product) => {
        await axios.put(`${PRODUCTS_API}/${product.product_id}`, product);
        return product;
    })
