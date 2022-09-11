import "../Styles/Footer.scss";

const Footer = () => {
    return (
        // <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        //     <p className="col-md-4 mb-0 text-muted">&copy; 2021 Company, Inc</p>

        //     <a href="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
        //     <svg className="bi me-2" width="40" height="32" href="#bootstrap"></svg>
        //     </a>

        //     <ul className="nav col-md-4 justify-content-end">
        //         <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Home</a></li>
        //         <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Features</a></li>
        //         <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Pricing</a></li>
        //         <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">FAQs</a></li>
        //         <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">About</a></li>
        //     </ul>
        // </footer>
        <div className="footer-wrapper">
            <div className="container my-5" id="footer">
                <footer className="bg-light text-center">
                <div className="container p-4 pb-0">

                    <section className="">
                    <form action="">
            
                        <div className="row d-flex justify-content-center">
            
                        <div className="col-auto">
                            <p className="pt-2">
                            <strong>뉴스 구독하기</strong>
                            </p>
                        </div>
                        <div className="col-md-5 col-12">
                
                            <div className="form-outline mb-4">
                            <input type="email" id="form5Example2" className="form-control" />
                            <label className="form-label" htmlFor="form5Example2">이메일 주소</label>
                            </div>
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary mb-4">
                            구독하기
                            </button>
                        </div>
            
                        </div>
                    
                    </form>
                    </section>
                    
                </div>
                <div className="text-center p-3" style={{"backgroundColor" : "rgba(0, 0, 0, 0.2)"}}>
                    © 2022 Copyright:
                    <a className="text-dark" href="https://www.daytripapp.com/" style={{"textDecoration" : "none"}}> www.daytripapp.com</a>
                </div>
                </footer>
            
            </div>
        </div>
    )
}
export default Footer;