import React,{useEffect, useState} from 'react'
import Layout from '../../Components/Layout/Layout'
import Usermenu from '../../Components/Layout/Usermenu'
import '../style.css'
import axios from 'axios'
import toast from 'react-hot-toast';
import { useAuth } from '../../Context/Auth'
const Profile = () => {
//context
const[auth,setAuth]=useAuth()

  //state
  const [name,setname]=useState("")
  const[email,setemail]=useState("")
  const[password,setpassword]=useState("")
  const[phone,setphone]=useState("")
  const[address,setaddress]=useState("")

//get user data
useEffect(()=>{
const {name,email,phone,address}=auth?.user;
setname(name);
setphone(phone);
setemail(email);
setaddress(address);
},[auth?.user])
//form Function 
const Handlesubmit= async (e)=>{
  e.preventDefault()
  try{
     const {data}=await axios.put("/api/v1/auth/profile",
     {name,email,password,phone,address}
     )
     if (data?.errro) {
      toast.error(data?.error);
    } else {
      setAuth({ ...auth, user: data?.updatedUser });
      let ls = localStorage.getItem("auth");
      ls = JSON.parse(ls);
      ls.user = data.updatedUser;
      localStorage.setItem("auth", JSON.stringify(ls));
      toast.success("Profile Updated Successfully");
    }
    //  toast.success("Register Succefully")
  }
  catch(error){
     toast.error("Something went wrong")
  }
}

  return (
   <Layout title="Profile">
    <div className=' m-3 p-3'>Profile</div>
    <div className='container-fluid row'>
    <div className='col-md-3'><Usermenu/></div>
    <div className='col-md-9'>
    <form onSubmit={Handlesubmit}>
<div className="mb-3">
    <input
     type="text" 
     value={name}
     onChange={(e)=>{setname(e.target.value)}}
     className="form-control" 
     id="exampleInputEmail1" 
     placeholder="Enter Your Name" 
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
        />
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
     />
  </div>
  <div className="mb-3">
    <input 
    type="text" 
    value={phone}
    onChange={(e)=>{setphone(e.target.value)}}
    className="form-control"
     id="exampleInputEmail1"
      placeholder='Contact details'
      />
  </div>
  <div className="mb-3">
    <input 
    type="text" 
    value={address}
    onChange={(e)=>{setaddress(e.target.value)}}
    className="form-control" 
    id="exampleInputEmail1"
     placeholder='Addres' 
   />
  </div>
 
  <button type="submit" className="btn btn-primary">User Profile</button>
</form>
    </div>
    </div>
   </Layout>
  )
}

export default Profile
