import React, { useState } from 'react'
import "../App.css"

const CustomModal = (props) => {
    const [openModal,setOpenModal] = useState(props.status);
    

  return (
    <>
    <div>
        CustomModal
        <button onClick={()=>{setOpenModal({})}}>  </button>
        </div>

      <div className='row'>

        <div className="col"></div>
        <div className="col">
        <div className='container'>
      {openModal && <div className="row">
            <div className='modalBackground'> 
        <div className='modalContainer'>
           
                <div className='title' style={{display:'inline'}} >
                    <p style={{fontSize:'18px'}}>{props.title} </p>
                </div>
                <div className='body'>
                    <p>{props.body}</p>
                </div>
                <div className='footer'>
                    <button  onClick={()=>{setOpenModal(false)}} id='cancelBtn' >Cancel</button>
                    <button>Ok</button>
                </div>
        </div>
         </div>
           
        </div>
        }
      </div>
        </div>
        <div className="col"></div>

      </div>
    </>
  )
}

export default CustomModal