import axios from 'axios';
import { createAsyncThunk } from "@reduxjs/toolkit";

const ORDER_API = 'http://localhost:4000/api/orders';

export const createOrderThunk = createAsyncThunk('order/create',
                                                 async (order, { rejectWithValue }) => {
                                                     try {
                                                         console.log("Thunks")
                                                         console.log(order)
                                                         const response = await axios.post(ORDER_API, order);
                                                         return response.data;
                                                     } catch (err) {
                                                         return rejectWithValue(err.response.data);
                                                     }
                                                 }
);

export const findOrdersByBuyerUsernameThunk = createAsyncThunk('order/findByBuyer',
                                                               async (buyer_username, { rejectWithValue }) => {
                                                                   try {
                                                                       debugger
                                                                       const response = await axios.get(`${ORDER_API}/buyer/${buyer_username}`);
                                                                       return response.data;
                                                                   } catch (err) {
                                                                       return rejectWithValue(err.response.data);
                                                                   }
                                                               }
);

export const findOrderByIdThunk = createAsyncThunk('order/findById',
                                                   async (orderId, { rejectWithValue }) => {
                                                       try {
                                                           const response = await axios.get(`${ORDER_API}/${orderId}`);
                                                           return response.data;
                                                       } catch (err) {
                                                           return rejectWithValue(err.response.data);
                                                       }
                                                   }
);

export const findOrdersBySellerThunk = createAsyncThunk('order/findSeller',
                                                        async (seller_username, { rejectWithValue }) => {
                                                            try {
                                                                const response = await axios.get(`${ORDER_API}/seller/${seller_username}`);
                                                                return response.data;
                                                            } catch (err) {
                                                                return rejectWithValue(err.response.data);
                                                            }
                                                        }
);

export const findOrderAndSpecificShipmentBySellerThunk = createAsyncThunk('order/findSellerShipment',
                                                                          async (seller_username, { rejectWithValue }) => {
                                                                              try {
                                                                                  const response = await axios.get(`${ORDER_API}/shipmentsBySeller/${seller_username}`);
                                                                                  return response.data;
                                                                              } catch (err) {
                                                                                  return rejectWithValue(err.response.data);
                                                                              }
                                                                          }
);

export const updateOrderShipmentStatusThunk = createAsyncThunk('order/updateStatus',
                                                               async ({ orderId, shipmentId, status }, { rejectWithValue }) => {
                                                                   try {
                                                                       const response = await axios.put(`${ORDER_API}/updateShipmentStatus/${orderId}/shipment/${shipmentId}`, { status });
                                                                       return response.data;
                                                                   } catch (err) {
                                                                       return rejectWithValue(err.response.data);
                                                                   }
                                                               }
);

export const cancelAllShipmentsThunk = createAsyncThunk('order/cancelAllShipments',
                                                        async (orderId, { rejectWithValue }) => {
                                                            try {
                                                                const response = await axios.put(`${ORDER_API}/cancel/${orderId}`);
                                                                return response.data;
                                                            } catch (err) {
                                                                return rejectWithValue(err.response.data);
                                                            }
                                                        }
);
