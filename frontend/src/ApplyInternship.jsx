import React from 'react'
import './ApplyInternship.css';
import { useState } from 'react';
import axios from 'axios';
import paths from '../paths';

function ApplyInternship() {
    const [sDate,setSDate]=useState('');
    const [eDate,setEDate]=useState('');
    const [phone,setPhone]=useState('');
    const [resume,setResume]=useState('');

    const handleSubmit = (e)=> {
        e.preventDefault();
        const userId = JSON.parse(localStorage.getItem("user")).stu_id;
        const inst = JSON.parse(localStorage.getItem("user")).INSTITUITION;
        console.log(userId);
        let formData = new FormData();
        formData.append("from",sDate);
        formData.append("to",eDate);
        formData.append("phone",phone);
        formData.append("resume",resume);
        formData.append("stu_id",userId);
        formData.append("inst",inst);

        axios.post(`${paths.basePath}${paths.apply}`,formData,{headers:{
            "Content-Type":"multipart/form-data"
        }}).then((value)=>{
            window.alert("Internship Applied");
            setEDate("");
            setPhone("");
            setSDate("");
            setResume("");
            
        }).catch((err)=>{
            console.log(err);
            window.alert("Error while ")
        })
    }

    return (
        
        <div className="maindiv">
            <form className='input'>
                <h1> INTERNSHIP REGISTRATION</h1>
                <label htmlFor="" className='datelabel'>FROM DATE</label>
                <input value={sDate} className="box" type="date"   placeholder="FROM(dd/mm/yyyy)" onChange={(e)=>setSDate(e.target.value)} required />
                <label htmlFor="" className='datelabel'>TO DATE</label>
                <input value={eDate} type="date" className="box"   placeholder="TO(dd/mm/yyyy)" required onChange={(e)=>setEDate(e.target.value) } />
                <input value={phone} type="text" className="box"   placeholder="Phone Number" required onChange={(e)=>setPhone(e.target.value)} />
                <label htmlFor="resume" className='datelabel'>UPLOAD RESUME</label>
                <input type="file" className="upload" placeholder="Upload Resume" required onChange={(e)=>setResume(e.target.files[0])}/>
                    <button className='applybtn'  onClick={handleSubmit}>Apply</button>
            </form>
        </div>


    )
}

export default ApplyInternship