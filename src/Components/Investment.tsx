import { useEffect, useState } from "react";
import getBalances from "../Util/getBalances";
import getTradings from "../Util/getTradings";

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
type Coin = {
    name : string,
    symbol : string,
    quotes : {
        KRW : {
            price : number
        }
    }
}
type InvestmentType = {
    uid : string,
    user : User,
    coins : Coin[]
}
type Balance = {
    id : string,
    createdAt : String,
    amount : number,
    isDeposit : boolean,
}
type TradeHistory = {
    createdAt : string,
    isPurchase : boolean,
    price : number,
    quantity : number,
    symbol : string,
    uid : string,
}
const Investment = ({uid, user, coins} : InvestmentType) => {
    const [myAssets, setMyAssets] = useState<Asset[]>([]);
    const [myAssetsPrices, setMyAssetsPrices] = useState<number[]>([]);
    const [myBalanceHistory, setMyBalanceHistory] = useState<Balance[]>([]);
    const [myTradingHistory, setMyTradingHistory] = useState<TradeHistory[]>([]);
    const [totalDeposit, setTotalDeposit] = useState<number>(0);
    const [totalWithdrawal, setTotalWithdrawal] = useState<number>(0);
    const [myCurrentValue, setMyCurrentValue] = useState<number>(0);
    const [myPrevValue, setMyPrevValue] = useState<number>(0);
    const [myAveragePrices, setMyAveragePrices] = useState<number[]>([]);
    const [gains, setGains] = useState<number[]>([]);
    useEffect(() => {
        const getBalanceHistories = async () => {
            const _balanceHisotries = await getBalances(uid);
            setMyBalanceHistory(_balanceHisotries);
        }
        getBalanceHistories();
        const getAssetsHistories = async () => {
            const _myhistory = await getTradings(uid);
            setMyTradingHistory(_myhistory);
        }
        getAssetsHistories();
        if (user.assets !== undefined){
            setMyAssets(user.assets);
        }
    }, [user, uid, coins])

    useEffect(() => {    
        let prevValue = 0;
        let currentValue = 0;
        
        const myAssetsPricesArray:number[] = [];
        const myAveragePricesArray:number[] = [];
        const myPrevValueArray = [];
        const myCurrentValueArray = [];

        // 맨 처음 가격 * 지금 내 코인 가격
        // 현재 가격 * 지금 내 코인 가격
        // {coin이름 : , }

        myAssets.forEach((asset:Asset) => {
            if (asset && asset.quantity !== undefined && asset.averagePrice !== undefined){
                myAveragePricesArray.push(asset.averagePrice);
                prevValue += asset.quantity * asset.averagePrice;
                
                const _asset = coins.find(coin => coin.symbol === asset.symbol);
                if (_asset){
                    myAssetsPricesArray.push(_asset.quotes.KRW.price); 
                    currentValue += asset.quantity * _asset.quotes.KRW.price;
                }
            }
            setMyPrevValue(prevValue);
            setMyCurrentValue(currentValue);
        })
        setMyAssetsPrices(myAssetsPricesArray);
        setMyAveragePrices(myAveragePricesArray);
    }, [myAssets, coins])

    useEffect(() => {
        let depositSum = 0;
        let withdrawalSum = 0;
        myBalanceHistory.forEach((e:Balance) => {
            if (e.isDeposit) depositSum += e.amount;
            else withdrawalSum += e.amount;
        })
        setTotalDeposit(depositSum);
        setTotalWithdrawal(withdrawalSum);
    }, [myBalanceHistory])

    useEffect(() => {
        let currentValue = 0;
        
        myAssets.forEach((asset:Asset) => {
            if (asset && asset.quantity !== undefined && asset.averagePrice !== undefined){
                const _asset = coins.find(coin => coin.symbol === asset.symbol);
                if (_asset){
                    currentValue += asset.quantity * _asset.quotes.KRW.price;
                }
            }
        })
        setMyCurrentValue(currentValue);
    }, [coins])

    useEffect(() => {
        if (myAssetsPrices){
            //
        }
    }, [coins])
    
    return myAssets && myAssetsPrices && myAveragePrices && (
        <div className="investment-wrapper">
            <div className="card">
                <h5 className="card-header">나의 투자 현황</h5>
                <div className="card-body">    
                    {/* <h5 className="card-title">총 입금액(A)</h5> */}
                    <p className="card-text">총 입금액(A) : ₩{totalDeposit}</p>
                    {/* <h5 className="card-title">총 출금액(B)</h5> */}
                    <p className="card-text">총 출금액(B) : ₩{totalWithdrawal}</p>
                    {/* <h5 className="card-title">잔여 현금(C)</h5> */}
                    <p className="card-text">잔여 현금(C) : ₩{user.cash}</p>
                    {/* <h5 className="card-title">총 잔여 코인 총액(D)</h5> */}
                    <p className="card-text">총 잔여 코인 총액(D) : ₩{myCurrentValue}</p>
                    <h6 className="card-title">전체 수익률( (B+C+D-A) / A)</h6>
                    <p className="card-text">{user.cash ? ((totalWithdrawal + user.cash + myCurrentValue - totalDeposit)*100 / totalDeposit).toFixed(2)  : ((totalWithdrawal + myCurrentValue - totalDeposit)*100 / totalDeposit).toFixed(2)}% </p>
                    <h6 className="card-title">잔여 코인 수익률( D - D' / D', D':코인 매수 총액)</h6>
                    <p className="card-text">{myPrevValue ? ((myCurrentValue - myPrevValue)*100 / myPrevValue).toFixed(2) : 0}% </p>
                </div>
            </div>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">코인종류</th>
                    <th scope="col">보유수량</th>
                    <th scope="col">나의 평균 단가</th>
                    <th scope="col">가격</th>
                    <th scope="col">수익률</th>
                    </tr>
                </thead>
                <tbody>
                    {myAssets ? myAssets.map((e:Asset, idx : number) => {

                        return (
                            <tr>
                                <th scope="row">{e.symbol}</th>
                                <td>{e.quantity }개</td>
                                <td>₩{e.averagePrice}</td>
                                <td>₩{myAssetsPrices[idx]}</td>
                                <td>{myAssetsPrices ? ((myAssetsPrices[idx] - myAveragePrices[idx])*100/ myAveragePrices[idx]).toFixed(2) : 0}%</td>
                                {/* <td>{gains[idx]}</td> */}
                            </tr>        
                        )
                    }) : null}
                </tbody>
            </table>
        </div>
    )
}
export default Investment;