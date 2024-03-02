import React from 'react'
import "./PostCard.css";
import { CiHeart } from "react-icons/ci";
import { PiChatCircleText } from "react-icons/pi";
import { PiShareFatFill } from "react-icons/pi";
import TimeAgo from 'react-timeago'
import { Link } from 'react-router-dom';
import  Comment from '../commentmodel/Comment';
import { useState ,useRef} from 'react';
import httpClient from '../../httpClient';
import LoadingBar from 'react-top-loading-bar'
const PostCard = ({ post }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [comment,setComment]=useState("");
    const loadingRef = useRef(null);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handle = () => {
        showModal();
        loadingRef.current.continuousStart();
        // alert(localStorage.getItem("accessToken"));
        httpClient.post("/comment/create").then((res) => {
            if (res.data.status == 'success') {
                setComment(res.data.posts);
            }
        }).catch(err => console.log(err.message))
            .finally(() => {
                loadingRef.current.complete();
            })

    }
    return (
        
        <div className='postCard_ mt-4 pt-3 p-4'>
             <LoadingBar ref={loadingRef} />
            <Comment isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} commetn={comment} />
            <div className='d-flex gap-3 mb-3'>
                <div><img src="https://picsum.photos/200" className='d-inline profile__photo-small object-fit-cover' /></div>
                <div className=''>
                    <h6>{post.authorId.name} - <TimeAgo date={post.createdAt} /> </h6>
                    <p>{post.content}</p>
                </div>
            </div>
            <div className=''>
                <img className='img-fluid' src={post.imageUrl} />
            </div>
            <div className='postCard__icons d-flex align-items-center gap-3 mt-2'>
                <span><CiHeart style={{ fontSize: "20px" }} /></span>
                {/* <Link to="/comment">
                    <span><PiChatCircleText style={{ fontSize: "20px" }} /></span>
                </Link> */}
                <button onClick={handle}  className="btn btn-outline-danger fs-5 px-3 py-2 align-items-center gap-2 text-start d-flex mb-2">
                    <PiChatCircleText style={{ fontSize: "20px" }} />
            </button>
            
            <span><PiShareFatFill style={{ fontSize: "20px" }} /></span>
        </div>
    </div >
  )
}

export default PostCard;