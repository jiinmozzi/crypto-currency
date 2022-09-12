import Investment from "../Components/Investment";
import CoinInfoContainer from "./CoinInfoContainer";
import getUser from "../Util/getUser";
import "../Styles/InvestmentContainer.scss";
import {useEffect, useState} from "react";
import {getAuth} from "firebase/auth";
import { RootState } from "../Modules";
import { useAppDispatch, useAppSelector } from "./CoinInfoContainer";
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

const initialUser : User = {
    
}
const InvestmentContainer = () => {
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

    useEffect(() => {
        const fetchUser = async() => {
            if (typeof userId === "string" && userId !== ""){
                const {user, userRefId} = await getUser(userId);
                setUser(user);
            }
        }
        fetchUser();
    }, [userId])

    return (
        <div className="investment-container-wrapper">
            <Investment uid={userId} user={user} coins={coins}/>
            <CoinInfoContainer />
        </div>
    )
}

export default InvestmentContainer;