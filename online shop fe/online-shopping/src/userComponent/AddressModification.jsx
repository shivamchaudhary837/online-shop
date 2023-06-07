import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaWindows } from "react-icons/fa";
import "./addressmodify.css"

const AddressModification = () => {
 
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
    // window.location.reload(true);
    window.history.back();
  };

  return (
    <div className="address-img">
    <div className="container">
      <div className="vertical-down" >
        <div className="card" style={{borderRadius:"10px", width:"40rem",height:"19rem",marginTop:"1rem",marginLeft:"45rem"}}>
          <div className="card-header custom-bg" style={{backgroundColor:"#e06a70",color:"whitesmoke",fontStyle:"italic"}}>
            <h2  style={{marginLeft:"11.6rem"}}>Drop-Off Details</h2>
          </div>
          <div className="card-body">
            <form className="row g-3">
              
              <div className="col-12">
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
                <label htmlFor="inputZip" className="form-label">
                  <b>Pincode</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputZip"
                  value={profile.address.pincode}
                   onChange={handlePincode}
                  //  style={{marginLeft:"1rem"}}
                />
              </div>

              <div className="col-12" style={{ marginTop: "23px", marginLeft:"210px"}}>
                <button type="submit" className="btn bg-color btn-primary" style={{marginLeft:50,width:"5rem"}}
                onClick={handleSaveButton}>
                  Save
                </button>
          
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AddressModification;