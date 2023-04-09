import {createAsyncThunk} from "@reduxjs/toolkit"
import * as service from "./buyer-service.js"

export const findBuyersThunk = createAsyncThunk(
    'buyers/findBuyers', async () =>
        await service.findBuyers()
)

export const findBuyersByIdThunk = createAsyncThunk(
    'buyers/findBuyerById', async (buyer_id) => {
        await service.findBuyersById(buyer_id)
    }
)

export const findBuyerByUsernameAndPasswordThunk = createAsyncThunk(
    'currentUser/findBuyerByUsernameAndPassword', async ({username, password}) => {
        return await service.findBuyerByUsernameAndPassword(username, password)
    }
)

export const createBuyerThunk = createAsyncThunk(
    'buyers/createBuyer', async (buyer) => {
        return await service.createBuyer(buyer);
    })

export const updateBuyerThunk =
    createAsyncThunk(
        'buyers/updateBuyer',
        async (buyer) =>
            await service.updateBuyer(buyer)
    )





