import React, { useEffect, useState } from 'react'
import { Modal } from 'antd';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import httpClient from '../../httpClient';
import LoaderBtn from '../loderbtn/LoderBtn';
import { useDispatch } from 'react-redux';

const postSchema = yup
    .object({
        name: yup.string().required(),  
        email: yup.string().required()    
    }).required()

const ProfileModal = ({ isModalOpen, handleOk, handleCancel ,setUpdatePosts}) => {
    const [isLoading, setIsLoading] = useState(false);
    // Modal Code
    const dispatch=useDispatch();
    const { register, handleSubmit,setValue, formState: { errors }, } = useForm({
        resolver: yupResolver(postSchema),
    });

    // create post
    const onSubmit = (data) => {
        console.log(data)
        setIsLoading(true)
        httpClient.put("user/update",{
           name: data.name,
           email: data.email,
           photo: data.photo[0]
        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            console.log(res.data.user,"update api user")
            localStorage.setItem("userupdate",JSON.stringify(res.data.user)) 
            const user=JSON.parse(localStorage.getItem('userupdate'))
            dispatch(updateuser(user));
            setIsLoading(false);
            profileCancele();
            setUpdatePosts(true);
        }).catch(err => console.log(err.message))
        .finally(() => setIsLoading(false));
    }
useEffect(()=>{
        httpClient.get("/user/get").then((res)=>{
            setValue("name",res.data.user.name)
            setValue("email",res.data.user.email)
        })
    },[isModalOpen])
    return (

        <Modal title="Profile Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3>Update User Profile</h3>
                <input type='text' className='form-control mb-3' {...register('name')} />
                {
                    (errors.name) ? <p className='alert alert-danger p-1 fs-6'>{errors.name?.message}</p> : null
                }
                <input type='text' className='form-control mb-3' {...register('email')} />
                {
                    (errors.email) ? <p className='alert alert-danger p-1 fs-6'>{errors.email?.message}</p> : null
                }
                <input type='file' className='form-control mb-3' {...register('photo')} />
                {
                    (errors.photo) ? <p className='alert alert-danger p-1 fs-6'>{errors.photo?.message}</p> : null
                }
                {/* <button className='btn btn-outline-warning btn-sm' type='submit'>Create</button> */}
                <LoaderBtn btnTitle="Create Post" btnType="btn-outline-warning" loading={isLoading} type="submit" />
            </form>
        </Modal>

    )
}

export default ProfileModal