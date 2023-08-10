import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css';
import axios from'axios';
import paths from '../paths';

function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [cnfrmpass, setcnfrmPass] = useState('');
    const [dob, setDOB] = useState('');
    const [gender, setGender] = useState('');
    const [Qualification, setQualification] = useState('');
    const [inst, setInst] = useState('');
    const navigate = useNavigate();

    const redirect = () => {
        navigate('/');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(pass!==cnfrmpass){
            window.alert("Password does not match");
            return;
        }else{
            const data = {
                fname:firstName,
                lname:lastName,
                email,
                password:pass,
                dob,
                gender,
                quali:Qualification,
                inst:inst
            };
            axios.post(`${paths.basePath}${paths.userReg}`,data).then((val)=>{
                navigate("/");
            }).catch((err)=>{
                window.alert("error in signup");
            })
        }
    }
    return (
        
        <div className='mainlogin'>
            <form className='signupbox' >
                <h2>SignUp</h2>
                <input required value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" placeholder='First Name' id='firstName' name='FirstName' />
                <input required value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" placeholder='Last Name' id='LastName' name='LastName' />
                <select required value={gender} onChange={(e) => setGender(e.target.value)} id="gender" className='dropregister'>
                    <option value="">Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Others</option>

                </select>

                <select required value={Qualification} onChange={(e) => setQualification(e.target.value)} name="qual" id="qual" className='dropregister'>
                    <option value="">Qualification</option>
                    <option value="higher">Higher Secondary</option>
                    <option value="under">Under graduate</option>
                    <option value="post">Post graduate</option>

                </select>

                <input required type="text " value={inst} onChange={(e) => setInst(e.target.value)} name="cname" id=" " placeholder="College / Institution Name " />

                
                <input required value={email} className='ipbox' onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Email' id='email' name='email' />
                
                <input required className='ipbox' value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder='Password' id='password' name='password' />
                
                <input className='ipbox' value={cnfrmpass} onChange={(e) => setcnfrmPass(e.target.value)} type="password" placeholder='Confirm Password' id='password' name='password' />
                
                <input required className='ipbox' value={dob} onChange={(e) => setDOB(e.target.value)} type="date" placeholder='DOB' id='DOB' name='DOB' />

                <div className='btn1'>
                <button type='submit' className='applybtn1' onClick={handleSubmit}>Register</button>
                <button className='haveact' onClick={redirect}>Already have an Account? Login</button>
                </div>
            </form>
            
        </div>

    )

}

export default Register