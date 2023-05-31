import React, { useState, useEffect } from "react";
import axios from "axios";

const MyProfile = () => {
 
  

  const user = JSON.parse(sessionStorage.getItem("active-user"));

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    phoneNo: "",
    address: {
      street: "",
      city: "",
      pincode: "",
    },
    walletAmount:0
  });

  useEffect(() => {
    const getMyProfile = async () => {

      const profileResult = await retrieveUser();

      if (profileResult) {
        console.log("my profile is present",profileResult);
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

  const handleFirstName = (e) => {
    const { value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      firstName: value,
    }));
  };
 
  const handleLastName = (e) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      lastName: e.target.value,
    }));
  };
  
  const handleEmailId = (e) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      emailId: e.target.value,
    }));
  };
  
  const handlePhoneNo = (e) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      phoneNo: e.target.value,
    }));
  };
  
  const handleWallet=(e)=>{
       setProfile((prevProfile) => ({
           ...prevProfile,
           walletAmount:e.target.value,
       }))
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
      // setTimeout(()=>{
      //   window.location.reload(true);
      // },2000)
     
  };

  return (
    <div className="container">
      <div className="vertical-down">
        <div className="card" style={{borderRadius:"10px"}}>
          <div className="card-header custom-bg">
            <h2>Profile Page</h2>
          </div>
          <div className="card-body">
            <form className="row g-3">
              <div className="col-md-6">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  value={profile.firstName}
                   onChange={handleFirstName}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputPassword4" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputPassword4"
                  value={profile.lastName}
                   onChange={handleLastName}
                />
              </div>
              <div className="col-12">
                <label htmlFor="inputEmailId" className="form-label">
                  Email Id
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="inputEmailId"
                  placeholder="1234 Main St"
                  value={profile.emailId || ""}
                   onChange={handleEmailId}
                />
              </div>
              <div className="col-12">
                <label htmlFor="inputAddress2" className="form-label">
                  Address
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
              <div className="col-md-4">
                <label htmlFor="inputstate" className="form-label">
                  Mobile Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputstate"
                  value={profile.phoneNo}
                   onChange={handlePhoneNo}
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
              <div style={{ marginTop: "30px" }}>
                  <label htmlFor="inputZip" className="form-label">
                  <h5>Wallet Amount:</h5>
                
                </label>
                <input type="text"  className="form-control" value={profile.walletAmount} 
                onChange={handleWallet} />
              </div>
              <div className="col-12" style={{ marginTop: "10px" }}>
                <button type="submit" className="btn bg-color btn-primary" 
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

export default MyProfile;
