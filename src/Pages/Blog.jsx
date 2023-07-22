import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import SingleBlog from './SingleBlog';
import {createURL} from '../config'
import axios from "axios"
import {useNavigate} from "react-router-dom"
import {toast} from "react-toastify"
import Card from './Card'

function Blog() {
  const navigate = useNavigate();
  const [blog, setBlog] = useState()



  const loaddata = () =>{
    const url = createURL('blog/all');

    // read the token 
    const token = sessionStorage['token'];

    if(!token){
      navigate('/')
      return;
    }

    axios.get(url,{
      headers:{
        "x-token": token,
      },
    }).then((res)=>{
      const result = res.data;
      
      if (result["status"] === "success") {
        if(result["data"].length === 0)
      {
        toast.warn(" Haven’t been created the blog")
      }else{
        setBlog(result['data']);
      }
      }
      else{
        toast.error("Error during the load Blog")
        navigate('/')
      }
    }).catch((error)=>{
      console.log(`error: `, error);
    })
  }



  useEffect(()=>{
loaddata()
  },[])

  return (
    <div>
      <Navbar/>
      {        blog && blog.map((value,index)=>{
        const {title,details,id} = blog[index];
        //  return <SingleBlog title={title} content={details} id={id} key={index} />
         return <Card title={title} content={details} id={id} key={index} />
        })
      }
    </div>
  )
}

export default Blog