import React, { useEffect } from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import {motion} from 'framer-motion'
export default function Navbar() {
  const navigate=useNavigate()
    var username=localStorage.getItem('username')
    var employeeid=localStorage.getItem('employeeid')
    var logintime=localStorage.getItem('loginTime')
    var useremail=localStorage.getItem('email')

  function handledashboard(){

    
    if(localStorage.getItem('role')==="Admin"){
        navigate('/Dashboard')
    }
    else if(localStorage.getItem('login')){
      Swal.fire({
        icon: "error",
        title: "Access denied.",
        text: "Only Admin can view dashboard",
        footer: '<h6 style="color:red">Logout & Visit Signup/Login page to see Admin credentials</h6>'
      });
    }
    else{
      Swal.fire("You must login to access this page");
    }
  }
 async function handlelogout(){

    var logouttime=new Date()
    var logouttime = logouttime.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
    
    const url="https://onelogica-assignment.onrender.com/tracking";
   
   const response= await fetch(url,{
      method:'POST',
      headers:{
       'Content-Type':'application/json',
      },
      body:JSON.stringify({username,employeeid,useremail,logintime,logouttime}),
     })
     .then(() => {
      console.log("Data updated successfully");
    })
    .catch((error) => {
      console.error("Error updating data:", error);
    });

     

    
    if(localStorage){
    localStorage.removeItem("login");
    localStorage.removeItem("role")
    localStorage.removeItem("username");
    localStorage.removeItem("email")
    localStorage.removeItem("token")
    localStorage.removeItem('currId')
    localStorage.removeItem("passw")
    localStorage.removeItem("loginTime")
    localStorage.removeItem("employeeid")
    }
  
     navigate("/")
  }

  useEffect(()=>{
    if(localStorage.getItem('login')){
     console.log('logout visible')  
     document.getElementById("login").style.display='none'
    }
    else{
      document.getElementById("logout").style.display = 'none';
       document.getElementById("profile").style.display='none'
 
    }
  },[])

     
  
  return (
    <div >
      

      <nav class="navbar navbar-expand-lg bg-body-tertiary" style={{ margin: '0', padding: '0', color: 'white' }} >
  <div className="container-fluid" style={{backgroundColor:'#343a40',color:'white'}}>
    <a class="navbar-brand" href="#" style={{color:"#ffc107"}}>StaffTrack360</a>
    <button class="navbar-toggler"  type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon" style={{color:"#ffc107"}} ><ion-icon name="list-outline"></ion-icon></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup"  style={{color:"white"}}>
      <div class="navbar-nav" style={{color:'white'}}>
        <Link class="nav-link active" aria-current="page" to="/Home" style={{color:'white'}}><motion.b whileHover={{boxShadow:'1px 1px 2px white, 0 0 25px white, 0 0 5px #ED7D31'}} transition={{duration:0.5}} style={{border:'yellow',padding:'0.5rem',marginBottom:'1rem',opacity:'1'}}>Home</motion.b></Link>
        <a class="nav-link" href="#" style={{color:'white'}} id="dashboard" onClick={handledashboard}><motion.b  whileHover={{boxShadow:'1px 1px 2px white, 0 0 25px white, 0 0 5px #ED7D31'}} transition={{duration:0.5}} style={{border:'yellow',padding:'0.5rem',marginBottom:'1rem',opacity:'1'}}>Dashborad</motion.b></a>
        <Link class="nav-link" to='/Login' style={{color:'white'}} id="login"><motion.b whileHover={{boxShadow:'1px 1px 2px white, 0 0 25px white, 0 0 5px #ED7D31'}} transition={{duration:0.5}} style={{border:'yellow',padding:'0.5rem',marginBottom:'1rem',opacity:'1'}}>LogIn</motion.b></Link>
        <a class="nav-link" href="#" style={{color:'white'}} id="logout" onClick={handlelogout}><motion.b  whileHover={{boxShadow:'1px 1px 2px white, 0 0 25px white, 0 0 5px #ED7D31'}} transition={{duration:0.5}} style={{border:'yellow',padding:'0.5rem',marginBottom:'1rem',opacity:'1'}}>LogOut</motion.b></a>
        <motion.a style={{marginRight:"0.5rem",cursor:'pointer',color:'white'}}  whileHover={{boxShadow:'1px 1px 2px white, 0 0 25px white, 0 0 5px #ED7D31'}} transition={{duration:0.5}} id="profile"  class="nav-link active" aria-current="page" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions"><b>Profile</b></motion.a>
      </div>
    </div>
  </div>
</nav>



<div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
  <div class="offcanvas-header" style={{backgroundColor:'#ffc107',color:'white'}}>
    <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">User Profile</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
  <img src="user.jpg" className='img-fluid' style={{height:'5rem'}}></img><br></br><br></br>
  <b> Username:-{localStorage.getItem("username")} </b>  <br></br>
  <p><b>EmployeeId:- {localStorage.getItem("employeeid")}</b></p>
      <p><b>Email Id:- {localStorage.getItem("email")}</b></p>

      <NavLink to="/Login"><motion.button onClick={handlelogout} style={{backgroundColor:'#ffc107',color:'white',padding:'0.4rem',border:'0.1rem transparent'}}>Log Out</motion.button></NavLink>
      
  </div>
</div>
    </div>
  )
}
