import React, { useEffect } from 'react'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const AuthGuard = ({ children }) => {
    const userInfo = useSelector((state) => state.userAuth);
    let navigate = useNavigate();
    const accessToken = localStorage.getItem("accessToken");
    useEffect(() => {
        if (userInfo.isLogin !== true) {
            navigate("/login")
        }
    }, [])

    if (accessToken) {
        return children
    }
}

export default AuthGuard;