import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Protected from './components/Protected';
import {Route,Routes,BrowserRouter} from 'react-router-dom'
import Signup from './components/Signup';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useEffect } from 'react';
import Dashboard from './components/Dashboard';
function App() {


  return (
    <div className="App">

      <BrowserRouter>
   
      <Routes>
        <Route path='/Home' element={<Protected Component={Home}/>}></Route>
        <Route path='/' element={<Signup></Signup>}></Route>
        <Route path='/Login' element={<Login></Login>}></Route>
        <Route path='/Dashboard' element={<Protected Component={Dashboard}/>}></Route>
      </Routes>
      </BrowserRouter>
   <Footer></Footer>
    </div>
  );
}

export default App;
