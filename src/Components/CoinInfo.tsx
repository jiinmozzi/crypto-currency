import "../Styles/CoinInfo.scss";
import modifyCoin from "../Util/modifyCoin";
import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
type Coin = {
    name : string,
    symbol : string,
    quotes : {
        KRW : {
            price : number
        }
    }
}
type InitiatedCoin = {
    name : string,
    symbol : string,
    quotes : {
        KRW : {
            price : number
        }
    }
}

type Coins = {
    coins : Coin[]
};

type InitiatedCoins = {
    initiatedCoins : InitiatedCoin[]
}
type CoinInfoProps = {
    coins : Coin[],
    initiatedCoins : InitiatedCoin[]
}
const CoinInfo = ({coins, initiatedCoins}: CoinInfoProps) => {
    const [initiatedCoin, setInitiatedCoin] = useState<Coin[]>([]);
    
    useEffect(() => {
        setInitiatedCoin(coins);
    }, [initiatedCoins])

    const navigate = useNavigate();
    
    useEffect(() => {
        if (coins.length === initiatedCoin.length){
            setInitiatedCoin(coins);
        }
    }, [coins])

    const onChangeInput = (e : React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const input = e.target.value;
        
        setInitiatedCoin(coins.filter(e => e.name.toUpperCase().indexOf(input.toUpperCase()) !== -1 || e.symbol.indexOf(input.toUpperCase()) !== -1));
    }

    
    return initiatedCoin && (
        <div className="coin-info-wrapper">
            <div className="mb-3">
                <input type="coin" className="form-control" id="exampleFormControlInput1" placeholder="코인명/심볼 검색" onChange={onChangeInput}/>
            </div>
            <div className="coin-info-inner-wrapper">
                <table className="table mb-0">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">코인명</th>
                            <th scope="col">심볼</th>
                            <th scope="col">가격(원)</th>
                            <th scope="col">전일대비</th>
                        </tr>
                    </thead>
                    <tbody className="table-light">
                        {initiatedCoin.map((coin:Coin, idx) => {
                            return (
                                <tr className="nav-coin" onClick={() => navigate(`/trading/${coin.symbol}`)}>
                                    <td>{coin.name}</td>
                                    <td>{coin.symbol}</td>
                                    <td>{coin.quotes.KRW.price.toFixed(2)}</td>
                                    <td>{(100 * (coin.quotes.KRW.price - initiatedCoins[idx].quotes.KRW.price) / initiatedCoins[idx].quotes.KRW.price).toFixed(2)}%</td>
                                </tr>   
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default CoinInfo;

