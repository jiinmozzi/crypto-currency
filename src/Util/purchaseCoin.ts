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

// type PurchaseCoinParams = {
//     uid : string,
//     symbol : string,
//     suggestedPrice : number,
//     suggestedQuantity : number,
//     marketPrice : number
// }

const purchaseCoin = async(uid:string, symbol:string, suggestedPrice:number, suggestedQuantity:number, marketPrice:number):Promise<any> => {
    const createdAt = new Date().toISOString().slice(0, 10);
    const isPurchase = true;
    
    const {user, userRefId} = await getUser(uid);
    console.log(user);
    console.log(userRefId);
    
    let transactionCode : number;
    let retainingCash : number;
    let price : number;
    let quantity : number = suggestedQuantity;
    let asset : Asset | undefined;

    if (user?.cash){
        retainingCash = user.cash;
    }   else {
        retainingCash = 0;
    }

    if (suggestedPrice >= marketPrice){
        price = marketPrice;
    }   else {
        price = suggestedPrice;
    }
    
    // 
    if (price * suggestedQuantity > retainingCash){
        transactionCode = FAIL;
        const msg = `현금 잔고(${retainingCash})가 주문총액(${price}원 * ${suggestedQuantity})개 = ${price*suggestedQuantity}원보다 부족하여 거래가 체결되지 않았습니다.`;
        return {transactionCode, suggestedQuantity, suggestedPrice, marketPrice, msg, retainingCash};
    }

    if (suggestedPrice >= marketPrice){
        transactionCode = SUCCESS;
        const msg = `${symbol} ${suggestedQuantity}개 / 시장가격(${price})에 매수 거래가 체결되었습니다. `       
        const tradeData:Tradings = {uid, symbol, createdAt, isPurchase, price, quantity};

        if (user && user.cash !== undefined){
            user.cash -= price * quantity;
        }
        if (user?.assets){
            asset = user.assets.find((e:Asset) => e.symbol === symbol);
            if (asset === undefined){
                user.assets = [...user.assets, {symbol, quantity, averagePrice : price}] 
                await setDoc(doc(db, "users", userRefId), user);
                await addDoc(collection(db, "tradings"), tradeData);
                return {transactionCode, suggestedQuantity, suggestedPrice, marketPrice, msg, retainingCash};
                // maybe should return here
            }   
            if (asset && asset.quantity!==undefined && asset.averagePrice!== undefined ){
                asset.averagePrice = (asset.averagePrice * asset.quantity + price * quantity) / asset.quantity + quantity;
                asset.quantity += quantity;
                await setDoc(doc(db, "users", userRefId), user);
                await addDoc(collection(db, "tradings"), tradeData);
                return {transactionCode, suggestedQuantity, suggestedPrice, marketPrice, msg, retainingCash};
            }
        }
        return {transactionCode, suggestedQuantity, suggestedPrice, marketPrice, msg, retainingCash};
    }   else {
        transactionCode = HOLD;
        const msg = `제시가격(${suggestedPrice})이 ${symbol} 시장가격(${marketPrice})보다 낮아서 거래가 예약되었습니다.`;
        return {transactionCode, suggestedQuantity, suggestedPrice, marketPrice, msg, retainingCash};
    }
}

export default purchaseCoin;