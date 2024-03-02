import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Button } from 'antd';
import { asyncLogin } from "../authSlice/authSlice"
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
const accessToken = localStorage.getItem("accessToken");


const loginSchema = yup
  .object({
    email: yup.string().email("Email is required for login").required(),
    password: yup.string().required()
  }).required()

const Login = () => {

  const { register, handleSubmit, formState: { errors }, } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const userInfo = useSelector((state) => state.userAuth);

  const navigator = useNavigate();
  const dispacher = useDispatch();
  // const [loadings, setLoadings] = useState(true);


  // loading
  // const enterLoading = (index) => {
  //   setLoadings((prevLoadings) => {
  //     const newLoadings = [...prevLoadings];
  //     newLoadings[index] = true;
  //     return newLoadings;
  //   });
  //   setTimeout(() => {
  //     setLoadings((prevLoadings) => {
  //       const newLoadings = [...prevLoadings];
  //       newLoadings[index] = false;
  //       return newLoadings;
  //     });
  //   }, 6000);
  // };


  const onSubmit = (data) => {
    dispacher(asyncLogin(data))
  }

  useEffect(() => {
    if (userInfo.isLogin === true) {
      navigator("/");
    }
  }, [userInfo.isLogin]);

  return (
    <>
      <div className="card w-50 mx-auto">
        <div className="card-header"><h4 className="text-center">Login Form</h4></div>
        <div className="card-body">
          <div className="col-md-6 offset-md-3">
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
                (errors.email) ? <p className='alert alert-danger p-1 fs-6'>{errors.email?.message}</p> : null
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

              {
                (userInfo.loginerror !== null )?<p className='alert alert-danger'>{userInfo.loginerror}</p>:null
              }
              <Button type="primary" htmlType='submit'
                // loading={loadings}
              >
                Login
              </Button>
            </form>
          </div>
        </div>
      </div>

    </>
  )
}

export default Login;