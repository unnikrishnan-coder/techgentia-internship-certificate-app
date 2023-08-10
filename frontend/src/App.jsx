import React, { useState } from 'react';
import './App.css';
import Login  from "./Login_Admin";
import LoginSuccess from './Login-Success';
import Register from "./Register"
import Router from './Router';


function App() {

  //const [currentForm, setCurrentForm] = useState('login');
  //const toggleForm= (formName) => {
  //  setCurrentForm(formName);
  //}

  return (
    <Router />
)
}

export default App
