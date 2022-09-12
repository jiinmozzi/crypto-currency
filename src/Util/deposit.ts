import { getDocs, query, doc, getDoc, addDoc, setDoc, collection, where } from "firebase/firestore";
import { useState } from "react";
import db from "../Firebase/service";
import getUser from "./getUser";

const SUCCESS = 1; 
const FAIL = -1;

type Balance = {
    uid : string,
    createdAt : String,
    amount : number,
    isDeposit : boolean,
}
type User = {
    assets ?: [],
    cash ?: number,
    email ?: string,
    uid ?: string,
}

const deposit = async(uid : string, amount : number):Promise<any>=> {
    const createdAt = new Date().toISOString().slice(0, 10);
    const isDeposit = true 
    const balanceData:Balance = {uid, createdAt, amount, isDeposit};
    try {
        const {user, userRefId} = await getUser(uid);

        // if (user === null || user===undefined){
        //     return false;
        // }

        if (amount < 0){
            return {transactionCode : FAIL, cash : user.cash, msg : "입금이 취소되었습니다. 입금 액수는 0원을 초과하여야 합니다."};
        }

        if (user.cash){
            try{
                user.cash += amount;
                await addDoc(collection(db, "balances"), balanceData);
                await setDoc(doc(db, "users", userRefId), user);
                return {transactionCode : SUCCESS, cash : user.cash, msg : `입금이 완료되었습니다. 입금 후 통장 잔액은 ${user.cash}입니다.`};
            }   catch (err){
                return {transactionCode : FAIL, cash : user.cash, msg : "입금이 취소되었습니다. 잠시 후 다시 시도해주세요."};
            } 
        }     
    }   catch (err){
        return {transactionCode : FAIL, cash : 0, msg : "입금이 취소되었습니다. 잠시 후 다시 시도해주세요."};
    }
}

export default deposit;

// done by now;
