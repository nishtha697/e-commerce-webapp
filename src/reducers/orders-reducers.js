import { createSlice } from '@reduxjs/toolkit';
import {
    cancelAllShipmentsThunk,
    createOrderThunk,
    findOrderAndSpecificShipmentBySellerThunk,
    findOrdersByBuyerUsernameThunk,
    findOrdersBySellerThunk,
    updateOrderShipmentStatusThunk,
} from '../services/orders-thunks.js';

const initialState = {
    orders: [],
    error: null,
};

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        clearOrderReducer: (state) => {
            state.orders = [];
            state.error = null;
        },
    },
    extraReducers: {
        [createOrderThunk.fulfilled]:
            (state, { payload }) => {
                state.error = null;
                state.orders.push(payload);
            },
        [createOrderThunk.rejected]:
            (state, action) => {
                state.error = action.error;
            },
        [findOrdersByBuyerUsernameThunk.fulfilled]:
            (state,
                { payload }) => {
                state.error = null;
                state.orders = payload;
            },
        [findOrdersByBuyerUsernameThunk.rejected]:
            (state,
                action) => {
                state.error = action.error;
            },
        [findOrdersBySellerThunk.fulfilled]:
            (state, { payload }) => {
                state.error = null;
                state.orders = payload;
            },
        [findOrdersBySellerThunk.rejected]:
            (state, action) => {
                state.error = action.error;
            },
        [findOrderAndSpecificShipmentBySellerThunk.fulfilled]:
            (state, { payload }) => {
                state.error = null;
                state.orders = payload;
            },
        [findOrderAndSpecificShipmentBySellerThunk.rejected]:
            (state, action) => {
                state.error = action.error;
            },
        [updateOrderShipmentStatusThunk.fulfilled]:
            (state, { payload }) => {
                state.error = null;
                state.orders = state.orders.map(order => {
                    if (order.order_id === payload.result.order_id) return payload.result
                    else return order
                })
            },
        [updateOrderShipmentStatusThunk.rejected]:
            (state, action) => {
                state.error = action.error;
            },
        [cancelAllShipmentsThunk.fulfilled]:
            (state, { payload }) => {
                state.error = null;
                state.orders = state.orders.map(order => {
                    if (order.order_id === payload.result.order_id) return payload.result
                    else return order
                })
            },
        [cancelAllShipmentsThunk.rejected]:
            (state, action) => {
                state.error = action.error;
            },
    },
});

export default orderSlice.reducer;
export const { clearOrderReducer } = orderSlice.actions;