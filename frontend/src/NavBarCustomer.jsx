//import { useNavigate } from "react-router-dom"
//import LoginSuccess from "./Login-Success";
import "./NavBar.css"
import { Link } from "react-router-dom"
import image from "./logo.jpeg";
import { useNavigate } from "react-router-dom";
function NavBarCustomer(){
    const navigate=useNavigate();
    function Goto(){
        navigate('/customer/studentdetails');
    }
    const logout = ()=>{
        localStorage.removeItem('user');
        navigate("/");
    }
    
    //const navigate = useNavigate();
    return(
        <>

        <nav className='Nav'>
            <img src={image} alt=""  onClick={Goto}/>  
            <ul>    
                <li>
                <Link to={"/customer/checkintegrity"}>Check Integrity</Link>
                </li>               
                <li>
                <Link to={"/customer/studentdetails"} >Apply For Internship</Link>
                </li>
                <li>
                <Link to={"/customer/status"} >Status of your Application</Link>
                </li>
                <li>
                <button onClick={logout}>Logout</button>
                </li>
            </ul>
            
        </nav>
        </>

    )
}

export default NavBarCustomer