import React from 'react'
import { Link } from 'react-router-dom'
import './dashboard.css'

function Dashboard() {
  return (
    <div class ="main">
      <h1>DashBoard</h1>
    <div class="apply">
        <Link to={"/customer/studentdetails"} >Apply For Internship</Link>
    </div>
    <div class="status">
    <Link to={"/customer/status"} >Status of your Application</Link>
</div>
</div>
  )
}

export default Dashboard