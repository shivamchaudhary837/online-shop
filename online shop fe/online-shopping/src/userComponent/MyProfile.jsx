import React, { useState } from "react";

const MyProfile = () => {

  const[profile,setProfile]=useState({
    firstName:"",
    lastName:"",
    email:"",
  })

   
  return (
    <div className="container">
    

     <div className="vertical-down">
      <form className="row g-3">
        <div>
          <h2>Profile Page</h2>
        </div>
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">
            First Name
          </label>
          <input type="text" className="form-control" id="inputEmail4" value={profile.firstName}
          onChange={e=>setProfile({...profile,firstName:e.target.value})} />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputPassword4" className="form-label">
            Last Name
          </label>
          <input type="text" className="form-control" id="inputPassword4" value={profile.lastName}
            onChange={e=>setProfile({...profile,lastName:e.target.value})}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputAddress" className="form-label">
            Email Id
          </label>
          <input
            type="email"
            className="form-control"
            id="inputAddress"
            placeholder="1234 Main St"
            value={profile.lastName}
            onChange={e=>setProfile({...profile,email:e.target.value})}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputAddress2" className="form-label" >
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="inputAddress2"
            placeholder="Apartment, studio, or floor"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputCity" className="form-label">
            City
          </label>
          <input type="text" className="form-control" id="inputCity" />
        </div>
        <div className="col-md-4">
          <label htmlFor="inputState" className="form-label">
            State
          </label>
          <input type="text" className="form-control" id="inputstate" />
        </div>
        <div className="col-md-2">
          <label htmlFor="inputZip" className="form-label">
            Zip
          </label>
          <input type="text" className="form-control" id="inputZip" />
        </div>
        
        <div className="col-12" style={{marginTop:"60px"}}>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default MyProfile;
