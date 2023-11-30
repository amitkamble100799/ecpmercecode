import React from 'react'
import Layout from '../Components/Layout/Layout'
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
const Contact = () => {
  return (
    <Layout  title="Contact">
       <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="https://soultemple.in/wp-content/uploads/2023/06/about-us-1920-%C3%97-1080-px-2.png"
            alt="contactus"
            style={{ width: "100%"}}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            any query and info about prodduct feel free to call anytime we 24X7
            vaialible
          </p>
          <p className="mt-3">
            <BiMailSend /> : www.help@ecommerceapp.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 012-3456789
          </p>
          <p className="mt-3">
            <BiSupport /> : 1800-0000-0000 (toll free)
          </p>
        </div>
      </div>
        </Layout>
  )
}

export default Contact