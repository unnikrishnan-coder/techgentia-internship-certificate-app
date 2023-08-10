//import { useNavigate } from "react-router-dom"
//import LoginSuccess from "./Login-Success";
import "./NavBar.css"
import { Link } from "react-router-dom"
import image from "./logo.jpeg";
import { useNavigate } from "react-router-dom";
    
function NavBarCustomerLogin(){

    const navigate=useNavigate();
    function Goto(){
        navigate('/');
    }
    return(
        <>

        <nav className='Nav'>
            <img src={image} alt=""  onClick={Goto}/>  
            <ul>    
                <li>
                <Link to={"/"}>Login</Link>
                </li>               
                <li>
                <Link to={"/checkintegrity-without-login"}>Check Integrity</Link>
                </li>               
            </ul>
            
        </nav>
        </>

    )
}

export default NavBarCustomerLogin