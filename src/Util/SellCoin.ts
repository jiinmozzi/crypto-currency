import { getDocs, query, doc, getDoc, addDoc, setDoc, collection, where } from "firebase/firestore";
import { useState } from "react";
import db from "../Firebase/service";
import getUser from "./getUser";

const SUCCESS = 1;
const FAIL = -1;
const HOLD = 0;

type Tradings = {
    uid : string,
    symbol : string,
    createdAt : string,
    isPurchase : boolean,
    price : number,
    quantity : number,
}
type Asset = {
    symbol? : string,
    quantity? : number,
    averagePrice? : number,
}

type User = {
    assets ?: Asset[],
    cash ?: number,
    email ?: string,
    uid ?: string,
}

type SellCoinParams = {
    uid : string,
    symbol : string,
    suggestedPrice : number,
    suggestedQuantity : number,
    marketPrice : number
}

const sellCoin = async(uid:string, symbol:string, suggestedPrice:number, suggestedQuantity:number, marketPrice: number):Promise<any> => {
    const createdAt = new Date().toISOString().slice(0, 10);
    const isPurchase = false;

    const {user, userRefId} = await getUser(uid);

    let transactionCode : number;
    let retainingQuantity : number;
    let price : number; 
    let quantity : number;
    let asset : Asset | undefined;

    // get user's current asset quantity
    if (user.assets){
        asset = user.assets.find((e:Asset) => e.symbol === symbol);
    }        
    if (user.assets && asset !== undefined && asset.quantity !== undefined){
        retainingQuantity = asset.quantity;
    }   else {
        retainingQuantity = 0;
        transactionCode = FAIL;
        const msg = `${symbol} 보유수량(${retainingQuantity})이 제시수량(${suggestedQuantity})보다 적어서 거래가 체결되지 않았습니다.`;
        return {transactionCode, suggestedQuantity, retainingQuantity, suggestedPrice, marketPrice, msg};
    }
    

    if (suggestedQuantity > retainingQuantity){
        transactionCode = FAIL;
        const msg = `${symbol} 보유수량(${retainingQuantity})이 제시수량(${suggestedQuantity})보다 적어서 거래가 체결되지 않았습니다.`;
        return {transactionCode, suggestedQuantity, retainingQuantity, suggestedPrice, marketPrice, msg};
    }

    if ( suggestedPrice > marketPrice ){
        transactionCode = HOLD;
        const msg = `제시가격(${suggestedPrice})이 ${symbol} 시장가격(${marketPrice})보다 높아서 거래가 예약되었습니다.`;
        return {transactionCode, suggestedQuantity, retainingQuantity, suggestedPrice, marketPrice, msg};
    }   else {
        transactionCode = SUCCESS;
        price = marketPrice;
        quantity = suggestedQuantity;
        const msg = `${symbol} ${suggestedQuantity}개 / 시장가격(${price})에 매도 거래가 체결되었습니다.`;

        const tradeData:Tradings = {uid, symbol, createdAt, isPurchase, price, quantity}
        if (user && user.cash !== undefined ){
            user.cash += price * quantity;
            asset.quantity -= quantity;
            
            const tradingData = {
                uid, symbol, createdAt, isPurchase, price, quantity
            }
            await setDoc(doc(db, "users", userRefId), user);
            await addDoc(collection(db, "tradings"), tradeData);
            
        }
        
        return {transactionCode, suggestedQuantity, retainingQuantity, suggestedPrice, marketPrice, msg};
    }
    
}

export default sellCoin;