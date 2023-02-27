import React from 'react'
import "./Register.css"
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { registerMethod } from '../../Store/AsyncMethods/registerMethod'
import toast, { Toaster } from "react-hot-toast"
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Loading from '../Loader/Loading'


function Register(prop) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState(
    {
      name: "",
      email: "",
      phone:"",
      password: "",
      cpassword: ""
    }
  )
  const { loading, user ,RegisterError , RegisterMessage} = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (RegisterError.length > 0)
      RegisterError.map(error => toast.error(error.msg))

  }, [RegisterError])


  useEffect(() => {
    if (RegisterMessage.length > 0)
        toast.success(RegisterMessage);
  }, [RegisterMessage])
  
  const handleState = (e) => {
    const { name, value } = e.target
    setState({ ...state, [name]: value })
  }

  const handleClick = async (e) => {
    e.preventDefault();
    if (state.password !== state.cpassword)
      toast.error("Password does't Match, Please check");
    else
      dispatch(registerMethod(state));

  }


  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Register</title>
      </Helmet>
      <div className='register-container bg-grey'>
        <div className='form bg-white'>
          <Toaster position="top-right" reverseOrder={false} toastOptions={{ style: { fontSize: '14px' } }} />
          <span className='span'>Registration</span>
          <form id='register-form' onSubmit={handleClick} method="POST">
            <input type="text" name="name" value={state.name} placeholder='Enter Name' onChange={handleState} ></input>
            <input type="text" name="email" value={state.email} placeholder='Enter Email' onChange={handleState}></input>
            <input type="text" name="phone" value={state.phone} placeholder='Enter mobile no' onChange={handleState}></input>
            <input type="password" name="password" value={state.password} placeholder='Enter Password' onChange={handleState}></input>
            <input type="password" name="cpassword" value={state.cpassword} placeholder='Re-Enter Password' onChange={handleState}></input>
            <input type="submit" className="button" value={loading ? <Loading/>: 'Register'}>
            </input>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register