// type tradingModalState = {
//     coinName : string,
//     tradeType : string,
//     tradeSucceeded : boolean,
//     marketPrice ?: number,
//     tradedPrice ?: number,
//     tradedQuantity ?: number,
//     balance : number,
// }
const TradingModal = () => {
    return ( 
        <div className="trading-modal-wrapper">
            <div className="modal fade" tabIndex={-1} id="myModal" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Modal body text goes here.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TradingModal;