import {useParams} from "react-router-dom"

function Certificate(){
const {ref} = useParams();
console.log(ref);
    return(
        <>
        <h1>Certificate</h1>
        <h2 style={{"textAlign":"center"}}>Certificate reference number: {ref}</h2>
        </>
    )
}

export default Certificate;