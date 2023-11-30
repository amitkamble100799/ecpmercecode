import React from 'react'
import { NavLink } from 'react-router-dom'
const Adminmenu = () => {
  return (
    <>
    <div className='text-center'>

   
<div className="list-group">
    <h1>Admin pannel</h1>
  <NavLink to="/dashboard/admin/create-category" className="list-group-item list-group-item-action">
    create category
    </NavLink>
  <NavLink to="/dashboard/admin/create-product" className="list-group-item list-group-item-action">
  create Product
    </NavLink>
    <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action">
  Products
    </NavLink>
    <NavLink to="/dashboard/admin/orders" className="list-group-item list-group-item-action">
   Orders
    </NavLink>
  <NavLink to="/dashboard/admin/users"  className="list-group-item list-group-item-action">
  users
    </NavLink>
</div>
</div>
    </>
  )
}

export default Adminmenu