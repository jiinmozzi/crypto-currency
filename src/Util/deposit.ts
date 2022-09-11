import { getDocs, query, doc, getDoc, addDoc, setDoc, collection, where } from "firebase/firestore";
import { useState } from "react";
import db from "../Firebase/service";

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

type depositParams = {
    uid : string,
    amount : number,
    // isDeposit : boolean,
}
const deposit = async({uid, amount} : depositParams):Promise<any>=> {
    const createdAt = new Date().toISOString().slice(0, 10);
    const isDeposit = true 
    const balanceData:Balance = {uid, createdAt, amount, isDeposit};
    try {
        const q = query(collection(db, "users"), where("uid", "==", uid));
        const users = await getDocs(q);
        const user = {...users.docs[0]} as User;
        const userDocId = users.docs[0].id;

        // if (user === null || user===undefined){
        //     return false;
        // }
        
        if (user.cash){
            user.cash += amount;
        }   

        if (amount < 0){
            return false;
        }

        await addDoc(collection(db, "balances"), balanceData);
        await setDoc(doc(db, "users", userDocId), user);

        return true;
    }   catch (err){
        return false;
    }
}

export default deposit;

// done by now;
