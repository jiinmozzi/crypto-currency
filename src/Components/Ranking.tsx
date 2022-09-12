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
        let prevSum = 0;
        let currentSum = 0;
        
        if (rankingArray.length === 0 && users.length !== 0){
            users.forEach(user => {
                const assets = user.assets;
                assets?.forEach(asset => {
                    if (asset.averagePrice){
                        prevSum += asset.averagePrice;
                    }
                    coins.find((coin:Coin) => {
                        currentSum += coin.quotes.KRW.price;
                        }
                    )
                })
                setRankingArray([...rankingArray, {user, currentSum, return : (currentSum - prevSum /prevSum) }])
            })
        }
    }, [users])

    useEffect(() => {
        console.log(rankingArray);
    }, [rankingArray])
    return (
        <div className="ranking-wrapper">
            <h4>수익률 랭킹</h4>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">메일</th>
                    <th scope="col">수익률</th>
                    <th scope="col">금액</th>
                    </tr>
                </thead>
                <tbody>
                    {rankingArray.sort((a,b) => b.return - a.return).slice(0, 10).map((e, idx) => {
                        return (
                            <tr>
                                <th scope="row">{idx+1}</th>
                                <td>{e.user.email}</td>
                                <td>{e.return}</td>
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