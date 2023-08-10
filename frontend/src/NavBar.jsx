//import { useNavigate } from "react-router-dom"
//import LoginSuccess from "./Login-Success";
import "./NavBar.css"
import { Link } from "react-router-dom"
import image from "./logo.jpeg";
import { useNavigate } from "react-router-dom";
function NavBar(){
    const navigate=useNavigate();
    function Goto(){
        navigate('/home/applications');
    }
    const logout = ()=>{
        localStorage.removeItem('user');
        navigate("/admin");
    }
    //const navigate = useNavigate();
    return(
        <>

        <nav className='Nav'>
            <img src={image} alt="" onClick={Goto}/>
            <ul>
                <li>
                <Link to={"/home/applications"}>Home</Link>
                </li>               
                {/* <li>
                <Link to={"/home/generatecertificates"}>Generate Certificate</Link>
                </li>                */}
                <li>
                <button onClick={logout}>Logout</button>
                </li>               
            </ul>
            
        </nav>
        </>

    )
}

export default NavBar