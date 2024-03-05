import React, { useState } from 'react'
import { Modal } from 'antd';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import httpClient from '../../httpClient';
import LoaderBtn from '../loderbtn/LoderBtn';


const postSchema = yup
    .object({
        comment: yup.string().required(),            
    }).required()

const Comment = ({ isModalOpen, handleOk, handleCancel ,setUpdatePosts,post}) => {
    const [isLoading, setIsLoading] = useState(false);
    // Modal Code
    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(postSchema),
    });

    // create comment
    const onSubmit = (data) => {
        setIsLoading(true)
        httpClient.post("/comment/create", {
            postId:post._id
        }).then((res) => {
            console.log(res)
            setComment(res.data.Comment)
            handleCancel();
            setUpdatePosts(true);
        }).catch(err => console.log(err.message))
        .finally(() => setIsLoading(false));
    }

    return (

        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3>Create Comment</h3>
                <input type='text' className='form-control mb-3' {...register('comment')} />
                {
                    (errors.comment) ? <p className='alert alert-danger p-1 fs-6'>{errors.comment?.message}</p> : null
                }
                {/* <button className='btn btn-outline-warning btn-sm' type='submit'>Create</button> */}
                <LoaderBtn btnTitle="Create Post" btnType="btn-outline-warning" loading={isLoading} type="submit" />
            </form>
        </Modal>

    )
}

export default Comment;