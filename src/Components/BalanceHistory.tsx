import "../Styles/BalanceHistory.scss";

const BalanceHistory = () => {
    return(
    <div className="balance-history-wrapper">
        {/* <table className="table">
            <thead className="table-light">
                <tr>
                    <th scope="col">거래 종류</th>
                    <th scope="col">입출금 일자</th>
                    <th scope="col">금액</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <th scope="row">비트코인</th>
                <td>Mark</td>
                <td>Otto</td>
                </tr>
                <tr>
                <th scope="row">이더리움</th>
                <td>Jacob</td>
                <td>Thornton</td>
                </tr>
                <tr>
                <th scope="row">리플</th>
                <td>Larry the Bird</td>
                <td>@twitter</td>
                </tr>
            </tbody>
        </table> */}
        <div className="container text-center">
        <div className="row">
            <div className="col" style={{"backgroundColor" : "red"}}>
            Column
            </div>
            <div className="col">
            Column
            </div>
            <div className="col">
            Column
            </div>
        </div>
        </div>
    </div>
    )
}

export default BalanceHistory;