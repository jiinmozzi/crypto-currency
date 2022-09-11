import React from 'react';
import { useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../Modules';
import {signInSuccess, signInFail, signUpSuccess, signUpFail} from "../Modules/auth";
import Auth from '../Components/Auth';
import {auth} from "../Firebase/service";

const AuthContainer = () => {
    const navigate = useNavigate();
    const isSignedIn = useSelector((state : RootState) => state.isSignedIn.isSignedIn);
    const dispatch = useDispatch();

    const onSignInSuccess = () : void => {
        dispatch(signInSuccess());
        navigate('/')
    }
    const onSignInFail = () : void => {
        dispatch(signInFail());
    }
    const onSignupSuccess = () : void  => {
        dispatch(signUpSuccess());
        navigate('/')
    }
    const onSignUpFail = () : void => {
        dispatch(signUpFail());
    }

    return (
        <>
            <Auth onSignInSuccess={onSignInSuccess} onSignInFail={onSignInFail} onSignUpSuccess={onSignupSuccess} onSignUpFail={onSignUpFail}></Auth>
        </>
    )
}

export default AuthContainer;