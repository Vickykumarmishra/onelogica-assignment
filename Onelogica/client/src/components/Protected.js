import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
export default function Protected(props) {
    
    const {Component}=props//destructring the component passed as a prop in this component
    const navigate=useNavigate()

 

    useEffect(()=>{

        if(localStorage.getItem('login')){
          //after successful login i am setted login key inside localstorage as true
          //so if user has logged in then only he can access the protected routes
          let login=localStorage.getItem('login');
         
         
        }
        else{
          
            Swal.fire("You must login to access this page");
          navigate('/Login')
  
        }
      },[])
  return (
    <div>
      {/* app.js m jis v component ko prootected m pass kara rahe hai, vo sab is component se hoke jayega load hote samay and us samy login key
      ka value agar false raha to redirect hoga login page par */}
      <Component/>
    </div>
  )
}
