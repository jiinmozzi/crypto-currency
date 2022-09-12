import "../Styles/BalanceContainer.scss";
import BalanceHistory from "../Components/BalanceHistory";
import {useState, useEffect} from "react";
import {getAuth} from "firebase/auth";
import getUser from "../Util/getUser";
import { useAppSelector } from "./CoinInfoContainer";
import {RootState} from "../Modules";
import CoinInfoContainer from "../Containers/CoinInfoContainer";
import BalanceWindow from "../Components/BalanceWindow";
import getBalances from "../Util/getBalances";
type User = {
    assets ?: Asset[],
    cash ?: number,
    email ?: string,
    uid ?: string,
}
type Asset = {
    symbol? : string,
    quantity? : number,
    averagePrice? : number,
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

const initialUser : User = {
    
}
type Balance = {
    id : string,
    createdAt : String,
    amount : number,
    isDeposit : boolean,
}
const BalanceContainer = () => {
    const auth = getAuth();
    const [userId, setUserId] = useState<string>("");
    const [user, setUser] = useState<User>(initialUser);
    const [balances, setBalances] = useState<Balance[]>([]);

    const coins = useAppSelector((state : RootState) : Coin[] => {
        return state.coins.coins;
    })

    useEffect(() => {
        if (auth.currentUser){
            setUserId(auth.currentUser.uid);
        }
    }, [])

    useEffect(() => {
    
        const fetchUser = async()=> {
            if (typeof userId === "string" && userId !== ""){
                const {user, userRefId} = await getUser(userId);
                setUser(user)
            }
        }
        fetchUser();
        const fetchBalances = async() => {
            if (typeof userId === "string" && userId !== ""){
                const balances = await getBalances(userId)
                setBalances(balances);
            }
        }
        fetchBalances();
    }, [userId])

    return coins && (
        <div className="balance-container-wrapper">
            <BalanceHistory uid={userId} user={user} balances={balances} setBalances={setBalances}/>
            <BalanceWindow uid={userId} user={user} balances={balances} setBalances={setBalances}/>
            <CoinInfoContainer />
        </div>
    )
}
export default BalanceContainer;