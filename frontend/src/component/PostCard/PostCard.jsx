import React, { useEffect } from 'react'
import "./PostCard.css";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { PiChatCircleText } from "react-icons/pi";
import { PiShareFatFill } from "react-icons/pi";
import TimeAgo from 'react-timeago'
import { Link } from 'react-router-dom';
import Comment from '../commentmodel/Comment';
import { useState, useRef } from 'react';
import httpClient from '../../httpClient';
import LoadingBar from 'react-top-loading-bar'
import { useSelector } from "react-redux"
const PostCard = ({ post, setUpdatePosts, image }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [totalLikes, setTotalLikes] = useState(0);
    const [isLikedIcon, setIsLikedIcon] = useState(true);
  
    const userInfo = useSelector((state) => state.userAuth)

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const handlelikeclick = async (postId, userId) => {
        try {
            const respons = await httpClient.post('/post/like', { postId: postId, userId: userId });
            console.log(respons)
            if (respons.data.isLike == true) {
                setIsLikedIcon(true);
                setTotalLikes(respons.data.totalikes)

            } else if (respons.data.isLike == false) {
                setIsLikedIcon(false)

                setTotalLikes(respons.data.totalikes)
            }
        } catch (error) {
            console.log(error.message)
        }

    }

    useEffect(()=>{
        if(post.isliked==true){
            setIsLikedIcon(true)
        }else{
            setIsLikedIcon(false)
        }
        setTotalLikes(post.totalikes)
    },[])
    return (

        <div className='postCard_ mt-4 pt-3 p-4'>
           
            <Comment isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} setUpdatePosts={setUpdatePosts} post={post} />
            <div className='d-flex gap-3 mb-3'>
                <div>{
                    (userInfo.userInfo == null ? <img src={image} className='d-inline profile__photo-small object-fit-cover' /> : <img src={post.authorId.photo} className='d-inline profile__photo-small object-fit-cover' />)}</div>
                <div className=''>
                    <h6>{post.authorId.name} - <TimeAgo date={post.createdAt} /> </h6>
                    <p>{post.content}</p>
                </div>
            </div>
            <div className=''>
                <img className='img-fluid' src={post.imageUrl} />
            </div>
            <div className='mt-2'>
                <span>Like:{totalLikes}</span>
            </div>
            <div className='postCard__icons d-flex align-items-center justify-content-between gap-3 mt-2'>
                <div className="">
                    <span onClick={() => { handlelikeclick(post._id, post.authorId._id) }} >
                    
                    {
                        (isLikedIcon)?<FaHeart style={{ color: "red" }}/>:<CiHeart style={{ fontSize: "20px" }} />
                    }
                    </span>


                    <span onClick={showModal} ><PiChatCircleText style={{ fontSize: "20px" }} /></span>
                    <span><PiShareFatFill style={{ fontSize: "20px" }} /></span>
                </div>

                <div>
                    <span>Total Comments:{post.comments.length}</span>
                </div>
            </div>
            <div className='mt-3'>
                {
                    post.comments.map((e, id) => {
                        return <div className='d-flex justify-content-between' key={id}>
                            <div>{e.comment}</div>
                            <div><TimeAgo date={e.createdAt} /></div>
                        </div>
                    })
                }
            </div>
        </div >
    )
}

export default PostCard;