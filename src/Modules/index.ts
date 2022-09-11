import { combineReducers, applyMiddleware, AnyAction } from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";
import isSignedIn from "./isSignedIn";
import coins from "./coins";
import initiatedCoins from "./initiatedCoins";
import auth from "./auth";
import { AsyncThunkAction, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import {createStore} from "redux";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Reducer } from "typesafe-actions";
import modificationActivated from "./modificationActivated";
const rootReducer = combineReducers({
    isSignedIn,
    auth,
    modificationActivated,
    coins : coins.reducer,
    initiatedCoins : initiatedCoins.reducer,
})
const store = createStore(rootReducer, applyMiddleware(thunk));
// const store = configureStore({
//     reducer : rootReducer,
    
// })
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export default rootReducer;

