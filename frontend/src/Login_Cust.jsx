import React, { useState } from 'react'
import './Form.css'
import {  useNavigate } from 'react-router-dom';
import NavBarCustomerLogin from './NavBarCustomerLogin';
import axios from 'axios';
import paths from '../paths';

function Login_Cust() {
    const [email, setEmail] =useState('');
    const [pass,setPass] = useState('');
    const navigate=useNavigate();

const redirect=()=>{
  navigate('/customer/register');
}

    const handleSubmit = (e)=> {
        e.preventDefault();
        axios.post(`${paths.basePath}${paths.userLogin}`,{username:email,password:pass}).then((val)=>{
          localStorage.setItem("user",JSON.stringify(val.data));
          navigate("/customer/studentdetails");
        }).catch((err)=>{
          window.alert("error in login");
        })
    }
  return (
    <>
    <NavBarCustomerLogin />
    <div className="loginbox">
    <h1>Login</h1>
    <form>
        <input required value={email} onChange={(e)=> setEmail(e.target.value)} type="email" placeholder='Enter your Email' id='email' name='email'/>
        <input required value={pass} onChange={(e)=> setPass(e.target.value)} type="password" placeholder='Password' id='password' name='password'/>
        <button type="submit" onClick={handleSubmit}>Login</button>
        <button id='Redirect' onClick={redirect}>Don't have and Account? Sign Up</button>

    </form>
  </div>
  </>
  )
}

export default Login_Cust