import { useState, useEffect } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from './pages/Logout';
import Dashboard from "./pages/Dashboard";
import Signup from './pages/Signup';
import Navbar from './component/Navebar'
import Comment from './pages/Comment';
import AuthGuard from './component/AuthGuard';
import { useSelector,useDispatch } from "react-redux"
import { authSlice, loginStart, updateuser } from "./authSlice/authSlice"
function App() {

  const dispatch=useDispatch();
  const userInfo = useSelector((state) => state.userAuth);


  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const user = JSON.parse(localStorage.getItem("userinfo"));
    if (accessToken !== null) {
        dispatch(loginStart());
        dispatch(updateuser(user));
    }
  }, [])



  return (
    <>
      <Navbar />

      <div className='container'>
        <Routes>
          <Route path='/' element={<AuthGuard> <Home /> </AuthGuard>} />
         
          <Route path="/logout" element={<Logout />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/comment' element={<Comment />} />

        
        </Routes>
      </div>
    </>
  )
}

export default App