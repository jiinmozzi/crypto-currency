import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { action } from "typesafe-actions";
import { createAction } from "typesafe-actions";
import modifyCoin from "../Util/modifyCoin";
export const asyncFetchInitiatedCoins = createAsyncThunk(
    "coins/asyncFetchInitiatedCoins",
    async() => {
        const res = await axios.get("https://api.coinpaprika.com/v1/tickers?quotes=KRW");
        const data = await res.data.slice(0, 100);
        return await data;
    }
)
// export const GET_COINS_INFO = "coins/GET_COINS_INFO "as const;
// export const getCoinsInfo = createAction(GET_COINS_INFO)();

type InitiatedCoin = {
    name : string,
    symbol : string,
    quotes : {
        KRW : {
            price : number
        }
    }
}
type InitiatedCoins = {
    coins : InitiatedCoin[]
}
const initiatedCoins = createSlice({
    name : "initiatedCoins/initiatedCoins",
    initialState : {
        initiatedCoins : [],
        status : 'pending',
    },
    reducers:{
        // modifyCoinPrice : (state : InitiatedCoins) => {
        //     state.coins = state.coins.map(coin => modifyCoin(coin));
        // }
    },
    extraReducers: (builder) => {
        builder.addCase(asyncFetchInitiatedCoins.pending, (state) => {
            state.status = "Loading";
        })
        builder.addCase(asyncFetchInitiatedCoins.fulfilled, (state, action: PayloadAction<any>) => {
            state.initiatedCoins = action.payload;
            state.status = "Complete";
        })
        builder.addCase(asyncFetchInitiatedCoins.rejected, (state) => {
            state.status = "Fail";
        })
    }
})

export default initiatedCoins;
