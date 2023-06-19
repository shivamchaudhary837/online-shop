import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import bg from "../images/bg_img.jpg";
import "./UserLoginForm.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import axios from "axios";
// import bgt from "../images/nam_bg.png";
import carousel1 from "../images/image.png";


const UserLoginForm = () => {
  let navigate = useNavigate();

  const [loginRequest, setLoginRequest] = useState({
    emailId: "",
    password: "",
    role: "Customer",
  });

  const handleUserInput = (e) => {
    setLoginRequest({ ...loginRequest, [e.target.name]: e.target.value });
  };

  const loginAction = (e) => {
    e.preventDefault();
    if (!e.target.checkValidity()) {
      toast.error("Please fill in all the required fields", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    fetch("http://localhost:8080/api/user/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginRequest),
    })
      .then((result) => {
        console.log("result", result);
        result
          .json()
          .then((res) => {
            console.log(res);

            if (res && res.role === "Admin") {
              console.log("Working fine:)");
              sessionStorage.setItem("active-admin", JSON.stringify(res));
            } else if (res && res.role === "Customer") {
              sessionStorage.setItem("active-user", JSON.stringify(res));
            } else if (res && res.role === "Delivery") {
              sessionStorage.setItem("active-delivery", JSON.stringify(res));
            } else {
              // Handle the case when res is null or the role property is missing
              toast.error("Invalid email and password", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              return;
            }

            toast.success("logged in successfully!!!", {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            navigate("/home");
            window.location.reload(true);
          })
          .catch((error) => {
            console.error(error);
            // Handle the error here, such as displaying an error message to the user
            toast.error("Invalid email and password", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          });
      })
      .catch((error) => {
        console.error(error);
        // Handle the error here, such as displaying an error message to the user
        toast.error("Failed to connect to the server", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

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

  const addUser = async (user) => {
    const res = await axios.post(
      "http://localhost:8080/api/user/register",
      user
    );
    console.log(res.data);
    return res.data;
  };

  const loginWithGoogle = (details) => {
    user.firstName = details.given_name;
    user.lastName = details.family_name;
    user.emailId = details.email;
    user.password = "";
    user.role = "Customer";
    setUser(user);

    axios
      .get("http://localhost:8080/api/user/email/" + user.emailId)
      .then((res) => {
        if (res.data) {
          sessionStorage.setItem("active-user", JSON.stringify(res.data));
          navigate("/home");
          window.location.reload(true);
        } else {
          addUser(user)
            .then((res) => {
              sessionStorage.setItem("active-user", JSON.stringify(res));
              navigate("/home");
              window.location.reload(true);
            })
            .catch((error) => {
              console.error(error);
              // Handle the error here, such as displaying an error message to the user
              toast.error("Failed to log in via Google. Please try again.", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            });
        }
      });
  };


  const validateForm = (event) => {
    const form = document.getElementById("loginForm");
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add("was-validated");
  };

  return (  

      <div className="mt-2 d-flex aligns-items-center justify-content-center">
        <div
          className="card"
          style={{ width: "68rem" ,marginLeft:"2rem", marginTop:"4rem",height:"32rem",boxShadow: "0 13px 15px rgba(128, 20, 20, 0.13) ",backgroundColor:"white"}}
        > 
    
          <img src={carousel1} alt="" style={{width:"24rem",height:"21rem",marginTop:"5rem",marginLeft:"6rem"}}/>
       
          <div className="text">

           <h3 className="villa" style={{marginLeft:"12.7rem",marginTop:"-6.8rem",fontStyle:"italic"}}> Villa</h3>
           <h3 className="villa" style={{marginLeft:"15.4rem",marginTop:"-0.8rem" ,fontStyle:"italic"}}>Namkeen....</h3>
          <h1 className="k" style={{ marginLeft: "45rem", fontStyle: "italic", marginTop:"-20rem"}}>
              User Login
            </h1>            
          </div>

              <div className="card-body">
                <form id="loginForm" className="needs-validation" onSubmit={loginAction} noValidate style={{marginLeft:"39rem",marginTop:"-17.3rem"}}>
                  <div className="mb-3">
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control"
                        id="emailId"
                        name="emailId"
                        placeholder="Email ID"
                        onChange={handleUserInput}
                        value={loginRequest.emailId}
                        required
                        style={{ height: "3rem" ,maxWidth:"20rem",borderRadius: "5px 10px 0 15px"}}
                      />
                      <label htmlFor="emailId">Email ID *</label>
                      <div className="invalid-feedback">Please provide a valid email.</div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="form-floating">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleUserInput}
                        value={loginRequest.password}
                        autoComplete="on"
                        required
                        style={{ height: "3rem" ,maxWidth:"20rem",borderRadius: "5px 10px 0 15px"}}
                      />
                      <label htmlFor="password">Password *</label>
                      <div className="invalid-feedback">Please provide a password.</div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <button
                      type="submit"
                      className="btn bg-color custom-bg-text"
                      onClick={validateForm}
                      style={{ marginLeft: "6.1rem", marginTop: "1.4rem",borderRadius: "5px 10px 0 15px",width:"8rem" }}
                    >
                      Login
                    </button>
                  </div>
                  <div className="line">
                    <hr class="l1" style={{ width: "9rem", height: "1px", backgroundColor: "white", marginTop: "1.6rem", marginLeft: "0rem" }} />
                    <h6 style={{ marginLeft: "9.5rem", marginTop: "-1.7rem", fontStyle: "italic" }}>OR</h6>
                    <hr class="l2" style={{ width: "9rem", marginLeft: "11.3rem", marginTop: "-1.05rem" }} />
                  </div>
                  <div className="login-gmail">
                    <button style={{ marginTop: "1rem", marginLeft: "3.7rem", borderRadius: "5rem",borderColor:"white" }}>
                      <GoogleOAuthProvider clientId="668976964137-tljnqvmeh5jq54u9ldevost06cn878pl.apps.googleusercontent.com">
                        <GoogleLogin
                          onSuccess={(credentialResponse) => {
                            const details = jwt_decode(credentialResponse.credential);
                            console.log("", "detail of user", details);
                            loginWithGoogle(details);
                          }}
                          onError={() => {
                            console.log("Login Failed");
                          }}
                        >
                          Login Via Google
                        </GoogleLogin>
                      </GoogleOAuthProvider>
                    </button>
                  </div>
                  <ToastContainer />
                </form>
              </div>
            </div>
          </div>
        // </div>
      
    
  );
};

export default UserLoginForm;