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
                                       [createOrderThunk.rejected]: (state, {payload}) => {
                                           state.error = payload;
                                       },
                                       [findOrdersByBuyerUsernameThunk.fulfilled]: (state,
                                                                                    {payload}) => {
                                           state.error = null;
                                           state.orders = payload;
                                       },
                                       [findOrdersByBuyerUsernameThunk.rejected]: (state,
                                                                                   {payload}) => {
                                           state.error = payload;
                                       },
                                       [findOrdersBySellerThunk.fulfilled]: (state, {payload}) => {
                                           state.error = null;
                                           state.orders = payload;
                                       },
                                       [findOrdersBySellerThunk.rejected]: (state, {payload}) => {
                                           state.error = payload;
                                       },
                                       [findOrderAndSpecificShipmentBySellerThunk.fulfilled]: (state,
                                                                                               {payload}) => {
                                           state.error = null;
                                           state.orders = payload;
                                       },
                                       [findOrderAndSpecificShipmentBySellerThunk.rejected]: (state,
                                                                                              {payload}) => {
                                           state.error = payload;
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
                                                                                   {payload}) => {
                                           state.error = payload;
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
                                       [cancelAllShipmentsThunk.rejected]: (state, {payload}) => {
                                           state.error = payload;
                                       },
                                   },
                               });

export default orderSlice.reducer;
