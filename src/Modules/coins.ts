import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { action } from "typesafe-actions";
import { createAction } from "typesafe-actions";
import modifyCoin from "../Util/modifyCoin";
export const asyncFetchCoins = createAsyncThunk(
    "coins/asyncFetchCoins",
    async() => {
        const res = await axios.get("https://api.coinpaprika.com/v1/tickers?quotes=KRW");
        const data = await res.data.slice(0, 100);
        return await data;
    }
)
// export const GET_COINS_INFO = "coins/GET_COINS_INFO "as const;
// export const getCoinsInfo = createAction(GET_COINS_INFO)();

type Coin = {
    name : string,
    symbol : string,
    quotes : {
        KRW : {
            price : number
        }
    }
}
type Coins = {
    coins : Coin[]
}
const coins = createSlice({
    name : "coins/coins",
    initialState : {
        coins : [],
        status : 'pending',
    },
    reducers:{
        modifyCoinPrice : (state : Coins) => {
            state.coins = state.coins.map(coin => modifyCoin(coin));
        }
    },
    extraReducers: (builder) => {
        builder.addCase(asyncFetchCoins.pending, (state) => {
            state.status = "Loading";
        })
        builder.addCase(asyncFetchCoins.fulfilled, (state, action: PayloadAction<any>) => {
            state.coins = action.payload;
            state.status = "Complete";
        })
        builder.addCase(asyncFetchCoins.rejected, (state) => {
            state.status = "Fail";
        })
    }
})

export default coins;
export const {modifyCoinPrice} = coins.actions;