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


export const buyerUpdateThunk = createAsyncThunk('buyer/addAddress',
    async ({username, address}) => {
        const response = await axios.put(`${BUYER_API}/${username}`, { address });
        debugger;
        return response.data;
    })
