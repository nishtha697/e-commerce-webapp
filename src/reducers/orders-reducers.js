import {createSlice} from '@reduxjs/toolkit';
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
                                   reducers: {},
                                   extraReducers: {
                                       [createOrderThunk.fulfilled]: (state, {payload}) => {
                                           state.error = null;
                                           state.orders.push(payload);
                                       },
                                       [createOrderThunk.rejected]: (state, action) => {
                                           state.error = action.error;
                                       },
                                       [findOrdersByBuyerUsernameThunk.fulfilled]: (state,
                                                                                    {payload}) => {
                                           state.error = null;
                                           state.orders = payload;
                                       },
                                       [findOrdersByBuyerUsernameThunk.rejected]: (state,
                                                                                   action) => {
                                           state.error = action.error;
                                       },
                                       [findOrdersBySellerThunk.fulfilled]: (state, {payload}) => {
                                           state.error = null;
                                           state.orders = payload;
                                       },
                                       [findOrdersBySellerThunk.rejected]: (state, action) => {
                                           state.error = action.error;
                                       },
                                       [findOrderAndSpecificShipmentBySellerThunk.fulfilled]: (state,
                                                                                               {payload}) => {
                                           state.error = null;
                                           state.orders = payload;
                                       },
                                       [findOrderAndSpecificShipmentBySellerThunk.rejected]: (state,
                                                                                              action) => {
                                           state.error = action.error;
                                       },
                                       [updateOrderShipmentStatusThunk.fulfilled]: (state,
                                                                                    {payload}) => {
                                           state.error = null;
                                           const orderIndex = state.orders.findIndex(
                                               (order) => order.order_id === payload.order_id);
                                           const shipmentIndex = state.orders[orderIndex].shipments.findIndex(
                                               (shipment) => shipment.shipmentId
                                                             === payload.shipmentId);
                                           state.orders[orderIndex].shipments[shipmentIndex].shipmentStatusLog =
                                               payload.shipmentStatusLog;
                                       },
                                       [updateOrderShipmentStatusThunk.rejected]: (state,
                                                                                   action) => {
                                           state.error = action.error;
                                       },
                                       [cancelAllShipmentsThunk.fulfilled]: (state, {payload}) => {
                                           state.error = null;
                                           const orderIndex = state.orders.findIndex(
                                               (order) => order.order_id === payload.order_id);
                                           state.orders[orderIndex].shipments.forEach(
                                               (shipment) => {
                                                   shipment.shipmentStatusLog =
                                                       payload.shipmentStatusLog;
                                               });
                                       },
                                       [cancelAllShipmentsThunk.rejected]: (state, action) => {
                                           state.error = action.error;
                                       },
                                   },
                               });

export default orderSlice.reducer;
