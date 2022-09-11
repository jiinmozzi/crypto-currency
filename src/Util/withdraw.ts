import { getDocs, query, doc, getDoc, addDoc, setDoc, collection, where } from "firebase/firestore";
import { useState } from "react";
import db from "../Firebase/service";

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

const withdraw = async({uid, amount} : withdrawParams):Promise<any>=> {
    const createdAt = new Date().toISOString().slice(0, 10);
    const isDeposit = false
    const balanceData:Balance = {uid, createdAt, amount, isDeposit};

    try {
        const q = query(collection(db, "users"), where("uid", "==", uid));
        const users = await getDocs(q);
        const user = {...users.docs[0]} as User;
        const userDocId = users.docs[0].id;
        if (amount < 0){
            return false;
        }

        if ( user.cash && user.cash > amount ){
            user.cash -= amount;
        }
        await addDoc(collection(db, "balances"), balanceData);
        await setDoc(doc(db, "users", userDocId), user);

        return true;

    }   catch (err){ 
        return false;
    }
}

export default withdraw;

// done by now