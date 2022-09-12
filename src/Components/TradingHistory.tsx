import { useEffect, useState } from "react";
import "../Styles/TradingHistory.scss";
import getTradings from "../Util/getTradings";
import { useParams } from "react-router-dom";
import getUndoneTradings from "../Util/getUndoneTradings"
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


type Trading = {
    createdAt : string,
    isPurchase : boolean,
    price : number,
    quantity : number,
    symbol : string,
    uid : string,
}
type UndoneTrading = {
    createdAt : string,
    isPurchase : boolean,
    price : number,
    quantity : number,
    symbol : string,
    uid : string,
}
type TradingHistoryParam = {
    uid : string,
    user : User,
    tradings : Trading[],
    undoneTradings : UndoneTrading[],
    setTradings : any
    setUndoneTradings : any
}
const TradingHistory = ({uid, user, tradings, undoneTradings, setTradings, setUndoneTradings} : TradingHistoryParam) => {
    const {id} = useParams();
    const [tradingHistories, setTradingHistories] = useState<Trading[]>()
    const [undoneTradingHistories, setUndoneTradingHistories] = useState<UndoneTrading[]>()
    useEffect(() => {
        const getTrades =  async() => {
            const trades = await getTradings(uid);
            setTradingHistories(trades);
        }
        const getUndoneTrades = async() => {
            const undoneTrades = await getUndoneTradings(uid);
            setUndoneTradingHistories(undoneTrades);
        }
        getTrades();
        getUndoneTrades();
        
        
    }, [uid])
    
    return (
        <div className="trading-history-wrapper" style={{"display" : "flex", "flexDirection" : "column", "justifyContent" : "space-between"}}>
            <h6 className="fst-italic" style={{"textAlign" : "center", "fontWeight" : "bold"}}>과거 투자 내역</h6>
            <div className="past-trading">
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">일자</th>
                        <th scope="col">거래종류</th>
                        <th scope="col">수량</th>
                        <th scope="col">가격</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {tradingHistories ? tradingHistories.sort((a,b) => b.createdAt.localeCompare(a.createdAt)).map((e:Trading) => { */}
                            {tradings ? tradings.sort((a,b) => b.createdAt.localeCompare(a.createdAt)).map((e:Trading) => {
                            return (
                                <tr>
                                    <th scope="row">{e.createdAt}</th>
                                    <td>{e.symbol} {e.isPurchase ? "매수" : "매도"}</td>
                                    <td>{e.quantity}</td>
                                    <td>{e.price}</td>
                                </tr>        
                            )
                        }) : null}
                    </tbody>
                </table>
            </div>
            <h6 className="fst-italic" style={{"textAlign" : "center", "fontWeight" : "bold"}}>미체결</h6>
            <div className="current-trading">
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">일자</th>
                        <th scope="col">거래종류</th>
                        <th scope="col">수량</th>
                        <th scope="col">가격</th>
                        </tr>
                    </thead>
                    <tbody>
                    {/* {undoneTradingHistories? undoneTradingHistories.sort((a,b) => b.createdAt.localeCompare(a.createdAt)).map((e:UndoneTrading) => { */}
                        {undoneTradings? undoneTradings.sort((a,b) => b.createdAt.localeCompare(a.createdAt)).map((e:UndoneTrading) => {
                            return (
                                <tr>
                                    <th scope="row">{e.createdAt}</th>
                                    <td>{e.symbol} {e.isPurchase ? "매수" : "매도"}</td>
                                    <td>{e.quantity}</td>
                                    <td>{e.price}</td>
                                </tr>        
                            )
                        }) : null}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default TradingHistory