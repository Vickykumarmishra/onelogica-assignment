import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useFormik } from 'formik'
import * as yup from "yup";
// import Footer from './Footer';
import { SchemaForm } from '../schema/schemaform';
// import Navbar2 from './Navbar2';
import Navbar from './Navbar';
export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  
  const initialValues={

    username:"",
    email:"",
    password:"",
    }

    const {values,errors,touched,handleBlur,handleChange,handleSubmit}=useFormik({
        initialValues:initialValues,
        validationSchema:SchemaForm,
        onSubmit:(values,action)=>{
        console.log(values);
        action.resetForm();
        }
        })

  



  const handleLogin = async (e) => {
    e.preventDefault();

    let timerInterval;
    Swal.fire({
      title: "...Logging you in!",
      html: "I will close in <b></b> milliseconds.",
      timer: 60000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup().querySelector("b");
        timerInterval = setInterval(() => {
          timer.textContent = `${Swal.getTimerLeft()}`;
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });
    
    const response = await fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username,employeeid, email, password }),
    });

    if (response.ok) {

      Swal.close()
      var logintime=new Date()
      var logintime = logintime.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
      console.log(logintime)
      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('username',username)
      localStorage.setItem('email',email)
      localStorage.setItem('login',true)
      localStorage.setItem('loginTime',logintime)
   
      
      const token = data.token;
      const tokenParts = token.split('.');
     
      const payload = JSON.parse(atob(tokenParts[1]));
      
      const role = payload.role;
      var employeeid=payload.employeeid;
      const userId=payload.userId;
      localStorage.setItem('role', role);
      localStorage.setItem('currId',userId)
      localStorage.setItem('employeeid',employeeid)
      Swal.fire('Logged In', 'Welcome to Employee presence Tracker', 'success');

      navigate('/Home');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'User does not exist!',
        footer: '<p><b>Check your username and password carefully</b></p>',
      });
    }
  };

  return (

    <div >
    <Navbar></Navbar>
    <div className='container' style={{marginTop:"2rem"}}>
    <h6 style={{color:'white',backgroundColor:"#ffc107"}}>Admin Credentials:- username:AdminOneLogica25,password:aDmin25@1, email:adminvicky0141@gmail.com,</h6>
      <div className='row'>

        <div className='col-sm-12 col-md-6 col-lg-6'>
          <img src="login.png" className='img-fluid'></img>
        </div>
        <div className='col-sm-12 col-md-6 col-lg-6'>
        <div style={{marginBottom:"1rem"}}> <h1 style={{color:'#ffc107'}}><b>LogIn</b></h1></div>

        <div class="form-floating mb-3" style={{marginTop:"1rem"}}>
  <input type="text" class="form-control fullname" id="floatingInput1" placeholder="Full Name" name="username"
 onChange={(e) => {
  handleChange(e);
  setUsername(e.target.value);
}}
  value={values.username}  onBlur={handleBlur}  />
  <label for="floatingInput">User Name</label>
</div>
{errors.username && touched.username?(<p  style={{color:'red'}}className='form-error'>{errors.username}</p>):null}
          
<div class="form-floating mb-3" style={{}}>
  <input type="email" class="form-control email" id="floatingInput2" placeholder="name@example.com" name="email" value={values.email}  onChange={(e) => {
  handleChange(e);
  setEmail(e.target.value);
}}
           onBlur={handleBlur} />
  <label for="floatingInput">Email address</label>
</div>
{errors.email && touched.email?(<p  style={{color:'red'}}className='form-error'>{errors.email}</p>):null}

<div class="form-floating">
  <input type="password" class="form-control passw" id="floatingPassword" placeholder="Password"  name="password"  onChange={(e) => {
  handleChange(e);
  setPassword(e.target.value);
}}
          value={values.password}  onBlur={handleBlur} />
  <label for="floatingPassword">Password</label>
</div>
{errors.password && touched.password?(<p  style={{color:'red'}}className='form-error'>{errors.password}</p>):null}

<p style={{marginBottom:"1rem",marginTop:"1rem",color:'#ffc107'}}><input type="checkbox" class="ui-checkbox"  style={{marginRight:"0.5rem"}}></input>Remember Me</p>
<button className='btn btn-primary' style={{border:"0.1rem  transparent",marginTop:"2rem",backgroundColor:"#ffc107"}}  onClick={handleLogin}>Login</button>

<p className="signin" style={{color:'black'}}>
Don't have an account? <a href="/" style={{color:"#ffc107"}}>SignUp</a>
          </p>
        </div>

      </div>

      
       {/* footer */}

       
    </div> 
    {/* <Footer></Footer> */}
     </div>
  );
}
