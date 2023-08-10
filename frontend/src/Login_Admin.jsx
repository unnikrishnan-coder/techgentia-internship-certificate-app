import React, { useState } from 'react'
import './Form.css'
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import paths from '../paths';

function Login_Admin() {
    const [email, setEmail] =useState('');
    const [pass,setPass] = useState('');
    const navigate=useNavigate();

    const handleSubmit = (e)=> {
        e.preventDefault();
        axios.post(`${paths.basePath}${paths.hrLogin}`,{
          username:email,
          password:pass
        }).then((res)=>{
          localStorage.setItem("user",res.data);
          navigate("/home/applications");
        }).catch((err)=>{
          console.log(err);
          window.alert(err.response.data);
        })
    }
  return (
  
    <div className="loginbox">
    <h1>Admin Login</h1>
    <form>
    <input value={email} onChange={(e)=> setEmail(e.target.value)} type="email" placeholder='Enter your Email' id='email' name='email'/>
    <input value={pass} onChange={(e)=> setPass(e.target.value)} type="password" placeholder='Password' id='password' name='password'/>
    <button type="submit" onClick={handleSubmit}>Login</button> 
    </form>
  </div>
  )
}

export default Login_Admin