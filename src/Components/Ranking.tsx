import {useState, useEffect} from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import db from "../Firebase/service";
import {RootState} from "../Modules";
import { useAppSelector } from "../Containers/CoinInfoContainer";

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
    assets? : Asset[],
    cash? : number,
    email? : string,
    uid? : string,
}
type Rank = {
    user : User,
    currentSum : number,
    return : number, 
}
const Ranking = () => {
    const coins = useAppSelector((state:RootState) : Coin[] => {
        return state.coins.coins;
    })
    const [users, setUsers] = useState<User[]>([])
    const [rankingArray, setRankingArray] = useState<Rank[]>([]);
    useEffect(() => {
        const gettingUsers = async() => {
            const usersArray : User[] = [];
            const q = query(collection(db, "users"));
            const usersQuery = await getDocs(q);
            usersQuery.forEach((e:any) => {
                usersArray.push(e.data())
            })
            setUsers(usersArray);
        }    
        gettingUsers();
    }, [])
    useEffect(() => {
        console.log(users);
        if (rankingArray.length === 0 && users.length !== 0){
            users.forEach(user => {
                let prevSum = 0;
                let currentSum = 0;
                const assets = user.assets;
                console.log(assets)
                assets?.forEach(asset => {
                    if (asset.averagePrice && asset.quantity){
                        
                        prevSum += asset.averagePrice * asset.quantity;
                    }
                    const _coin = coins.find((coin:Coin) => coin.symbol === asset.symbol);
                    console.log(_coin)
                    if (_coin && _coin?.quotes && asset.quantity){
                        currentSum += _coin.quotes.KRW.price * asset.quantity;
                    }
                })
                console.log(currentSum, prevSum)
                setRankingArray((prev) => [...prev, {user, currentSum : currentSum, return : (currentSum - prevSum)*100 /prevSum }])
            })
        }
    }, [users])

    useEffect(() => {
        console.log(rankingArray);
    }, [rankingArray])

    return rankingArray && (
        <div className="ranking-wrapper">
            <h4>오늘의 수익률 랭킹</h4>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">메일</th>
                    <th scope="col">수익률</th>
                    <th scope="col">보유 코인 총액</th>
                    </tr>
                </thead>
                <tbody>
                    {rankingArray.sort((a,b) => b.return - a.return).slice(0, 10).map((e, idx) => {
                        return (
                            <tr>
                                <th scope="row">{idx+1}</th>
                                <td>{e.user.email}</td>
                                <td>{e.currentSum === 0 ? 0 : e.return.toFixed(2)}%</td>
                                <td>{e.currentSum}</td>
                            </tr>
                        )
                    })}
                    
                </tbody>
            </table>
        </div>
    )    
    
}

export default Ranking;