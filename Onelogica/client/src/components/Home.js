import React from 'react'
import Navbar from './Navbar'
import {motion} from 'framer-motion'
import { NavLink } from 'react-router-dom'
import Swal from 'sweetalert2'
import {useNavigate} from 'react-router-dom'
export default function Home() {
 
  const navigate=useNavigate()
  function handleclick(){

    if(localStorage.getItem('role')==="Admin"){
      navigate('/Dashboard')
  }
  else {
    Swal.fire({
      icon: "error",
      title: "Access denied.",
      text: "Only Admin can view dashboard",
      footer: '<h6 style="color:red">Logout & Visit Signup/Login page to see Admin credentials</h6>'
    });
  }

  }
  return (

    <>
    <Navbar></Navbar>
  
      
 {/* hero start */}

 <div className='imageback' style={{backgroundImage:`url(${'office.jpg'})`,backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center',border:'transparent',height:'28rem',marginTop:"0rem"}}>
    
    <div style={{backgroundColor: 'rgba(0, 0, 0, 0.5)',height:'28rem'}}>
   
 
   <h1 style={{color:'#ED7D31',paddingTop:'5.5rem',marginBottom:'0.3rem',padding:'0rem',scale:0.2}}>StaffTrack360</h1>
<h4 style={{color:'#ffc107',marginBottom:'7rem'}}>A Employee Presence Tracking Platform</h4>

  <a href='#'> <motion.button   onClick={handleclick} whileHover={{boxShadow:'1px 1px 2px white, 0 0 25px white, 0 0 5px #ED7D31'}} transition={{duration:0.5}} style={{backgroundColor:'',border:'yellow',padding:'0.5rem',marginBottom:'1rem',opacity:'1',boxShadow:'1px 1px 2px #ED7D31, 0 0 25px #ED7D31, 0 0 5px #ED7D31'}} id='create' >Vist Dashboard</motion.button></a>
   </div>

 </div>
    {/* hero end */}
      
    
    </>
  )
}
