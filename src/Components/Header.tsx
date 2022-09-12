import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import daytrip from "../Asset/daytrip.png";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "../Styles/Header.scss"
import getUser from "../Util/getUser";

type InitialState = {
    isSignedIn : boolean,
    onSignOut : () => void,
}

const Header = ({isSignedIn, onSignOut} : InitialState) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!isSignedIn){
            navigate('/auth');
        }
    }, [isSignedIn])
   
    return (
    <Navbar bg="light" variant="light" fixed='top'>
        <Container>
            <Nav className="me-auto">
                <Nav.Link onClick={() => navigate("/")}><img id="dayTripImage" src={daytrip} alt="데이트립"/></Nav.Link>
                <Nav.Link onClick={isSignedIn ? () => navigate("/trading/BTC") : () => navigate('/auth')}>거래소</Nav.Link>
                <Nav.Link onClick={isSignedIn ? () => navigate("/balance") : () => navigate('/auth')}>입출금</Nav.Link>
                <Nav.Link onClick={isSignedIn ? () => navigate("/investment") : () => navigate('/auth')}>투자내역</Nav.Link>
            </Nav>
            {isSignedIn ? 
            (
                <>
                    <Nav className="me-auto" id="nav-auth">
                        <Nav.Link onClick={onSignOut}>로그아웃</Nav.Link>
                    </Nav>
                </>
            ) : (
                <>
                    <Nav className="me-auto" id="nav-auth">
                        <Nav.Link onClick={() => navigate('/auth')}>로그인 및 회원가입</Nav.Link>
                    </Nav>
                </>
                )
            }
            
        </Container>
    </Navbar>
    )
}
// Header.defaultProps = {
//     isSignedIn : false,
//     onSignOut : () => {}, 
// }
export default Header;