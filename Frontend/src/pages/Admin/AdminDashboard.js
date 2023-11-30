import React, { useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import Adminmenu from '../../Components/Layout/Adminmenu'
import { useAuth } from '../../Context/Auth'
const AdminDashboard = () => {
    const[auth]=useAuth()
  return (
    <Layout>
        <div className="container m-1 p-2">
            <div className='row'>
            <div className='col-md-3 w-75 p-3'>
                <Adminmenu/>
            </div>
            <div className='col-md-9'>
                <div className='card'>
                  
                    <h4>Admin Name : {auth?.user?.name}</h4>
                    <h4>Admin E-mail : {auth?.user?.email}</h4>
                    <h4>Admin Phone : {auth?.user?.phone}</h4>
                     <h4>Admin role : {auth?.user?.role}</h4>
                </div>
            </div>
            </div>

        </div>
        
        </Layout>
  )
}

export default AdminDashboard