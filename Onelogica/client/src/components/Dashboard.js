import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
const Dashboard = () => {
    const [log,setLog]=useState([]);
    
   function filterbyid(){
      var name=document.getElementById("name").value;
      const filtereddata= log.filter((curr,indx)=>{
        if(curr.employeeid===name)
        return curr;
      })

      setLog(filtereddata)
      document.getElementById('reset').style.display = 'block';
   }

   function handlereset() {
    window.location.reload();
  }

    async function getlogs(){

      const response=  await axios.get('https://onelogica-assignment.onrender.com/getlogs')
           
      if(response.data){
        setLog(response.data);
        console.log("log",log)
      }
         
    }
    useEffect( ()=>{
      getlogs();
        
    },[])

    
  return (

    <>
    <Navbar></Navbar>
    <h1 style={{color:"white",backgroundColor:"#ffc107",margin:"0.5rem"}}>Dashboard</h1>

    <div className='row'>
      <div className='col-sm-12 col-lg-12 col-md-12'>
        
        <p><input type="text" id="name" placeholder="Search EmployeeId" style={{borderRadius:'0.5rem',margin:'0.5rem'}} ></input> <button type="submit" onClick={filterbyid} style={{backgroundColor:'black',color:'white',borderRadius:'0.5rem'}}>Search</button></p>
      </div>
     </div>
    <div className="table-responsive">

      
      <table className="table">
        <thead>
          <tr>
          <th scope="col">EmployeeId</th>
            <th scope="col">Employee Name</th>
            <th scope="col">Employee EmailId</th>
            <th scope="col">Login Time</th>
            <th scope="col">Logout Time</th>
            
          </tr>
        </thead>
        <tbody>
          

        {
            log.map((soln,indx)=>{
                
                const {username,employeeid,useremail,logintime ,logouttime} = soln;
                return(
          <tr >
            <td>{employeeid}</td>
            <td >{username}</td>
            <td>{useremail}</td>
            <td>{logintime}</td>
            <td>{logouttime}</td>
            
          </tr>
                )
            })
}

          
        </tbody>
      </table>
    </div>
    <center><img id='reset' style={{ display: 'none', marginTop: '0.5rem',marginBottom:'1rem', cursor: 'pointer' }} src='reset icon.png' onClick={handlereset} alt='Reset Icon' /> </center>
    </>
  );
}

export default Dashboard;

