import { getDocs, query, doc, getDoc, addDoc, setDoc, collection, where } from "firebase/firestore";
import { useState } from "react";
import db from "../Firebase/service";
import getUser from "./getUser";

const SUCCESS = 1; 
const FAIL = -1;

type Balance = {
    uid : string,
    createdAt : string,
    amount : number,
    isDeposit : boolean,
}

type User = {
    assets ?: [],
    cash ?: number,
    email ?: string,
    uid ?: string
}

type withdrawParams = {
    uid : string,
    amount : number,
}

const withdraw = async(uid: string, amount: number):Promise<any>=> {
    const createdAt = new Date().toISOString().slice(0, 10);
    const isDeposit = false
    const balanceData:Balance = {uid, createdAt, amount, isDeposit};

    try {
        const {user, userRefId} = await getUser(uid);
        if (amount <= 0){
            return {transactionCode : FAIL, cash : user.cash , msg : "출금이 취소되었습니다. 출금 액수는 0원을 초과하여야 합니다."};
        }

        if ( user.cash && user.cash > amount ){
            user.cash -= amount;
            try {
                await addDoc(collection(db, "balances"), balanceData);
                await setDoc(doc(db, "users", userRefId), user);
            }   catch(err){
                return -1;
            }
            return {transactionCode : SUCCESS, cash : user.cash, msg : `출금이 완료되었습니다. 출금 후 통장 잔액은 ${user.cash}입니다.`};
        }   else {
            return {transactionCode : FAIL, cash : user.cash, msg : `통장 잔액 : ${user?.cash} / 출금액 : ${amount}, 출금액이 통장 잔고를 초과하여 입출금이 취소되었습니다.`};    
        }
    }   catch (err){ 
        return {transactionCode : FAIL, cash : 0,  msg : `입출금이 취소되었습니다. 잠시 후 다시 시도해주세요.`};
    }
}

export default withdraw;

// done by now