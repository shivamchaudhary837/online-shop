import React, { useState } from "react";
import {
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaPhone,
  FaMailBulk,
  FaLandmark,
  FaPinterestP
} from 'react-icons/fa';
import './contact.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleFirstNameChange = (event) => {
    const value = event.target.value;
    setFormData({ ...formData, fname: value });
  };

  const handleLastNameChange = (event) => {
    const value = event.target.value;
    setFormData({ ...formData, lname: value });
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setFormData({ ...formData, email: value });
  };

  const handlePhoneChange = (event) => {
    const value = event.target.value;
    setFormData({ ...formData, phone: value });
  };

  const handleMessageChange = (event) => {
    const value = event.target.value;
    setFormData({ ...formData, message: value });
  };

  const handleSubmit = (event) => {
    //event.preventDefault();
    // Handle form submission logic here
    //console.log(formData);
    // Reset form fields
    //setFormData({ fname: "", lname: "", email: "", phone: "", message: "" });
    window.location.reload(true)
  };

  return (
    <div>
      <div className="contact_card" style={{ width: "60rem" }}>
        <div className="contactdiv">
          <h2>Contact Info</h2>
          <FaLandmark className="icons-address" />
          <h6 className="address-shopname">189, NamkeenVilla</h6>
          <h6 className="address-location">M.P Nagar Zone-1, Madhya Pradesh, </h6>
          <h6 className="address-pincode">462022</h6>

          <FaPhone className="icons-Phone" />
          <h6 className="phoneno">652-439-8750</h6>

          <FaMailBulk className="icons-mailbulk" />
          <h6 className="mailid">storenamkeeno@gmail.com</h6>

          <FaInstagram className="instagram" />
          <FaTwitter className="twitter" />
          <FaLinkedinIn className="linkedin" />
          <FaPinterestP className="pinterest" />
        </div>
        <h2>Send a Message</h2>
        <form className="contactform" onSubmit={handleSubmit} style={{ height: "30rem" }}>
          <div className="input-fname">
            <input
              type="text"
              id="fname"
              name="fname"
              placeholder="First Name"
              value={formData.fname}
              onChange={handleFirstNameChange}
              required
            />
          </div>
          <div className="input-lname" style={{ marginTop: "-2.8rem" }}>
            <input
              type="text"
              id="lname"
              name="lname"
              placeholder="Last Name"
              value={formData.lname}
              onChange={handleLastNameChange}
              required
            />
          </div>
          <div className="input-mail">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@gmail.com"
              value={formData.email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="input-mobile" style={{ marginTop: "-3.4rem" }}>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="+91 "
              value={formData.phone}
              onChange={handlePhoneChange}
              required
            />
          </div>
          <div className="input-msg">
            <textarea
              id="message"
              name="message"
              placeholder="Enter your text here..."
              value={formData.message}
              onChange={handleMessageChange}
              required
            ></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
