import { useState } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
import Signup from './pages/Signup';
import Navbar from './component/Navebar';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />

      <div className='container'>
      <h1>Authentication</h1>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          {/* <Route path='/' element={<Home />} /> */}
        </Routes>
      </div>
    </>
  )
}

export default App