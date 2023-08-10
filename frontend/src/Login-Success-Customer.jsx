import React from "react"
import NavBarCustomer from "./NavBarCustomer";
import { Outlet } from "react-router-dom";

function LoginSuccessCustomer(){
return(
    <div>
        <NavBarCustomer />
        <Outlet />
    </div>
);
}
export default LoginSuccessCustomer;