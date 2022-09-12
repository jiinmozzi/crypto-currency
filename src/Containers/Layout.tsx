import { Outlet } from "react-router-dom";
import {useSelector} from "react-redux";
import HeaderContainer from "./HeaderContainer";
import Footer from "../Components/Footer";

const Layout = () => {
    return (
        <>
            <HeaderContainer />
            <Outlet/>
            <Footer/>
        </>
    )
}

export default Layout;