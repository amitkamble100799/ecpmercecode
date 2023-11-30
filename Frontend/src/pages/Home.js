import React,{useState,useEffect} from 'react'
import Layout from '../Components/Layout/Layout'
import axios from 'axios'
import {Checkbox,Radio} from 'antd'
import { Prices } from '../Components/Price'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../Context/Cart'
import toast from 'react-hot-toast'
import '../index.css'
const Home = () => {
  const [products,setprodutcs]=useState([])
  const [categories,setCategories]=useState([])
  const [checked,setChecked]=useState([])
  const [radio,setRadio]=useState([])
  const [total,SetTotal]=useState(0)
  const[page,setPage]=useState(1)
  const [loading, setLoading] = useState(false);
 
  const navi=useNavigate()
  const [cart,setCart]=useCart()
  // get all categary
const getallcategory=async()=>{
  try{
    //{data} response destructure
  const {data}=await axios.get('/api/v1/category/get-category')
  if(data.success){
    setCategories(data.categorry)
  }
  }
  catch(error){
    console.log(error)
  }
  }
useEffect(()=>{
  getallcategory()
  getTotal()
},[])


//get all products
const getallproduct= async()=>{
  try{
    setLoading(true)
const {data}=await axios.get(`/api/v1/product/product-list/${page}`)
setLoading(false)
setprodutcs(data.products)
  }catch(error){
    setLoading(false)
console.log(error)
  }
}

//get Totalcount
const getTotal=async()=>{
  try{
  const {data}=await axios.get("/api/v1/product/product-count")
  SetTotal(data?.total)
  }catch(error){
    console.log(error)
  }
  }

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setprodutcs([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

//handlefilter
const handlefilter=(value,id)=>{
  let all=[...checked]
if(value){
  all.push(id)
}else{
  all=all.filter(c=>c!==id)
}
setChecked(all)
}

useEffect(()=>{
  if(!checked.length||!radio.length){
    getallproduct()
  }
//eslint-disable-next-line
},[])
useEffect(()=>{
  if(checked.length||radio.length){
   filterproduct()
  }
},[checked,radio])

//get filterd
const filterproduct=async()=>{
try{
const {data}=await axios.post('/api/v1/product/product-filters',{checked,radio})
setprodutcs(data?.products)
}catch(Erorr){
  console.log(Erorr)
}
}

  return (
        <Layout title='All products'>
    <div className='container-fluid row mt-3'>
    <div className='col-md-2'>
    <h5 className='text-center'>Filtert By Category</h5>
    <div className='d-flex flex-column'>
    {
      categories?.map(c=>(
       <Checkbox key={c._id} onChange={(e)=>handlefilter(e.target.checked,c._id)}>
      {c.name}
       </Checkbox>
      ))
    }
    </div>
    {/* Price filter */}
    <h4 className='text-center mt-4'>Filtert By Prices</h4>
    <div className='d-flex flex-column'>
    <Radio.Group onChange={(e)=>setRadio(e.target.value)}>
      { 
      Prices?.map(p=>(
        <div key={p._id}>
          <Radio  value={p.array}>
            {p.name}
          </Radio> 
          </div>
      )) }
    </Radio.Group> 
    </div>
<div className='d-flex flex-column'>
<button className='btn btn-danger reload' 
onClick={()=>window.location.reload()}>Reset Filter</button>
</div>
    </div>
    <div className='col-md-9'>
      <h1 className='text-center'>All Products</h1>
      <div className='d-flex flex-wrap'>
{
    products?.map(p=> (
       
 <div className="card m-1 homecard" style={{width: '18rem'}} >
 
  <img src={`/api/v1/product/product-photo/${p._id}`}  style={{height:'15rem'}} className="card-img-top imgh" alt={p.name} />
  <div className="card-body ">
    <h5 className="card-title ">{p.name}</h5>
    <p className="card-text">{p.description.substring(0,30)}</p>
    <p className="card-text">{p.price}</p>
    <button className='btn btn-primary ms-1' onClick={()=>{navi(`/product/${p.slug}`)}}>More Detail</button>
    <button className='btn btn-secondary ms-1'
     onClick={()=>{setCart([...cart,p]);
      toast.success('Item Added to cart')
     }}>Add TO Cart</button>
  </div>
</div>

    )
      )}
      </div>
      <div className='m-2 p-3'>
      {
        products && products.length < total &&(
          <button className='btn btn-warning'
          onClick={(e) => {
            e.preventDefault();
            setPage(page + 1);
          }}

          >
            {loading ? "Loading ..." : "Loadmore"}
          </button>
        )}
        </div>
    </div>
    </div>
        </Layout>
     
  )
}

export default Home