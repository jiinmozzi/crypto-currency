import "../Styles/CoinInfo.scss";
import TradingContainer from "../Containers/TradingContainer";
import { useParams } from "react-router-dom"
const Trading = () => {
    const {id} = useParams();
    
    return (
        <TradingContainer />
    )
}
export default Trading