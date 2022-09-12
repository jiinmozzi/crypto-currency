import "../Styles/TradingWindow.scss";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import purchaseCoin from "../Util/purchaseCoin";
import sellCoin from "../Util/SellCoin";
import getUser from "../Util/getUser";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import getTradings from "../Util/getTradings";
import getUndoneTradings from "../Util/getUndoneTradings";

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

type tradingWindowParams = {
    uid : string,
    coins : Coin[],
    user : User,
    tradings : Trading[],
    undoneTradings : UndoneTrading[],
    setTradings : any
    setUndoneTradings : any
    
}

const TradingWindow = ({uid, coins, user, tradings, undoneTradings, setTradings, setUndoneTradings} : tradingWindowParams) => {
    const navigate = useNavigate();
    const [isPurchaseMode, setIsPurchaseMode] = useState<boolean>(true);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);
    const [coinPrice, setCoinPrice] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(0);
    const [resultMsg, setResultMsg] = useState<string>("");
    const [retainingQuantities, setRetainingQuantities] = useState<number>(0); 
    const [show, setShow] = useState<boolean>(false);
    useEffect(() => {
        const fetchTradings = async() => {
            const _balances = await getTradings(uid);
            setTradings(_balances);
        }
        const fetchUndoneTradings = async() => {
            const _undoneTradings = await getUndoneTradings(uid);
            setUndoneTradings(_undoneTradings);
        }
        fetchTradings();
        fetchUndoneTradings() 
    }, [uid])
    const handleShow = () => {
        setShow(true);
    }
    const handleClose = () => {
        setShow(false)
    }

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
        const createdAt = new Date().toISOString().slice(0, 10);
        if (isPurchaseMode){        
            if (id === undefined || ""){
                id = "BTC";
            }
            
            const res = await purchaseCoin( uid, id , price, quantity, coinPrice )
            
            setResultMsg(res.msg);
            
            if (res.transactionCode === 1 && user.cash &&user.assets ){
                user.cash -= price * quantity;
                const assets =user.assets;
                const tgtAsset = assets.find(e => e.symbol === id);
                if (tgtAsset && tgtAsset !== undefined && tgtAsset.quantity){
                    tgtAsset.quantity += quantity
                }
                setTradings([...tradings, {createdAt, isPurchase : true, price, quantity, symbol : id, uid}])
            }   else if (res.transactionCode === 0){
                setUndoneTradings([...tradings, {createdAt, isPurchase : false, price, quantity, symbol : id, uid}]);
            }
            
            setShow(true);
        }   else {
            if ( id === undefined || ""){
                id = "BTC";
            }
            const res = await sellCoin(uid, id, price, quantity, coinPrice);
            setResultMsg(res.msg);
            if (res.transactionCode === 1 && user !== undefined && user.cash !== undefined && user.assets !== undefined){
                user.cash += price * quantity;
                const _asset = user.assets.find(e => e.symbol === id);
                if (_asset && _asset.quantity !== undefined){
                    _asset.quantity -= quantity;
                }
                setTradings([...undoneTradings, {createdAt, isPurchase : false, price, quantity, symbol : id, uid}])
            }   else if (res.transactionCode === 0){
                setUndoneTradings([...undoneTradings, {createdAt, isPurchase : false, price, quantity, symbol : id, uid}])
            }
            const _user = await getUser(uid);
            user = _user;
            setShow(true);
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
        let usersRetainingQuantities = 0;
        if (!isPurchaseMode){
            if (user && user.assets){
                const tgt = user.assets.find(e => e.symbol === id);// needs to be done     
                if ( tgt === undefined || tgt.quantity === undefined){
                    usersRetainingQuantities = 0;
                }   else {
                    usersRetainingQuantities = tgt?.quantity;
                }
            }
        }
        setRetainingQuantities(usersRetainingQuantities);
    }, [isPurchaseMode])

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
                    <input type="number" step={0.01} name="price" className="form-control" id="basic-url" aria-describedby="basic-addon3" min={0.01} onChange={onChangeInput}/>
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

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>거래 결과 통보</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {resultMsg}
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    닫기
                </Button>
                
                </Modal.Footer>
            </Modal>
        </div>
        
    )
}

export default TradingWindow;