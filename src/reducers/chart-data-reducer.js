import { createSlice } from '@reduxjs/toolkit';
import { fetchChartDataThunk } from '../services/chart-data-thunks.js';

const initialState = {
    userDemographicData: [],
    categoriesData: [],
    timelineData: [],
    revenueData: [],
    error: null,
};

const chartDataSlice = createSlice({
    name: 'chartData',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchChartDataThunk.pending]:
            (state) => {
                state.error = null;
            },
        [fetchChartDataThunk.fulfilled]:
            (state, { payload }) => {
                state.userDemographicData = payload.userDemographicData;
                state.categoriesData = payload.categoriesData;
                state.timelineData = payload.timelineData;
                state.revenueData = payload.revenueData;

                state.error = null;
            },
        [fetchChartDataThunk.rejected]:
            (state, action) => {
                state.error = action.error.message;
            },
    },
});

export default chartDataSlice.reducer;
