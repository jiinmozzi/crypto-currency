import React from 'react';
import { useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../Modules';
import {signOut} from "../Modules/auth";
import Header from "../Components/Header";
import { auth } from "../Firebase/service";

const HeaderContainer = () => {
    
    const navigate = useNavigate();
    const isSignedIn = useSelector((state : RootState) => state.auth.isSignedIn);
    const dispatch = useDispatch();

    const onSignOut = () => {
        dispatch(signOut());
        auth.signOut();
        navigate('/');
    }

    return (
        <>
            <Header isSignedIn={isSignedIn} onSignOut={onSignOut} />
        </>
    )
}

export default HeaderContainer;