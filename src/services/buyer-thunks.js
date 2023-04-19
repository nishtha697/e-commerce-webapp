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

export const buyerAddAddressThunk = createAsyncThunk('buyer/addAddress',
    async ({ username, address }, { rejectWithValue }) => {
        try {
            const addressId = Date.now()
            address['id'] = addressId
            const response = await axios.put(`${BUYER_API}/add-address/${username}`, { address });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    })


export const buyerDeleteAddressThunk = createAsyncThunk('buyer/deleteAddress',
    async ({ username, addressId }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${BUYER_API}/delete-address/${username}`, { addressId });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    })


export const buyerUpdateAddressThunk = createAsyncThunk('buyer/updateAddress',
    async ({ username, address }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${BUYER_API}/update-address/${username}`, { address });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    })


export const buyerUpdateProfileThunk = createAsyncThunk('buyer/updateProfile',
    async ({ username, newProfile }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${BUYER_API}/update-profile/${username}`, { newProfile });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    })


export const buyerDeleteProfileThunk = createAsyncThunk('buyer/deleteProfile',
    async (username, { rejectWithValue }) => {
        try {
            const response = axios.get(`${BUYER_API}/delete?username=${username}`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    })
