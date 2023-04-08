import {createAsyncThunk} from "@reduxjs/toolkit"
import * as service from "./products-service.js"

export const findProductsThunk = createAsyncThunk(
    'products/findProducts', async () =>
        await service.findProducts()
)

export const findProductsByIdThunk = createAsyncThunk(
    'products/findProductById', async (product_id) => {
        await service.findProductsById(product_id)
    }
)

export const createProductThunk = createAsyncThunk(
    'products/createProduct', async (product) => {
        return await service.createProduct(product);
})

export const updateProductThunk =
    createAsyncThunk(
        'products/updateProduct',
        async (product) =>
            await service.updateProduct(product)
    )





