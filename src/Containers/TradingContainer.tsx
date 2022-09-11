import CoinInfoContainer from "./CoinInfoContainer";
import TradingModal from "../Components/TradingModal";
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
const initialUser : User = {
    
}
const TradingContainer = () => {
    
    const [user, setUser] = useState<User>(initialUser);
    const [userId, setUserId] = useState<string>("");
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


    // useEffect(() => {
    //     console.log(user.email);
    // }, [user])
    return coins && (
        <div className="trading-container-wrapper">
            <TradingHistory />
            <TradingWindow uid={userId} coins={coins} user={user}/>
            <TradingModal />
            <CoinInfoContainer />
        </div>
    )
}
export default TradingContainer;