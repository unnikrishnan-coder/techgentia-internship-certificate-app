import { useEffect } from "react";
import {useParams} from "react-router-dom"
import axios from 'axios';
import paths from "../paths";
import { useState } from "react";

function CustomerCertificate(){
const params = useParams();
const [ref,setRef] = useState("");
const [err,setErr] = useState(false);

useEffect(()=>{
    console.log(params);
    axios.post(`${paths.basePath}/certificate/get_certificate`,{
        id:params.id,
        aid:params.aid
    }).then((res)=>{
        console.log(res);
        setRef(res.data.REFERENCE_NO);
    }).catch((err)=>{
        console.log(err);
        setErr(true);
    })
},[])
console.log(ref);
    return(
        <>
        <h1>Certificate</h1>
       {
        err?<h1>Certificate is not generated</h1>: <h2 style={{"textAlign":"center"}}>Certificate reference number: {ref}</h2>
       }
        </>
    )
}

export default CustomerCertificate;