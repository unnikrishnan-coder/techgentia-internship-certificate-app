import React from 'react'
import './status.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useEffect,useState } from 'react';
import paths from '../paths';

function Status() {
  const navigate=useNavigate();
  const [applications,setApplications] = useState([]);
  const handleSubmit = (app_id)=> {
    const st_id = JSON.parse(localStorage.getItem("user")).stu_id;
    navigate(`../cust/certificate/${st_id}/${app_id}`);
}

  useEffect(()=>{
    const userId = JSON.parse(localStorage.getItem("user")).stu_id;
    axios.get(`${paths.basePath}${paths.applications}?uid=${userId}`).then((res)=>{
      console.log(res.data);
      setApplications(res.data);
    }).catch((err)=>{
      console.log(err);
    })
  },[])

  return (
    <div className="statususer">
    <h2>APPLICATION STATUS</h2>
    <table>
      <thead>
      <tr>
        <th> Id: </th>
        <th> Institution Name: </th>
        <th> Phone Number: </th>
        <th> Application Status: </th>
        <th> Certificate Status</th>
      </tr>
      </thead>
      <tbody>
                {applications.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{val.appli_id}</td>
                            <td>{val.appli_college}</td>
                            <td>{val.appli_phone}</td>
                            <td>{val.status_check}</td>
                            <td><input className='click' type="button" value="Click Here" onClick={()=>handleSubmit(val.appli_id)}  /></td>
                        </tr>
                    )
                })}
        </tbody>
      
    </table>
  </div>
  )
}

export default Status