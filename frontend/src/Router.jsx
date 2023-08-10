import * as React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import LoginSuccess from "./Login-Success";
import GenerateCert from "./GenerateCert";
import Certificate from "./Certificate";
import DynamicTable from "./DynamicTable";
import Login_Admin from "./Login_Admin";
import Login_Cust from "./Login_Cust";
import LoginSuccessCustomer from "./Login-Success-Customer";
import Integrity from "./Integrity";
import Status from "./Status";
import Register from "./Register";
import ApplyInternship from "./ApplyInternship";
import IntegrityWithoutLogin from "./IntegrityWithoutLogin";
import CustomerCertificate from './customerCertificate';

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <Login_Admin />,
  } ,
  {
    path: "/home/",
    element: <LoginSuccess />,
    children: [
      {
      path: "applications",
      element: <DynamicTable />
      },
      {
        path: "generatecertificates",
        element: <GenerateCert />
      },
      {
        path: "certificate/:ref",
        element: <Certificate />
      }
    ]
  },
  {
    path: "/",
    element: <Login_Cust />
  },
  {
    path: "/checkintegrity-without-login",
    element: <IntegrityWithoutLogin />
  },

  {
    path: "/customer/",
    element: <LoginSuccessCustomer />,
    children: [
    
      {
        path: "checkintegrity",
        element: <Integrity />
      },
      {
        path: "certificate",
        element: <Certificate />
      },
      {
        path: "studentdetails",
        element: <ApplyInternship />
      },
      {
        path: "status",
        element: <Status />,
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "cust/certificate/:id/:aid",
        element: <CustomerCertificate />
      }
      
    ]
  },

]);

function Router(){
    return(
        <RouterProvider router={router}/>
        
    )
}
export default Router