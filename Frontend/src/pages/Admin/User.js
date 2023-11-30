import React from 'react'
import Layout from '../../Components/Layout/Layout'
import Adminmenu from '../../Components/Layout/Adminmenu'

const User = () => {
  return (
    <Layout title="all-users-dashboard">
        <div className='className="container-fluid m-3 p-3"'>
        <div className='row'>
          <div className='col-md-3'><Adminmenu/></div>
          <div className='col-md-9'><h1>All users</h1></div>
          </div>
        </div>
    </Layout>
  )
}

export default User