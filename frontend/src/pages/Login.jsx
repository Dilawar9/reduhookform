import React from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"


import { asyncLogin } from "../authSlice/authSlice"
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from 'react'


const loginSchema = yup
  .object({
    email: yup.string().email("Email is required for login").required(),
    password: yup.string().required()
  }).required()

const Login = () => {
  const { register, handleSubmit, watch, formState: { errors }, } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const userInfo = useSelector((state) => state.userAuth);
  const navigator = useNavigate();
  const dispacher = useDispatch();


  const onSubmit = (data) => {
    console.log(data);
    dispacher(asyncLogin(data))
  };

  useEffect(() => {
    if (userInfo.isLogin === true) {
      navigator("/");
    }
  }, [userInfo.isLogin]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h2 className="text-center mb-4">Login Form</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  {...register("email")}
                />
              </div>
              {
                (errors.email) ? <p className='alert alert-danger'>{errors.email?.message}</p> : null
              }

              {/* {errors.email?.type === "maxLength" && (
                <p className="alert alert-danger">Maximum 10 characters allowed</p>
              )} */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  {...register("password")}
                />
              </div>
              {
                (errors.password) ? <p className='alert alert-danger'>{errors.password?.message}</p> : null
              }
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>

    </>
  )
}

export default Login;