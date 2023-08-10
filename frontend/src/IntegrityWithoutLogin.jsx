import React from 'react'
import './integrity.css'
import { useState } from 'react';
import NavBarCustomerLogin from './NavBarCustomerLogin';
import axios from'axios';
import paths from '../paths';

function IntegrityWithoutLogin() {
  const[Refno,setRefno]=useState('');
  const [certdata,setCertData] = useState({});

  const handleSubmit = (e)=> {
    e.preventDefault();
    axios.post(`${paths.basePath}${paths.validate}`,{referenceID:Refno}).then((val)=>{
      setCertData(val.data);
      window.alert("Certificate valid");
    }).catch((err)=>{
      window.alert(err.response.data);
    })
}


  return (
  <>
    <NavBarCustomerLogin />
    <div className='int' >
    <div className='refbox'>
    <h2>Enter Reference Number</h2>
    <input value={Refno}  onChange={(e)=>setRefno(e.target.value)} type="text" className='ip' placeholder='Reference No'/>
    <button className='submitbtn' onClick={handleSubmit}>Submit</button>
    </div>
    </div>
  </>
  );
}
export default IntegrityWithoutLogin