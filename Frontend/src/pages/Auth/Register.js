import React,{useState} from 'react'
import Layout from '../../Components/Layout/Layout'
import '../style.css'
import axios from 'axios'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [name,setname]=useState("")
    const[email,setemail]=useState("")
    const[password,setpassword]=useState("")
    const[phone,setphone]=useState("")
    const[address,setaddress]=useState("")
    const[answer,setAnswer]=useState("")
    const navi=useNavigate();
    
  //form Function 
    const Handlesubmit= async (e)=>{
         e.preventDefault()
         try{
            const res=await axios.post("/api/v1/auth/register",
            {name,email,password,phone,address,answer}
            )
            toast.success("Register Succefully")
            if(res && res.data.success){
                toast.success(res.data  && res.data.message)
                setTimeout(() => {
                  navi("/login")
                },500);
               
            }else{
              toast.success("Register")
            }
         }
         catch(error){
            toast.error("Something went wrong")
         }
    }
  return (
    <Layout title="Register">
        <div className='form-container'>
            <h1>Register Form</h1>
<form onSubmit={Handlesubmit}>
<div className="mb-3">
    <input
     type="text" 
     value={name}
     onChange={(e)=>{setname(e.target.value)}}
     className="form-control" 
     id="exampleInputEmail1" 
     placeholder="Enter Your Name" 
     required 
     />

  </div>
  <div className="mb-3">
    <input
     type="text"
     value={email}
     onChange={(e)=>{setemail(e.target.value)}}
      className="form-control" 
      id="exampleInputEmail1"
       placeholder='E-mail'
        required/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
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
  <div className="mb-3">
    <input 
    type="text" 
    value={phone}
    onChange={(e)=>{setphone(e.target.value)}}
    className="form-control"
     id="exampleInputEmail1"
      placeholder='Contact details'
       required/>
  </div>
  <div className="mb-3">
    <input 
    type="text" 
    value={address}
    onChange={(e)=>{setaddress(e.target.value)}}
    className="form-control" 
    id="exampleInputEmail1"
     placeholder='Addres' 
     required/>
  </div>
  <div className="mb-3">
    <input 
    type="text" 
    value={answer}
    onChange={(e)=>{setAnswer(e.target.value)}}
    className="form-control" 
    id="exampleInputEmail1"
     placeholder='Your favarite word' 
     required/>
  </div>

  <button type="submit" className="btn btn-primary">Register</button>
</form>

</div>
    </Layout>
  )
}

export default Register