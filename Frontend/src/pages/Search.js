import React from 'react'
// import { Layout } from 'antd'
import Layout from '../Components/Layout/Layout'
import { useSearch } from '../Context/Search'
const Search = () => {
    const[value,setValue]=useSearch()
  return (
    <Layout title='Search result'>
        <div className='container'>
        <div className='text-center'>
      <h1>Search Product</h1>
      <h6>{value?.result.length < 1  ? "No products found" : `found ${value?.result.length}`}</h6>
      <div className='d-flex flex-wrap mt-4'>
{
    value?.result.map(p=> (
       
 <div className="card m-1" style={{width: '18rem'}} >
 
  <img src={`/api/v1/product/product-photo/${p._id}`}  style={{height:'15rem'}} className="card-img-top" alt={p.name} />
  <div className="card-body">
    <h5 className="card-title">{p.name}</h5>
    <p className="card-text">{p.description.substring(0,30)}</p>
    <p className="card-text">{p.price}</p>
    <button className='btn btn-primary ms-1'>More Detail</button>
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

export default Search