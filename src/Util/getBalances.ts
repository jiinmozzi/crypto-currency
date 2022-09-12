import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import db from "../Firebase/service";

type Balance = {
    id : string,
    createdAt : String,
    amount : number,
    isDeposit : boolean,
}

const getBalances = async(userId : string):Promise<any>=> {
    const q = query(collection(db, "balances"), where("uid", "==", userId));
    const querySnapshot = await getDocs(q);
    const balance = querySnapshot.docs;

    const result:any = [];
    balance.forEach(e => {
        result.push(e.data());
    })
    
    return result;
}

export default getBalances;

// done by now (입출금 내역)
