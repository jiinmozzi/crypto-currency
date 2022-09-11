import "../Styles/TradingHistory.scss";
const TradingHistory = () => {
    return (
        <div className="trading-history-wrapper" style={{"display" : "flex", "flexDirection" : "column", "justifyContent" : "space-between"}}>
            <h6 className="fst-italic" style={{"textAlign" : "center", "fontWeight" : "bold"}}>과거 투자 내역</h6>
            <div className="past-trading">
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">일자</th>
                        <th scope="col">거래종류</th>
                        <th scope="col">수량</th>
                        <th scope="col">가격</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <th scope="row">BTC 매수</th>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        </tr>
                        <tr>
                        <th scope="row">BTC 매수</th>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        </tr>
                        <tr>
                        <th scope="row">2</th>
                        <td>Thornton</td>
                        <td>@fat</td>
                        <td>@mdo</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h6 className="fst-italic" style={{"textAlign" : "center", "fontWeight" : "bold"}}>미체결</h6>
            <div className="current-trading">
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">일자</th>
                        <th scope="col">거래종류</th>
                        <th scope="col">수량</th>
                        <th scope="col">가격</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <th scope="row">BTC 매수</th>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        </tr>
                        <tr>
                        <th scope="row">BTC 매수</th>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        </tr>
                        <tr>
                        <th scope="row">BTC 매수</th>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        </tr>
                        <tr>
                        <th scope="row">BTC 매수</th>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        </tr>

                        <tr>
                        <th scope="row">2</th>
                        <td>Thornton</td>
                        <td>@fat</td>
                        <td>@mdo</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default TradingHistory