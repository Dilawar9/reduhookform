
import React from 'react'
import "./PostCard.css";
import { CiHeart } from "react-icons/ci";
import { PiChatCircleText } from "react-icons/pi";
import { PiShareFatFill } from "react-icons/pi";


const PostCard = () => {
  return (
    <div className='postCard_ mt-4 pt-3 p-4'>
        <div className='d-flex gap-3 mb-3'>
            <div><img src="https://picsum.photos/200" className='d-inline profile__photo-small object-fit-cover' /></div>
            <div className=''>
                <h6>Johen Does - 8h ago</h6>
                <p>This picture is taken in sahara desert</p>
            </div>
        </div>
        <div className=''>
            <img className='img-fluid' src='https://picsum.photos/720' />
        </div>
        <div className='postCard__icons d-flex align-items-center gap-3 mt-2'>
            <span><CiHeart style={{ fontSize: "20px" }} /></span>
            <span><PiChatCircleText style={{ fontSize: "20px" }} /></span>
            <span><PiShareFatFill style={{ fontSize: "20px" }} /></span>
        </div>
    </div>
  )
}

export default PostCard;