import React, {  useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import person from '../Img/Login.png'
import axios from 'axios'
import { createURL } from '../config';

const Login = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  

  const [mode,setMode] = useState(false)

  const onlogin = () => {
    if(email.length === 0 )
    {
      toast.error('Fill the email')
    }
    else if(password.length === 0){
      toast.error('Fill the Password')
    } else{
      const url = createURL("user/signup");
      axios.post(url,{
        email,password
      }).then(res =>{
        const result = res.data

        if(result['status'] === 'success')
        {
          const {firstName,lastName,token} = result['data']    
          sessionStorage['firstName'] = firstName
          sessionStorage['lastName'] = lastName
          sessionStorage['token'] = token

          // go to blogs page
          navigate('/blogs')
        }
        else{
          toast.error("Invalid Email and Password ")
        }
      }).catch(error=>{
        toast.error(' Please check the network ')
      })
    }

  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark" width="100%">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Blogger
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  href="#"
                ></Link>
              </li>
            </ul>
            <ul className="navbar-nav  mb-2 mb-lg-0">
            <li className="nav-item">
              <button className="btn btn-outline-primary" onClick={()=>{
                setMode(!mode)
                document.body.style.backgroundColor = mode === false ?"#ffffff" : '#1F1B24'
              }}>Dark mode</button>
            </li>
          </ul>

            <button className="btn btn-outline-primary" >
              <Link to="/signin" style={{ textDecoration: "none", color: 'white' }}>
                Sign in
              </Link>
            </button>
          </div>
        </div>
      </nav>


      <div className='text-center' style={{display:'flex' , textAlign:'center',  alignContent:"center", justifyContent:'center' }}>
     
        <div id='logindiv' style={{ 
          // background: '#4D455D',
           borderRadius: '15px', height: 'fit-content' , width:'fit-content', marginTop:'20px' }} >

              <img src={person} className='mt-4 mb-5' style={{ borderRadius: '50%', background: 'transparant' }} alt='icon' height='100px' ></img>
            


          


          {/* new element */}
          <div className='form-floating'>
            <input type='email' className='form-control mb-4 logininput' id='title' placeholder='Register Email' onChange={e=>setemail(e.target.value)} style={{ fontSize: 16, width: '90%', borderRadius: 20 }} ></input>
            <label htmlFor='title' className='text-center loginlabel' >Register Email </label>
          </div>
          <div className="mb-3 ">

            <div className='form-floating'>
              <input type='password' className='form-control logininput' placeholder='Password' id='password' onChange={(e)=>setpassword(e.target.value)} style={{ fontSize: 16, width: '90%', borderRadius: 20, }} ></input>
              <label htmlFor='title' className='text-center loginlabel' >Password </label>
            </div>
              



          </div>
         <div className='text-center'>
          <button onClick={onlogin} type='submit' className='btn loginbtn' style={{padding:"10px 15px" , fontSize:'20px'}}> Login </button>
          
          </div>
          <div className='dark text-center mt-2 mb-4' style={{fontSize:16,height:"fit-content",width:'100%' ,padding:"0px 50px"}}> Don't have an account yet? <Link to="/Signin" style={{textDecoration:'none' }}> Register here </Link></div>
        </div>

      </div>
    </>

  )
}

export default Login