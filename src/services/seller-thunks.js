import axios from 'axios'
import { createAsyncThunk } from "@reduxjs/toolkit"

const SELLER_API = 'http://localhost:4000/api/seller';

export const sellerRegisterThunk = createAsyncThunk('seller/register',
    async (seller, { rejectWithValue }) => {
        try {
            const response = await axios.post(SELLER_API, seller);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }

    })

export const sellerLoginThunk = createAsyncThunk('seller/login',
    async ({ username, password }) => {
        const response = await axios
            .get(`${SELLER_API}/authenticate?username=${username}&password=${password}`);
        return response.data;
    })


// export const sellerUpdateThunk = createAsyncThunk('seller/update',
//     async (seller) => {
//         await axios.put(`${SELLER_API}/${seller.seller_id}`, seller);
//         return seller;
//     })
