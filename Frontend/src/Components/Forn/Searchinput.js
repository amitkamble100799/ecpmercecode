import React, { useState } from 'react'
import { useSearch } from '../../Context/Search'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Searchinput = () => {
    const[value,setValue]=useSearch()
    const navigate=useNavigate()

    const handleSubmit=async(e)=>{
        e.preventDefault()
try{
const {data}=await axios.get(`/api/v1/product/search/${value.keyword}`)
setValue({...value,result:data})
navigate('/search')
}catch(error){

}
    }
  return (
    <div>
        <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input className="form-control me-2" type="search" placeholder="Search" value={value.keyword}
        onChange={(e)=>setValue({...value,keyword:e.target.value})}
        />
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  )
}

export default Searchinput