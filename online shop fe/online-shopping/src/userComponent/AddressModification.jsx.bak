import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaWindows } from "react-icons/fa";

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
    // window.location.href="/user/order/payment"
    // console.log("hello");
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

    
    navigate("/user/mycart"); 
    window.location.reload(true);
  };

  return (
    <div className="container">
      <div className="vertical-down" >
        <div className="card" style={{borderRadius:"10px", width:"55rem",height:"19rem"}}>
          <div className="card-header custom-bg">
            <h2  style={{marginLeft:"18rem"}}>Drop-Off Details</h2>
          </div>
          <div className="card-body">
            <form className="row g-3">
              
              <div className="col-12">
                <label htmlFor="inputAddress2" className="form-label">
                  Street
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputAddress2"
                  placeholder="Apartment, studio, or floor"
                  value={profile.address.street}
                   onChange={handleAddress}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputCity" className="form-label">
                  City
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputCity"
                  value={profile.address.city}
                   onChange={handleCity}
                />
              </div>
              <div className="col-md-2">
                <label htmlFor="inputZip" className="form-label">
                  Pincode
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputZip"
                  value={profile.address.pincode}
                   onChange={handlePincode}
                />
              </div>

              <div className="col-12" style={{ marginTop: "23px", marginLeft:"300px" }}>
                <button type="submit" className="btn bg-color btn-primary" style={{marginLeft:50}}
                onClick={handleSaveButton}>
                  Save
                </button>
          
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressModification;