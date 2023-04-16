import axios from 'axios'
import { createAsyncThunk } from "@reduxjs/toolkit"

const BUYER_API = 'http://localhost:4000/api/buyers';

export const buyerRegisterThunk = createAsyncThunk('buyer/register',
    async (buyer, { rejectWithValue }) => {
        try {
            const response = await axios.post(BUYER_API, buyer);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }

    })

export const buyerLoginThunk = createAsyncThunk('buyer/login',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BUYER_API}/authenticate?username=${username}&password=${password}`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }


    })


// export const buyerUpdateThunk = createAsyncThunk('buyer/update',
//     async (buyer) => {
//         await axios.put(`${BUYER_API}/${buyer.buyer_id}`, buyer);
//         return buyer;
//     })
