import axios from 'axios'
import { createAsyncThunk } from "@reduxjs/toolkit"

const BUYER_API = 'http://localhost:4000/api/buyers';

export const findBuyersThunk = createAsyncThunk('buyers/findBuyers',
    async () => {
        const response = await axios.get(BUYER_API);
        return response.data;
    })

export const findBuyersByIdThunk = createAsyncThunk('buyers/findBuyerById',
    async (buyer_id) => {
        const response = await axios.get(`${BUYER_API}/${buyer_id}`);
        return response.data;
    })

export const findBuyerByUsernameAndPasswordThunk = createAsyncThunk('currentUser/findBuyerByUsernameAndPassword',
    async ({ username, password }) => {
        const response = await axios
            .get(`${BUYER_API}/authenticate?username=${username}&password=${password}`);
        return response.data;
    })

export const createBuyerThunk = createAsyncThunk('buyers/createBuyer',
    async (buyer, {rejectWithValue}) => {
        try {
            const response = await axios.post(BUYER_API, buyer);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }

    })

export const updateBuyerThunk = createAsyncThunk('buyers/updateBuyer',
    async (buyer) => {
        await axios.put(`${BUYER_API}/${buyer.buyer_id}`, buyer);
        return buyer;
    })
