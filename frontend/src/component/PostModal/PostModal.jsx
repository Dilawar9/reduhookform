import React, { useState } from 'react'
import { Modal } from 'antd';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import httpClient from '../../httpClient';
import LoaderBtn from '../loderbtn/LoderBtn';


const postSchema = yup
    .object({
        content: yup.string().required()
    }).required()

const PostModal = ({ isModalOpen, handleOk, handleCancel }) => {
    const [isLoading, setIsLoading] = useState(false);
    // Modal Code
    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(postSchema),
    });

    // create post
    const onSubmit = (data) => {
        setIsLoading(true)
        httpClient.post("/post/create", {
            content: data.content,
            image: data.image[0]
        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            console.log(res)
            handleCancel();
        }).catch(err => console.log(err.message))
        .finally(() => setIsLoading(false));
    }

    return (

        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3>Create Post</h3>
                <input type='text' className='form-control mb-3' {...register('content')} />
                {
                    (errors.content) ? <p className='alert alert-danger p-1 fs-6'>{errors.content?.message}</p> : null
                }
                <input type="file" className='form-control mb-3' accept="image/*; capture=camera" {...register('image')} />
                {/* <button className='btn btn-outline-warning btn-sm' type='submit'>Create</button> */}
                <LoaderBtn btnTitle="Create Post" btnType="btn-outline-warning" loading={isLoading} type="submit" />
            </form>
        </Modal>

    )
}

export default PostModal