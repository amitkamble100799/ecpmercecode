import React,{useState} from 'react'
import Layout from '../../Components/Layout/Layout'
import '../style.css'
import axios from 'axios'
import toast from 'react-hot-toast';
import { useNavigate,useLocation, Navigate } from 'react-router-dom'
import { useAuth } from '../../Context/Auth';
const Login = () => {
    const[email,setemail]=useState("")
    const[password,setpassword]=useState("")
    const[auth,setAuth]=useAuth()
    const navi=useNavigate();
    const location=useLocation()

    const Handlesubmit= async (e)=>{
        e.preventDefault()
        try{
           const res=await axios.post("/api/v1/auth/login",
           {email,password}
           )
           if(res&& res.data.success){
               toast.success(res.data  && res.data.message)
               
                setAuth({
                  ...auth,
                  user: res.data.user,
                  token:res.data.token,
                })
                localStorage.setItem("auth",JSON.stringify(res.data));

               setTimeout(()=>{
                  navi(location.state || "/")
               },100)
              
           }else if(!res.data.password){
             toast.error("invalid password")
           }
        }catch(error){
           toast.error("Something went wrong")
        }
   }
  return (
    <Layout title="Login">
    <div className='form-container'>
        <h1>Login Form</h1>
<form onSubmit={Handlesubmit}>
<div className="mb-3">
<input
 type="text"
 value={email}
 onChange={(e)=>{setemail(e.target.value)}}
  className="form-control" 
  id="exampleInputEmail1"
   placeholder='E-mail'
    required/>
</div>
<div className="mb-3">
<input
 type="password" 
 value={password}
 onChange={(e)=>{setpassword(e.target.value)}}
 className="form-control"
  id="exampleInputPassword1" 
  placeholder='Enter your Password' 
  required />
</div>
<div className='mb-3'>
<button type="submit" className="btn btn-primary">Login</button>
</div>
<button type="submit" className="btn btn-primary" onClick={()=>{navi('/forgot-password')}}>Forgot password</button>

</form>

</div>
</Layout>
  )
}

export default Login