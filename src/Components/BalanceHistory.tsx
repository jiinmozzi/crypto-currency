import "../Styles/BalanceHistory.scss";
import { useState, useEffect } from "react";
import getBalances from "../Util/getBalances";

type BalanceHistory = {
    id : string,
    createdAt : String,
    amount : number,
    isDeposit : boolean,
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
type BalanceHistoryParams = {
    uid : string,
    user : User,
    balances : Balance[]
    setBalances : any,
}

type Balance = {
    id : string,
    createdAt : String,
    amount : number,
    isDeposit : boolean,
}

const BalanceHistory = ({uid , user, balances, setBalances }: BalanceHistoryParams) => {
    const [balanceHistories, setBalanceHistories] = useState<BalanceHistory[]>();

    useEffect(() => {
        const getBalanceHistories = async () => {
            const _balanceHisotries = await getBalances(uid);
            setBalanceHistories(_balanceHisotries);
        }
        getBalanceHistories();
        
    }, [user, uid])
    
    return(
        <div className="balance-history-wrapper">
            <h6 className="fst-italic" style={{"textAlign" : "center", "fontWeight" : "bold"}}>입출금 내역</h6>
            <div className="past-trading">
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">일자</th>
                        <th scope="col">거래종류</th>
                        <th scope="col">금액</th>
                        </tr>
                    </thead>
                    <tbody>
                        {balances?.map((e:Balance) => {
                            return (
                                <tr>
                                    <th scope="row">{e.createdAt}</th>
                                    <td>{e.isDeposit ? "입금" : "출금"}</td>
                                    <td>{e.amount}</td>
                                </tr>        
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default BalanceHistory;