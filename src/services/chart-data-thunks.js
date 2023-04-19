import axios from 'axios';
import { createAsyncThunk } from "@reduxjs/toolkit";

const CHART_DATA_API = 'http://localhost:4000/api/chart-data';

export const fetchChartDataThunk = createAsyncThunk('chartData/fetch',
                                                    async (seller_username, { rejectWithValue }) => {
                                                        try {
                                                            const response = await axios.get(CHART_DATA_API, { params: { seller_username } });
                                                            return response.data;
                                                        } catch (err) {
                                                            return rejectWithValue(err.response.data);
                                                        }
                                                    }
);
