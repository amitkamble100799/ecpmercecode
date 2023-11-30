import React,{useState,useEffect} from 'react'
import Layout from '../Components/Layout/Layout'
import axios from 'axios'
import { useParams,useNavigate } from 'react-router-dom'

const ProductDetail = () => {
    const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

//initialp detail
useEffect(()=>{
if(params?.slug){
    getProduct()
}
},[params?.slug])

//get product
const getProduct= async()=>{
    try{
  const {data}=await axios.get(`/api/v1/product/get-product/${params.slug}`)
  setProduct(data?.products)
  getsimillerProduct(data?.products._id,data?.products.category._id);
    }catch(error){
  console.log(error)
    }
}
//similaer product
const getsimillerProduct=async(pid,cid)=>{
    try{
 const {data}=await axios.get(`/api/v1/product/related-product/${pid}/${cid}`)
 setRelatedProducts(data?.products)

    }catch(error){
    console.log(error)
    }
}
  return (
   <Layout>

<div className='row mt-2'>
    <div className='col-md-6'>
         <img src={`/api/v1/product/product-photo/${product._id}`}  
        style={{height:'15rem', width:'18rem'}} className="card-img-top" alt={product.name} />
        </div>
    <div className='col-md-6 '>
    <h1 text-center>Product Details</h1>
    <h6>Name :{product.name}</h6>
    <h6>Description :{product.description}</h6>
    <h6>Price :{product.price}</h6>
    <h6>quantity :{product.quantity}</h6>
 <h6>category :{product.category?.name}</h6> 
    <button className='btn btn-secondary ms1'>Add to cart</button>
  
  
        </div>
   
</div>
<hr/>
<div className='col-md-5'>
    <h6>similar Product</h6>
    {relatedProducts.length < 1 && (<p className='text-center'>No similar product</p>)}
    <div className='d-flex flex-wrap'>
{
    relatedProducts?.map(p=> (  
 <div className="card m-1" style={{width: '18rem'}} >
  <img src={`/api/v1/product/product-photo/${p._id}`}  style={{height:'15rem'}} className="card-img-top" alt={p.name} />
  <div className="card-body">
    <h5 className="card-title">{p.name}</h5>
    <p className="card-text">{p.description.substring(0,30)}</p>
    <p className="card-text">{p.price}</p>
    <button className='btn btn-secondary ms-1'>Add TO Cart</button>
  </div>
</div>

    )
      )}
      </div>
</div>
   </Layout>
  )
}

export default ProductDetail