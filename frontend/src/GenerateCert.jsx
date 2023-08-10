import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GenerateCert.css"
function GenerateCert(){
    const[name,setName]=useState('');
    const[inst,setInst]=useState('');
    const[sdate,setStartDate]=useState('');
    const[edate,setEndDate]=useState('');
    const[pname,setProjName]=useState('');
    const[inch,setinch]=useState('');
    const navigate=useNavigate();

function HandleSubmit(e){
    e.preventDefault();
    navigate("/home/certificate");
}

return(
    <div className="certbox">
    <h1>Generate Certificate</h1>
    <form >
        <label htmlFor="name">Name</label>
        <input value={name} type="text" id="name" onChange={(e)=>setName(e.target.value)} placeholder="Enter Name"/>
        <label htmlFor="Institution">Institution</label>
        <input value={inst} onChange={(e)=>setInst(e.target.value)} type="text" id="institution" placeholder="Institution Name"/>
        <label  htmlFor="SDate">Start Date</label>
        <input value={sdate} onChange={(e)=>setStartDate(e.target.value)} type="date" id="SDate" />
        <label htmlFor="EDate">End Date</label>
        <input value={edate} onChange={(e)=>setEndDate(e.target.value)} type="date" id="EDate" />
        <label htmlFor="ProjectName">Project Name</label>
        <input value={pname} onChange={(e)=>setProjName(e.target.value)} type="text" id="Pname" />
        <label htmlFor="Incharge">Incharge</label>
        <input value={inch} onChange={(e)=>setinch(e.target.value)} type="text" id="Iname" />
        <button type="submit" onClick={HandleSubmit}>Generate Certificate</button>
    </form>
    </div>
    
)
}

export default GenerateCert;