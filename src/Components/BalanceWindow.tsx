import React from "react";
import { useState, useEffect } from "react";
import deposit from "../Util/deposit";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import "../Styles/BalanceWindow.scss";
import withdraw from "../Util/withdraw";
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
type Balance = {
    id : string,
    createdAt : String,
    amount : number,
    isDeposit : boolean,
}

type BalanceWindowParams = {
    uid : string,
    user : User,
    balances : Balance[],
    setBalances : any,
}

const BalanceWindow = ({uid, user, balances, setBalances} : BalanceWindowParams) => {
    const [isDeposit, setIsDeposit] = useState<boolean>(true);
    const [amount, setAmount] = useState<number>(0);
    const [resultMsg, setResultMsg] = useState<string>("");
    const [show, setShow] = useState<boolean>(false);
    const [retainingCash, setRetainingCash] = useState<number>(0);
    const handleShow = () => {
        setShow(true);
    }
    const handleClose = () => {
        setShow(false);
    }
    
    useEffect(() => {
        if (user.cash !== undefined){
            setRetainingCash(user.cash);
        }
    }, [user])
    const onChangeType = (e : React.ChangeEvent<HTMLInputElement>) => {
        if ( e.target.id === "inlineRadio1"){
            setIsDeposit(true)
        }   else {
            setIsDeposit(false);
        }
    }
    const onSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const createdAt = new Date().toISOString().slice(0, 10);
        if (isDeposit){
            const res = await deposit(uid, amount);
            setResultMsg(res.msg);
            setRetainingCash(res.cash);
            setBalances([...balances, {createdAt, amount, isDeposit, uid}])
        }   else {
            const res = await withdraw(uid, amount);
            setRetainingCash(res.cash);
            setResultMsg(res.msg)
            if (res.transactionCode === 1){
                setBalances([...balances, {createdAt, amount, isDeposit, uid}]);
            }
        }
        handleShow();
    }
    const onChangeInput = (e : React.ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(e.target.value));
    }
    return user && (
        <div className="balance-window-wrapper">
            <form onSubmit={onSubmit}>
                <div style={{"display" : "flex", "justifyContent": "center"}}>
                    <div className="form-check form-check-inline" style={{"textAlign" : "center"}}>
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" onChange={onChangeType}/>
                        <label className="form-check-label" htmlFor="inlineRadio1">입금</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" onChange={onChangeType}/>
                        <label className="form-check-label" htmlFor="inlineRadio2">출금</label>
                    </div>
                </div>
                <br></br>
                <h5 style={{"textAlign" : "center"}}>현재 잔고 : { retainingCash }</h5>
                <br></br>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon3">{isDeposit ? "입금할 금액" : "인출할 금액"}</span>
                    <input type="number" className="form-control" id="basic-url" aria-describedby="basic-addon3" onChange = {onChangeInput}/>
                </div>   

                <div style={{"width" : "100%", "display" : "flex", "flexDirection" : "row-reverse"}}>
                    <button style={{"width" : "40%"}} type="submit" className="btn btn-secondary">{isDeposit ? "입금하기" : "인출하기"}</button>
                </div>
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                    <Modal.Title>입출금 결과 통보</Modal.Title>
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
            </form>
        </div>
        
    )
}

export default BalanceWindow;