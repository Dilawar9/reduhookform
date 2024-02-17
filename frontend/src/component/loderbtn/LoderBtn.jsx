import React from 'react'

const LoderBtn = (props) => {
    return (
        <button className={`btn ${props.btnType}`} disabled={(props.loading == true) ? true : null} type={props.type}>

            {
                (props.loading == true) ? (<><span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span><span role="status">Loading...</span></>) : props.btnTitle
            }

        </button>
    )
}

export default LoderBtn;