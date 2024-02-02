
import React, { useEffect } from 'react'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const AuthGuard = ({ children }) => {
    const userInfo = useSelector((state) => state.userAuth);
    let navigate = useNavigate();

    useEffect(() => {
        if (userInfo.isLogin === false) {
            navigate("/login")
        }
    }, [])

    if (userInfo.isLogin === true) {
        return  children
    }
}

export default AuthGuard;