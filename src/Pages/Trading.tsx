import "../Styles/CoinInfo.scss";
import TradingContainer from "../Containers/TradingContainer";
import { useParams } from "react-router-dom"
const Trading = () => {
    const {id} = useParams();
    console.log(id); 
    return (
        <TradingContainer />
    )
}
export default Trading