import React from 'react'
import Layout from '../Components/Layout/Layout'

const About = () => {
  return (
    <Layout title="About">
      <div className="about">
        <div className="col-md-6 ">
          <img
     src="https://img.freepik.com/free-vector/teamwork-concept-landing-page_52683-20164.jpg?w=740&t=st=1696835022~exp=1696835622~hmac=740e5121a9344893741ef30821c2642061fccd7f977314aa1d51d7d28780db80"
            alt="contactus"
            style={{ width: "70%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="txt">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            officiis obcaecati esse tempore unde ratione, eveniet mollitia,
            perferendis eius temporibus dicta blanditiis doloremque explicabo
            quasi sunt vero optio cum aperiam vel consectetur! Laborum enim
            accusantium atque, excepturi sapiente amet! Tenetur ducimus aut
            commodi illum quidem neque tempora nam.
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default About