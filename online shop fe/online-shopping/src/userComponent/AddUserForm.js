import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import "./adduserform.css";
import carousel1 from "../images/register2.png";

const AddUserForm = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    phoneNo: "",
    street: "",
    city: "",
    pincode: "",
    role: "",
  });

  const handleUserInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const callToast=(message)=>{
       
           
    toast.success(message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
      
  }

  const callToastError=(message)=>{

        
    toast.error(message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
      
  }
  const saveUser = (event) => {
    event.preventDefault();
    console.log("check",user.role)

    fetch("http://localhost:8080/api/user/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((result) => result.json())
      .then((res) => {
        if (res != null) {
          console.log("Response", res);
          callToast("Registered Successfully!!!");
            
          window.setTimeout(() => {
            window.location.reload(true); // Reload the page
          }, 2000);

        }
      })
      .catch((error) => {
        console.log("******", error);
        callToastError("User Already Exists With Email Id");
      });


  };

  const validateForm = (event) => {
    const form = document.getElementById("addUserForm");
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add("was-validated");
  };


  return (
    
        <div className="mt-2 d-flex aligns-items-center justify-content-center ms-2 me-2 mb-2">
          <div
            className="card"
            style={{ width: "68rem" ,marginLeft:"2rem", marginTop:"4rem",height:"62rem",boxShadow: "0 16px 21px rgba(128, 20, 20, 0.13) ",backgroundColor:"white"}}
          >

          <img src={carousel1} alt="" style={{width:"25rem",height:"22rem",marginTop:"20rem",marginLeft:"6rem"}}/>

          <div className="text">
           
            <h1 className="k" style={{ marginLeft: "45rem", fontStyle: "italic", marginTop:"-40rem"}}>
                 Sign-Up
            </h1>
            <h1 className="i" style={{marginLeft:"5rem",marginTop:"-1rem",fontFamily:"'Rye', cursive"}}>Namkeen Villa</h1>
            <h1 className="j" style={{marginLeft:"15.5rem",marginTop:"0rem"}}>Welcomes You</h1>            
          </div>

            <div className="card-body">
              <form
                id="addUserForm"
                className="needs-validation"
                onSubmit={saveUser}
                noValidate
                style={{marginLeft:"39rem",marginTop:"-35rem"}}
              >
                <div className="form-floating mb-3 text-color" >
                        <select
                          onChange={handleUserInput}
                          className="form-select"
                          name="role"
                          id="floatingRole"
                          style={{ height: "4rem" ,maxWidth:"20rem",borderRadius: "5px 10px 0 15px"}}
                          value={user.role}
                          required
                        >
                          <option value="0">Select Role</option>
                          <option value="Customer">Customer</option>
                          <option value="Admin">Admin</option>
                          <option value="Delivery">Delivery Person</option>
                        </select>
                        <label htmlFor="floatingRole">User Role*</label>
                </div>


                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingFirstName"
                    name="firstName"
                    placeholder="First Name"
                    onChange={handleUserInput}
                    style={{ height: "3rem" ,maxWidth:"20rem",borderRadius: "5px 10px 0 15px"}}
                    value={user.firstName}
                    required
                  />
                  <label htmlFor="floatingFirstName">First Name *</label>
                  {/* <div className="valid-feedback"> Good</div> */}
                  <div className="invalid-feedback">Please enter a first name.</div>
                </div>

                <div className="form-floating mb-3 text-color">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingLastName"
                    name="lastName"
                    placeholder="Last Name"
                    style={{ height: "3rem" ,maxWidth:"20rem",borderRadius: "5px 10px 0 15px"}}
                    onChange={handleUserInput}
                    required
                  />
                  <label htmlFor="floatingLastName">Last Name *</label>
                  <div className="invalid-feedback">Please enter a last name.</div>
                </div>

                <div className="form-floating mb-3 text-color">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingEmailId"
                    name="emailId"
                    placeholder="Email Id"
                    style={{ height: "3rem" ,maxWidth:"20rem",borderRadius: "5px 10px 0 15px"}}
                    onChange={handleUserInput}
                    required
                  />
                  <label htmlFor="floatingEmailId">Email Id *</label>
                  <div className="invalid-feedback">Please enter a valid email address.</div>
                </div>

                <div className="form-floating mb-3 mt-1 text-color">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    name="password"
                    placeholder="Password"
                    style={{ height: "3rem" ,maxWidth:"20rem",borderRadius: "5px 10px 0 15px"}}
                    onChange={handleUserInput}
                    required
                  />
                  <label htmlFor="floatingPassword">Password *</label>
                  <div className="invalid-feedback">Please enter a password.</div>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="number"
                    className="form-control"
                    id="floatingPhoneNo"
                    name="phoneNo"
                    placeholder="Mobile No"
                    style={{ height: "3rem" ,maxWidth:"20rem",borderRadius: "5px 10px 0 15px"}}
                    onChange={handleUserInput}
                    required
                  />
                  <label htmlFor="floatingPhoneNo">Mobile No*</label>
                  <div className="invalid-feedback">Please enter a mobile number.</div>
                </div>

                <div className="form-floating mb-3">
                  <textarea
                    className="form-control"
                    id="floatingStreet"
                    name="street"
                    rows="3"
                    placeholder="Street"
                    style={{ height: "5rem" ,maxWidth:"20rem",borderRadius: "5px 10px 0 15px"}}
                    onChange={handleUserInput}
                    value={user.street}
                    // style={{height:"3rem fixed"}}
                    required
                  ></textarea>
                  <label htmlFor="floatingStreet" >Street*</label>
                  <div className="invalid-feedback">Please enter street</div>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingCity"
                    name="city"
                    placeholder="City"
                    style={{ height: "3rem" ,maxWidth:"20rem",borderRadius: "5px 10px 0 15px"}}
                    onChange={handleUserInput}
                    required
                  />
                  <label htmlFor="floatingCity" >City*</label>
                  <div className="invalid-feedback">Please enter city</div>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="number"
                    className="form-control"
                    id="floatingPincode"
                    name="pincode"
                    placeholder="Pincode"
                    style={{ height: "3rem" ,maxWidth:"20rem",borderRadius: "5px 10px 0 15px"}}
                    onChange={handleUserInput}
                    required
                  />
                  <label htmlFor="floatingPincode" >Pincode*</label>
                  <div className="invalid-feedback">Please enter pincode</div>
                </div>

                <div className="mt-3" style={{ marginLeft: "120px" }}>
                  <input 
                    type="submit"
                    className="btn bg-color custom-bg-text"
                    value="Register"
                    onClick={validateForm}
                    style={{ position: "sticky", bottom: "0", zIndex: "1" ,borderRadius: "5px 10px 0 15px"}} // Add sticky positioning
                  />
                </div>

                <ToastContainer />
              </form>
            </div>
          </div>
        </div>
  )
};

export default AddUserForm;