import CoinInfoContainer from "./CoinInfoContainer";

import TradingWindow from "../Components/TradingWindow";
import TradingHistory from "../Components/TradingHistory";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "./CoinInfoContainer";
import "../Styles/TradingContainer.scss";
import { RootState } from "../Modules";
import getUser from "../Util/getUser";
import {useEffect, useState} from "react";
import {getAuth} from "firebase/auth";
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

type userParam = {
    userId : string, 
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

type Tradings = {
    createdAt : string,
    isPurchase : boolean,
    price : number,
    quantity : number,
    symbol : string,
    uid : string,
}
type undoneTradings = {
    createdAt : string,
    isPurchase : boolean,
    price : number,
    quantity : number,
    symbol : string,
    uid : string,
}
const initialUser : User = {
    
}
const TradingContainer = () => {
    
    const [user, setUser] = useState<User>(initialUser);
    const [userId, setUserId] = useState<string>("");
    const [tradings, setTradings] = useState<Tradings[]>([])
    const [undoneTradings, setUndoneTradings] = useState<undoneTradings[]>([]);
    const auth = getAuth();
    const coins = useAppSelector((state : RootState) : Coin[] => {
        return state.coins.coins;
    })

    useEffect(() => {
        if (auth.currentUser){
            setUserId(auth.currentUser.uid);
        }
    }, [])

    
    // useEffect(() => {
    //     getUser(userId);
    // }, [userId])
    
    useEffect(() => {
        const fetchUser = async() => {
            if (typeof userId === "string" && userId !== ""){
                const {user, userRefId} = await getUser(userId);
                setUser(user);
            }
        }
        fetchUser();
    }, [userId])


    
    return coins && (
        <div className="trading-container-wrapper">
            <TradingHistory uid={userId} user={user} tradings={tradings} undoneTradings={undoneTradings} setTradings={setTradings} setUndoneTradings={setUndoneTradings}/>
            <TradingWindow uid={userId} coins={coins} user={user} tradings={tradings} undoneTradings={undoneTradings} setTradings={setTradings} setUndoneTradings={setUndoneTradings}/>
            <CoinInfoContainer />
        </div>
    )
}
export default TradingContainer;