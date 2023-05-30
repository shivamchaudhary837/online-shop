import React,{Fragment} from 'react'
import {FaTwitter, FaWhatsapp,FaInstagram,FaPhone,FaMailBulk} from 'react-icons/fa'
import './contact.css'
import { icons } from 'react-icons'

const ContactUs = () => {
  return (
    <Fragment>
      <div className="imagee">
    
        {/* <img src="./images/about-img.jpg" alt=""/> */}
        {/* <h1>Contact Us</h1> */}
        </div>


        <FaPhone className="icons Phone"/>
          <h4 className="phoneno">+91 65243 98750</h4>
          <h4 className="phoneno2">+91 80808 79821</h4>
        <FaWhatsapp className="icons whatsapp"/>
          <h4 className="whatsappno">+91 80808 79821</h4>
        <FaInstagram className="icons instagram"/>
          <h4 className="instaid">Store_N_a_m_k_e_e_n_o</h4>
        <FaMailBulk className="icons mailbulk"/>
          <h4 className="mailid">storenamkeeno@gmail.com</h4>
        <FaTwitter className="icons twitter"/>
          <h4 className="twitterid">....................</h4>
        

    </Fragment>  

  )
}

export default ContactUs;