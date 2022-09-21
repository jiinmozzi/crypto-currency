import "../Styles/Auth.scss";
import { useState, useEffect, useRef } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/service";
import {doc, setDoc, Firestore, addDoc, collection, getDocs} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import db from "../Firebase/service";
import getBalances from "../Util/getBalances";

type InitialState = {
    onSignInSuccess : () => void,
    onSignInFail : () => void,
    onSignUpSuccess : () => void,
    onSignUpFail : () => void,
}

type Asset = {
    symbol : string,
    averagePrice : number,
    quantity : number;
}
const DUPLICATED = "auth/email-already-in-use"; // 회원가입 시 중복
const INVALID_EMAIL_FORM = "auth/invalid-email"; // 회원가입 혹은 로그인시 잘못된 야잇ㄱ
const WRONG_PASSWORD = "auth/wrong-password"; // 로그인 시 잘못된 비빌번호
const WEAK_PASSWORD = "auth/weak-password"; // 회원가입 시
const USER_NOT_FOUND = "auth/user-not-found"; // 로그인 시

const Auth = ({onSignInSuccess, onSignInFail, onSignUpSuccess, onSignUpFail} : InitialState): any => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [authSucceedMsg, setAuthSucceedMsg] = useState<string>("");
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        getBalances("hello");
    }, [])
    const onChangeInput = (event : any) : void => {
        const {target : {name, value} } = event;
        if ( name === "email" ){
            setEmail(value);
        }   else if ( name === "password" ){
            setPassword(value);
        }   else return;
    }

    const onSubmitSignIn = (event : any) => {
        event.preventDefault();
        
        signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            const user = userCredential. user;
            setAuthSucceedMsg("로그인 완료 되었습니다. 잠시 후 홈페이지로 이동합니다.");
            setTimeout(() => {
                onSignInSuccess();
            }, 2000)
        })
        .catch(err => {
            if (err.code ===  INVALID_EMAIL_FORM){
                setErrorMsg("잘못된 이메일 양식입니다. '@'가 이용되어야 합니다.")
            }   else if (err.code === WRONG_PASSWORD){
                setErrorMsg("잘못된 비밀번호입니다.")
            }   else if (err.code === USER_NOT_FOUND ){
                setErrorMsg("존재하지 않는 유저입니다.")
            }   else {
                setErrorMsg("인터넷 연결이 원활하지 않습니다. 인터넷 상태를 확인하세요");
            }

            if (emailRef.current !== null){
                emailRef.current.value = "";
            }
            if (passwordRef.current !== null){
                passwordRef.current.value = "";
            }
            onSignInFail();
        });
    }
    const onSubmitSignUp = (event : any) => {
        event.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then(async(userCredential) => {
            const user = userCredential.user;
            
            const assetArray : Asset[] = []; 
            const userObj = {
                uid : user.uid,
                email : email,
                cash : 10000000,
                assets : assetArray,
            }
            try {
                await setDoc(doc(db, "users", user.uid), userObj);  
                await addDoc(collection(db, "balances"), {uid : user.uid, createdAt : new Date().toISOString().slice(0, 10), amount : 10000000, isDeposit : true});
            }   catch(err){
                return -1;
            }
            
            setAuthSucceedMsg("회원가입 완료 되었습니다. 잠시 후 홈페이지로 이동합니다.");
            setTimeout(() => {
                onSignUpSuccess();
            }, 2000)
        })
        .catch(err => {
            if (err.code ===  DUPLICATED){
                setErrorMsg("이미 가입된 이메일입니다. 다른 메일 계정을 이용해주세요");
            }   else if (err.code === INVALID_EMAIL_FORM){
                setErrorMsg("잘못된 이메일 양식입니다. '@'가 이용되어야 합니다.")
            }   else if (err.code === WEAK_PASSWORD ){
                setErrorMsg("비밀번호는 6자리 이상이어야 합니다.");
            }
            if (emailRef.current !== null){
                emailRef.current.value = "";
            }
            if (passwordRef.current !== null){
                passwordRef.current.value = "";
            }
            
            onSignUpFail();
        })
    }
    return (
        <>
            <div className="sidenav">
                <div className="login-main-text">
                <h2>가상 코인거래소<br/> 로그인 페이지</h2>
                <p>서비스를 이용하기 위해 회원가입 및 로그인하세요</p>
                </div>
            </div>
            <div className="main">
                <div className="col-md-6 col-sm-12">
                <div className="login-form">
                    <form onSubmit={(e : any) => e.preventDefault()}>
                        <div className="form-group">
                            <label>이메일</label>
                            <input ref={emailRef} onChange={onChangeInput} name="email" type="text" className="form-control" placeholder="이메일 주소 입력" required/>
                        </div>
                        <div className="form-group">
                            <label>비밀번호</label>
                            <input ref={passwordRef} onChange={onChangeInput} name="password" type="password" className="form-control" placeholder="비밀번호 입력" required/>
                        </div>
                        <button onClick={onSubmitSignIn} className="btn btn-black">로그인</button>
                        <button onClick={onSubmitSignUp} className="btn btn-secondary">회원가입</button>
                        { errorMsg && 
                            <div className="alert alert-warning" role="alert" style={{"marginTop" : "2vh"}}>
                                {errorMsg}
                            </div>
                        }
                        { authSucceedMsg && 
                            <div className="alert alert-primary" role="alert" style={{"marginTop" : "2vh"}}>
                                {authSucceedMsg}
                            </div>
                        }
                    </form>
                </div>
                </div>
            </div>
        </>
    )
}

export default Auth;