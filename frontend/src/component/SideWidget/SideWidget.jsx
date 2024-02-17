import React, { useRef, useState } from 'react'
import "./styles.css";
import { Link } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { BsFillSignpostSplitFill } from "react-icons/bs";
import { RiUserSettingsFill } from "react-icons/ri";
import { MdCreateNewFolder } from "react-icons/md";
import { BiAtom } from "react-icons/bi";
import PostModal from '../PostModal/PostModal';
import { useSelector } from "react-redux"
import httpClient from '../../httpClient';
import LoadingBar from 'react-top-loading-bar'


const SideWidget = ({ image, setPosts, setUpdatePosts }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const userInfo = useSelector((state) => state.userAuth)
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

    const handleMyPosts = () => {
        loadingRef.current.continuousStart();
        // alert(localStorage.getItem("accessToken"));
            httpClient.get("/post/my").then((res) => {
                if (res.data.status == 'success') {
                    setPosts(res.data.posts);
                }
            }).catch(err => console.log(err.message))
            .finally( () => {
                loadingRef.current.complete();
            })

    }

    return (

        <div className=' p-4'>
            <LoadingBar  ref={loadingRef} />
            <PostModal isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} />
            <div className='mx-auto text-center'>
                <img src={image} className='d-inline sidewidget__photo object-fit-cover' />
            </div>
            <h3 className='fs-4 text-center mt-4'>{userInfo.name}</h3>
            <p className='fs-6 text-center w-75 mx-auto'>I am a professional photographer</p>

            <div className='mt-4 d-flex justify-content-around'>
                <div className='text-center'>
                    <h5>123</h5>
                    <p>Posts</p>
                </div>
                <div className='text-center'>
                    <h5>454</h5>
                    <p>Followers</p>
                </div>
                <div className='text-center'>
                    <h5>213</h5>
                    <p>Following</p>
                </div>
            </div>

            <div className='navLinks py-2'>
                <button onClick={ () => setUpdatePosts(true)} className="btn btn-outline-dark border-0 fs-5 px-3 py-2 align-items-center gap-2 text-start d-flex mb-2 ">
                    <IoMdHome style={{ fontSize: "24px" }} />
                    <span>Home</span>
                </button>
                <Link to='/' onClick={handleMyPosts} className="btn btn-outline-dark fs-5  border-0 px-3 py-2 align-items-center gap-2 text-start d-flex mb-2">
                    <BsFillSignpostSplitFill style={{ fontSize: "24px" }} />
                    <span>My Posts</span>
                </Link>
                <Link to='/' className="btn btn-outline-dark fs-5  border-0 px-3 py-2 align-items-center gap-2 text-start d-flex mb-2">
                    <RiUserSettingsFill style={{ fontSize: "24px" }} />
                    <span>Edit Profile</span>
                </Link>
                <button onClick={showModal} className="btn btn-outline-danger w-100 fs-5 px-3 py-2 align-items-center gap-2 text-start d-flex mb-2">
                    <MdCreateNewFolder style={{ fontSize: "24px" }} />
                    <span>New Post</span>
                </button>
            </div>
        </div>
    )
}

export default SideWidget;