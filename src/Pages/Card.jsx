import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createURL } from '../config'
import './Card.css'
import Icons from './Icons'


const Card = (props) => {
    const navigate = useNavigate();
  const [blogid , setBlogid] = useState();
  const [count,setCount] = useState(0)

  useEffect(()=>{
    setBlogid(props.id)
      },[])

    
  return (
    <div className="resdiv">
        <div className='container1 '>
        <div className="card1">
            <div className="content1">
                <h2> {props.id}</h2>
                <h3 className='mb-3'> {props.title}</h3>
                <p id="Card_content" style={{fontWeight:'500'}}> {props.content }</p>
                <Link  id='like' style={{marginRight:10}}  to=''>  
                <button onClick={()=>{setCount(count+1)}} style={{borderStyle:'none'}}><i className="fas fa-thumbs-up"></i></button>  
                
                Like 
                {/* {count} */}

                {/* <button onClick={()=>{count === 0 ? setCount(0) :setCount(count-1)}} style={{borderStyle:'none'}}><i className="fas fa-thumbs-down"></i></button>   */}
                 </Link>
                <Link  id='share' style={{marginRight:10}} to=''> Share <i className="fas fa-share"></i> </Link>
                <Link id='more'  style={{marginRight:10}} to=''> More <i className="fas fa-angle-double-right"></i></Link>
         
            </div>
        </div>    
    </div>
        
    </div>
  )
}

export default Card