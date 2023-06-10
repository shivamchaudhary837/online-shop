// import React from 'react'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './modall.css'

const Modall = ({closeModall}) => {

  
  const navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("active-user"));

  const [profile, setProfile] = useState({
    // firstName: "",
    // lastName: "",
    // emailId: "",
    // phoneNo: "",
    address: {
      street: "",
      city: "",
      pincode: "",
    },
    wallet:""
  });

  const proceedfunc = () => {
    navigate("/user/order/payment")
    window.location.href="/user/order/payment"
    console.log("hello");
    // <Link to="/user/order/payment/successpage"></Link>
  };

  useEffect(() => {
    const getMyProfile = async () => {

      const profileResult = await retrieveUser();

      if (profileResult) {
        console.log("my profile is present");
      }
      setProfile(profileResult);
    };
    
    getMyProfile();

  }, []);

 
  const retrieveUser = async () => {
    const res = await axios.get(
      "http://localhost:8080/api/user/profile/" + user.id
    );
    console.log(res.data);
    return res.data;
  };
  const handleAddress = (e) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      address: {
        ...prevProfile.address,
        street: e.target.value,
      },
    }));
  };
  
  const handlePincode = (e) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      address: {
        ...prevProfile.address,
        pincode: e.target.value,
      },
    }));
  };
  
  const handleCity = (e) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      address: {
        ...prevProfile.address,
        city: e.target.value,
      },
    }));
  };
  

  const handleSaveButton = async () => {
    try {
      // setProfile(profile)
      const response = await axios.post(
        "http://localhost:8080/api/user/profile/"+user.id,
        profile
      );
      console.log(response.data);
      
      
    } catch (error) {
      console.error(error);
      
    }

    
    // navigate("/user/mycart"); 
    window.location.reload(true);
    // window.history.back();
  };

  return (
      <>
<div className="modallBackground">
      <div className="modallcontainer">
          <div className="title-close-btn">
          {/* <button onClick={() => closeModall(false)}> X </button> */}
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => closeModall(false)}></button>
          </div>
          
          <div className="title">
              <h2>New Address</h2>
          </div>
          
          <hr style={{marginTop:"0.4rem"}}></hr>
          <div className="card-body">
            <form className="row g-3">
              
              <div className="col-12"  style={{marginTop:"0.3rem"}}>
                <label htmlFor="inputAddress2" className="form-label">
                  <b>Street</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputAddress2"
                  placeholder="Apartment, studio, or floor"
                  value={profile.address.street}
                   onChange={handleAddress}
                  //  style={{width:"37rem"}}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputCity" className="form-label">
                  <b>City</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputCity"
                  value={profile.address.city}
                   onChange={handleCity}
                  //  style={{marginLeft:"1rem",width:"17.5rem"}}
                />
              </div>
              <div className="col-md-2">
                <label htmlFor="inputZip" className="form-label" style={{marginLeft:"1rem"}}>
                  <b>Pincode</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputZip"
                  value={profile.address.pincode}
                   onChange={handlePincode}
                   style={{width:"7rem",marginLeft:"1rem"}}
                />
              </div>
              </form>
          </div>    
          <div className="footer" >
              <button id="cancelbtn" onClick={() => closeModall(false)}>Cancel</button>
              <button onClick={handleSaveButton}>Save</button>
          </div>
      </div>
    </div>
</>
  )
}

export default Modall