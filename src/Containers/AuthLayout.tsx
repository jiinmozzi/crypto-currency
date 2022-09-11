import { Outlet } from "react-router-dom";
import {useSelector} from "react-redux";
import HeaderContainer from "./HeaderContainer";

const AuthLayout = () => {
    return (
        <>
            <HeaderContainer/>
            <Outlet/>
        </>
    )
}

export default AuthLayout;