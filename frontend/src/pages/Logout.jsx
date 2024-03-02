import React from 'react'
import { useEffect } from 'react';
import { useSelector,useDispatch } from "react-redux"
import { Navigate, useNavigate } from 'react-router-dom';
import { authSlice, logoutStart } from "../authSlice/authSlice"

function Logout() {
  const navigate = useNavigate();
  // const userInfo = useSelector((state) => state.userAuth);
const dispatch=useDispatch();

  useEffect(() => {
    localStorage.removeItem("accessToken");
    dispatch(logoutStart())
    navigate("/")
  }, [])


  return (
    <>
    </>
  )
}

export default Logout;