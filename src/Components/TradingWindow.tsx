import "../Styles/TradingWindow.scss";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import purchaseCoin from "../Util/purchaseCoin";
import sellCoin from "../Util/SellCoin";

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

type tradingWindowParams = {
    uid : string,
    coins : Coin[],
    user : User,
}

const TradingWindow = ({uid, coins, user} : tradingWindowParams) => {
    const [isPurchaseMode, setIsPurchaseMode] = useState<boolean>(true);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);
    const [coinPrice, setCoinPrice] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(0);
    const [init, setInit] = useState<boolean>(false);
    const [resultMsg, setResultMsg] = useState<string>("");
    let {id} = useParams()
    const [tradeType, setTradeType] = useState<number>(0);
    const onChangeType = (e : React.ChangeEvent<HTMLInputElement>) => {
        // e.preventDefault();    
        if (e.target.value === "option1"){
            setIsPurchaseMode(true); 
        }   else {
            setIsPurchaseMode(false); 
        }
        // if (e.target.value)
    }

    const onChangeInput = (e : React.ChangeEvent<HTMLInputElement>) => {
        
        if (e.target.name === "price"){
            setPrice(Number(e.target.value));
        }   else if (e.target.name === "quantity"){
            setQuantity(Number(e.target.value));
        }
    }

    const onSubmit = async(e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isPurchaseMode){        
            if (id === undefined || ""){
                id = "BTC";
            }
            console.log(uid)
            const res = await purchaseCoin( uid, id , price, quantity, coinPrice )
            console.log(res);
            setResultMsg(res.msg);
            
        }   else {
            if ( id === undefined || ""){
                id = "BTC";
            }
            const res = await sellCoin(uid, id, price, quantity, coinPrice);
            console.log(res);
            setResultMsg(res.msg);
            // sellCoin()
        }
    }
    useEffect(() => {
        if (coins !== undefined){
            const _price = coins.find(e => e.symbol === id)?.quotes.KRW.price;
            if (_price !== undefined){
                setCoinPrice(_price);
            }
        }
    }, [coins])

    useEffect(() => {
        setTotalAmount(price * quantity);
    }, [price, quantity])
    return coins && user && (
        <div className="trading-window-wrapper">
            <h5 className="fst-italic" style={{"textAlign" : "center"}}><strong>{id}</strong> 현재 가격 : {coins.find(e => e.symbol === id)?.quotes.KRW.price.toFixed(2)}</h5>
            <br></br>
            <form onSubmit={onSubmit}>
                <div style={{"display" : "flex", "justifyContent": "center"}}>
                    <div className="form-check form-check-inline" style={{"textAlign" : "center"}}>
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" onChange={onChangeType}/>
                        <label className="form-check-label" htmlFor="inlineRadio1">매수</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" onChange={onChangeType}/>
                        <label className="form-check-label" htmlFor="inlineRadio2">매도</label>
                    </div>
                </div>
                <br></br>
                <br></br>

                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon3">{isPurchaseMode ? "매수 가능 금액(원)" : `${coins.find(e => e.symbol === id)?.symbol} 매도 가능 수량`}</span>
                    <input type="number" className="form-control" id="basic-url" aria-describedby="basic-addon3" value={ isPurchaseMode && user.cash && coins!==undefined ? user.cash : user?.assets?.find(e => e.symbol === id)?.quantity !== undefined ? user?.assets?.find(e => e.symbol === id)?.quantity : 0 }/>
                </div>   
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon3">{isPurchaseMode ? "매수 가격" : "매도 가격"}</span>
                    <input type="number" step={0.01} name="price" className="form-control" id="basic-url" aria-describedby="basic-addon3" min={0} onChange={onChangeInput}/>
                </div>
                
                    <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon3">{isPurchaseMode ? "매수 수량" : "매도 수량"}</span>
                    <input type="number" step={0.01} name="quantity" className="form-control" id="basic-url" aria-describedby="basic-addon3" min={0.01} onChange={onChangeInput}/>
                </div>
                
                    <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon3">주문 총액</span>
                    <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" value={totalAmount}/>
                </div>
                <div style={{"width" : "100%", "display" : "flex", "flexDirection" : "row-reverse"}}>
                    <button style={{"width" : "40%"}} type="submit" className="btn btn-secondary">{isPurchaseMode ? "매수하기" : "매도하기"}</button>
                </div>
                
            </form>
        </div>
        
    )
}

export default TradingWindow;