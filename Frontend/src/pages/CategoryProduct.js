import React,{useState,useEffect} from 'react'
import Layout from '../Components/Layout/Layout'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const CategoryProduct = () => {
    const[products,setProdutcs]=useState([])
    const[category,setCategory]=useState([])
    const params=useParams()
const navigate=useNavigate()
    useEffect(()=>{
        if(params?.slug) getProductBycat()
    },[params?.slug])
    const getProductBycat=async()=>{
        try{
 const {data}=await axios.get(`/api/v1/product/product-category/${params.slug}`)
 setProdutcs(data?.products)
 setCategory(data?.category)
        }catch(erorr){
            console.log(erorr)
        }
    }
  
  return (
    <Layout>
    <div className='container mt-3'>
     <h4 className='text-center'>Category - {category?.name}</h4>
     <h6 className='text-center'>{products?.length}</h6>
     
     <div className='row'>
     <div className='d-flex flex-wrap'>
{
    products?.map(p=> (
       
 <div className="card m-1" style={{width: '18rem'}} >
 
  <img src={`/api/v1/product/product-photo/${p._id}`}  style={{height:'15rem'}} className="card-img-top" alt={p.name} />
  <div className="card-body">
    <h5 className="card-title">{p.name}</h5>
    <p className="card-text">{p.description.substring(0,30)}</p>
    <p className="card-text">{p.price}</p>
    <button className='btn btn-primary ms-1' onClick={()=>{navigate(`/product/${p.slug}`)}}>More Detail</button>
    <button className='btn btn-secondary ms-1'>Add TO Cart</button>
  </div>
</div>

    )
      )}
      </div>
     </div>
        </div>
        </Layout>
  )
}

export default CategoryProduct