import React, { useEffect } from "react";

import { createStore, applyMiddleware } from "redux";
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";
import { createAsyncThunk } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import rootReducer, {AppDispatch, RootState} from "../Modules";
import { activate } from "../Modules/modificationActivated";
import coins, { asyncFetchCoins, modifyCoinPrice } from "../Modules/coins";

import CoinInfo from "../Components/CoinInfo";
import { asyncFetchInitiatedCoins } from "../Modules/initiatedCoins";

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

type KRW = {
    price : number;
}
type quotes = {
    KRW : object[]
}
type Coin = {
    name : string,
    symbol : string,
    quotes : {
        KRW : {
            price : number
        }
    }
}

type InitiatedCoin = {
    name : string,
    symbol : string,
    quotes : {
        KRW : {
            price : number
        }
    }
}

const CoinInfoContainer = () => {
    
    const coins = useAppSelector((state:RootState) : Coin[] => {
        return state.coins.coins;
    })
    const initiatedCoins = useAppSelector((state : RootState) : InitiatedCoin[] => {
        return state.initiatedCoins.initiatedCoins;
    })
    const isActivated = useSelector((state : RootState) => state.modificationActivated.isActivated);
    // const dispatch = useAppDispatch();
    const dispatch = useDispatch<any>();
    useEffect(() => {
        dispatch(asyncFetchCoins());    
        dispatch(asyncFetchInitiatedCoins());
    }, [])

    useEffect(() => {
        if ( !isActivated ){
            dispatch(activate());
            const interval = setInterval(() => {
                dispatch(modifyCoinPrice());
            }, 3000)
            console.log("modifyCoinPrice worked");
            return () => clearInterval(interval);
        }
    }, [])
    
    return coins && initiatedCoins && (
        <CoinInfo coins={coins} initiatedCoins={initiatedCoins}/>
    )
}

export default CoinInfoContainer