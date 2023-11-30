import React from 'react'
import Layout from '../../Components/Layout/Layout'
import Usermenu from '../../Components/Layout/Usermenu'
import { useAuth } from '../../Context/Auth'
const Dashboard = () => {
  const [auth]=useAuth()
  return (
    <Layout title={"Dashboard"}>
            <h1>Dashboard</h1>
            <div className='container-fluid m-3 p-3'>Orders</div>
    <div className='row'>
    <div className='col-md-3'><Usermenu/></div>
    <div className='col-md-9'>
      <div className='card w-75 p-3'>
        <h3>{auth?.user?.name}</h3>
          <h3>{auth?.user?.email}</h3> 
           <h3>{auth?.user?.address}</h3>
      </div>
    </div>
    </div>
    </Layout>

  )
}

export default Dashboard