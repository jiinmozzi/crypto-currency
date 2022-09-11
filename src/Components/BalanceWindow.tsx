import React from "react";
import { useState, useEffect } from "react";
import deposit from "../Util/deposit";
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
type BalanceWindowParams = {
    uid : string,
    user : User
}

const BalanceWindow = ({uid, user} : BalanceWindowParams) => {
    const [isDeposit, setIsDeposit] = useState<boolean>(true);
    const [amount, setAmount] = useState<number>(0);
    const [resultMsg, setResultMsg] = useState<string>("");
    const onChangeType = (e : React.ChangeEvent<HTMLInputElement>) => {
        if ( e.target.id === "inlineRadio1"){
            setIsDeposit(true)
        }   else {
            setIsDeposit(false);
        }
    }
    const onSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isDeposit){
            const res = await deposit(uid, amount);
            setResultMsg(res.msg);
        }
    }
    const onChangeInput = (e : React.ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(e.target.value));
    }
    return (
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

                <h5>현재 잔고 : { user.cash }</h5>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon3">{isDeposit ? "입금할 금액" : "인출할 금액"}</span>
                    <input type="number" className="form-control" id="basic-url" aria-describedby="basic-addon3" onChange = {onChangeInput}/>
                </div>   

                <div style={{"width" : "100%", "display" : "flex", "flexDirection" : "row-reverse"}}>
                    <button style={{"width" : "40%"}} type="submit" className="btn btn-secondary">{isDeposit ? "입금하기" : "인출하기"}</button>
                </div>
                
            </form>
        </div>
        
    )
}

export default BalanceWindow;