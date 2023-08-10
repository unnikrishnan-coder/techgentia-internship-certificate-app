import React from "react"
import NavBar from "./NavBar";
import DynamicTable from "./DynamicTable";
import { Outlet } from "react-router-dom";

function LoginSuccess(){
return(
    <div>
        <NavBar/>
        <Outlet />
    </div>
);
}
export default LoginSuccess;