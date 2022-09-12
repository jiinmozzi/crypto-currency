import CoinInfoTable from "../Components/CoinInfo";
import CoinInfoContainer from "../Containers/CoinInfoContainer";
import Ranking from "../Components/Ranking";
import "../Styles/Home.scss";
const Home = () => {
    return (
        <div className="home-wrapper">
            <CoinInfoContainer/>
            <Ranking />
        </div>
    )
}
export default Home;