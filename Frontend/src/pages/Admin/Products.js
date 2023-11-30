import React,{useState,useEffect} from 'react'
import Adminmenu from '../../Components/Layout/Adminmenu'
import Layout from '../../Components/Layout/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
const Products = () => {
    const[products,setprodutcs]=useState([]);
//get all product
const getallproduct=async()=>{
    try{
   const {data}= await axios.get("/api/v1/product/get-product")
   setprodutcs(data.products)
    }catch(error){
        console.log(error)
toast.error("somethig went wrong in products file")
    }
}
//life cycle method
useEffect(()=>{
    getallproduct()
},[])
  return (
    <Layout>
        <div className='container-fluid row mt-3'>
        <div className='col-md-3'>
            <Adminmenu/>
        </div>
        <div className='col-md-9'>
      <h1 className='text-center'> all Products lists</h1> 
      <div  className='d-flex flex-wrap'>
      {
    products?.map(p=> (
        <Link to={`/dashboard/admin/product/${p.slug}`}key={p._id} className='product-link'>
 <div className="card m-3" style={{width: '18rem',}} >
 
  <img src={`/api/v1/product/product-photo/${p._id}`}  style={{height:'15rem'}} className="card-img-top" alt={p.name} />
  <div className="card-body">
    <h5 className="card-title">{p.name}</h5>
    <p className="card-text">{p.description}</p>
  </div>
</div>
</Link>
    )
      )}
      </div>
        </div>
   
        </div>

        </Layout>
  )
}

export default Products