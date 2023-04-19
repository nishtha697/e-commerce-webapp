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
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${SELLER_API}/authenticate?username=${username}&password=${password}`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    })

export const sellerByUsernameThunk = createAsyncThunk('seller/byUsername',
    async ({ username }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${SELLER_API}/${username}`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    })

export const sellerUpdateProfileThunk = createAsyncThunk('seller/updateProfile',
    async ({ username, newProfile }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${SELLER_API}/update-profile/${username}`, { newProfile });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    })
