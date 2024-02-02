
import React, { useState } from 'react'
import { Modal } from 'antd';


const PostModal = ({isModalOpen, handleOk, handleCancel}) => {
    // Modal Code


    return (

        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <form>
                <input type='text' />
                <input type="file" accept="image/*;capture=camera" />
            </form>
        </Modal>

    )
}

export default PostModal