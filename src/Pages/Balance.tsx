import BalanceHistory from "../Components/BalanceHistory";
import CoinInfo from "../Components/CoinInfo";
import Balances from "../Components/Balances";
import CoinInfoContainer, { useAppSelector } from "../Containers/CoinInfoContainer";
import { RootState } from "../Modules";
import BalanceContainer from "../Containers/BalanceContainer";


const Balance = () => {
    const coins = useAppSelector((state:RootState) => {
        return state.coins.coins;
    })
    return (
        <BalanceContainer/>
    )
}
export default Balance;