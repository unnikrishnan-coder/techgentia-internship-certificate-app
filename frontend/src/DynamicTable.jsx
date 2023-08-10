
import "./DynamicTable.css"
import TableData from "./TableData";
import StatusData from "./StatusData";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from 'axios';
import paths from "../paths";
import { useState } from "react";

function DynamicTable() {
    const navigate = useNavigate();
    const [applications,setApplications] = useState([]);

    const viewResume = (url)=>{
        console.log(url);
        window.location.href = url;
    }

    function ButtonAction(id){
        axios.post(`${paths.basePath}${paths.acceptAppli}`,{
            appli_id:id
        }).then((res)=>{
            window.location.reload();
        }).catch((err)=>{
            window.alert("Error while updating state")
        })
    }
    function ButtonActionGenerate(app_id,st_id){
        axios.post(`${paths.basePath}${paths.generate}`,{
            stu_id:st_id,
            appli_id:app_id,
            hr_id:123
        }).then((res)=>{
            window.alert("certificate generated");
            navigate(`/home/certificate/:${res.data.reference_no}`);
        }).catch((err)=>{
            window.alert("error while generating certificate");
        })
    }

    useEffect(()=>{
        axios.get(`${paths.basePath}${paths.applications}`).then((res)=>{
            console.log(res.data);
            setApplications(res.data);
        }).catch((err)=>{
            console.log(err);
            window.alert("Error while fetiching applications")
        })
    },[])
    return (
        <div className="statusbox">
            <h2>APPLICATIONS</h2>
    <table>
      <thead>
      <tr>
        <th> Name: </th>
        <th> Institution Name: </th>
        <th> Phone Number: </th>
        <th> View Resume: </th>
        <th> Application Status: </th>
        <th> Application Action: </th>
        <th> Certificate Status</th>
      </tr>
      </thead>
      <tbody>
                {applications.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{val.stu_fname} {val.stu_lname}</td>
                            <td>{val.appli_college}</td>
                            <td>{val.appli_phone}</td>
                            <td><input className="CertificateBtn" type="button" value="View" onClick={()=>viewResume(val.RESUME)} /></td>
                            <td> {val.status_check}</td>
                            {
                                val.status_check=="ACCEPTED"?
                                <td>
                                <input className="click" style={{"cursor":"not-allowed"}} type="button" value="Approve" />
                            </td>
                                :<td>
                                <input className="click" type="button" value="Approve" onClick={()=>ButtonAction(val.appli_id)} />
                            </td>
                            }
                            <td><input className="CertificateBtn" type="button" value="Generate Certificate" onClick={()=>ButtonActionGenerate(val.appli_id,val.stu_id)} /></td>
                        </tr>
                    )
                })}
        </tbody>
      
    </table>
    </div>
                            
    );
    }
     
    export default DynamicTable;