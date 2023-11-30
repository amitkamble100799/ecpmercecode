import React,{useState} from 'react'
import Layout from '../../Components/Layout/Layout'
import '../style.css'
import axios from 'axios'
import toast from 'react-hot-toast';
import { useNavigate,useLocation, Navigate } from 'react-router-dom'

const Forgotpassword = () => {
    const[email,setemail]=useState("")
    const[newpassword,setNewpassword]=useState("")
    const [answer,setAnswer]=useState('');
    const navi=useNavigate();
    const Handlesubmit= async (e)=>{
        e.preventDefault()
        try{
           const res=await axios.post("/api/v1/auth/forgotpassword",
           {email,newpassword,answer}
           )
           if(res&& res.data.success){
               toast.success(res.data  && res.data.message)
               setTimeout(()=>{
                  navi("/login")
               },100)
              
           }else if(!res.data.password){
             toast.error("invalid password")
           }
        }catch(error){
           toast.error("Something went wrong")
        }
   }
  return (
    <Layout title='forgot password'>
        <h1>Forgotpassword</h1>
        <div className='form-container'>
        <h1>Forgot Password</h1>
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
 type="text"
 value={answer}
 onChange={(e)=>{setAnswer(e.target.value)}}
  className="form-control" 
  id="exampleInputEmail1"
   placeholder='entrer-your favorite word'
    required/>
</div>
<div className="mb-3">
<input
 type="password" 
 value={newpassword}
 onChange={(e)=>{setNewpassword(e.target.value)}}
 className="form-control"
  id="exampleInputPassword1" 
  placeholder='Enter your Password' 
  required />
</div>
<div className='mb-3'>
<button type="submit" className="btn btn-primary">Reset</button>
</div>

</form>

</div>
        </Layout>
  )
}

export default Forgotpassword