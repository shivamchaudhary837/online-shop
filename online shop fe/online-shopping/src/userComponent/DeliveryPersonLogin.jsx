import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "./deliverypersonlogin.css";
import carousel1 from "../images/delivery.png";

const DeliveryPersonLogin = () => {
  let navigate = useNavigate();

  const [loginRequest, setLoginRequest] = useState({
    emailId: "",
    password: "",
    role: "Delivery",
  });

  const [response, setResponse] = useState({});

  const handleUserInput = (e) => {
    setLoginRequest({ ...loginRequest, [e.target.name]: e.target.value });
  };

  const loginAction = (e) => {
    fetch("http://localhost:8080/api/user/deliveryperson/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginRequest),
    }).then((result) => {
      console.log("result", result);
      result.json().then((res) => {
        if (res && res.role === "Delivery") {
          sessionStorage.setItem("active-delivery", JSON.stringify(res));
          toast.success("logged in successfully!!!", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          navigate("/user/delivery/myorders");
          window.location.reload(true);
        } else {
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
      });
    });
    e.preventDefault();
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
          style={{ width: "65rem" ,marginLeft:"2rem", marginTop:"5.7rem",height:"28rem",boxShadow: "0 13px 15px rgba(128, 20, 20, 0.13) "}}
        > 
          
        
          <div className="text-delivery" >

           {/* <h3 style={{marginLeft:"10rem",marginTop:"2rem"}}> Villa</h3>
           <h3 style={{marginLeft:"13rem",marginTop:"-0.8rem"}}>Namkeen....</h3> */}
          <h1 className="dk" style={{ marginLeft: "38.7rem", fontStyle: "italic", marginTop:"3rem" }}>
              Delivery Person Login
            </h1>            
          </div>

          <img src={carousel1} alt="" style={{width:"25rem",height:"20rem",marginTop:"-2rem",marginLeft:"5rem"}}/>

          <div className="card-body">
            <form id="loginForm" onSubmit={loginAction} noValidate style={{marginLeft:"37.6rem",marginTop:"-15.7rem"}}>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="emailId"
                  name="emailId"
                  onChange={handleUserInput}
                  required
                  placeholder="Email Id"
                  style={{ height: "3rem" ,maxWidth:"20rem",borderRadius: "5px 10px 0 15px"}}
                />
                <label htmlFor="emailId">Email Id *</label>
                <div className="invalid-feedback">Please enter a valid email address.</div>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  onChange={handleUserInput}
                  required
                  autoComplete="on"
                  placeholder="Password"
                  style={{ height: "3rem", marginTop: "1rem"  ,maxWidth:"20rem",borderRadius: "5px 10px 0 15px"}}
                />
                <label htmlFor="password">Password *</label>
                <div className="invalid-feedback">Please enter a password.</div>
              </div>

              <button
                type="submit"
                className="btn bg-color custom-bg-text"
                onClick={validateForm}
                style={{ marginLeft: "6.1rem", marginTop: "1.8rem",borderRadius: "5px 10px 0 15px",width:"8rem" }}
              >
                Login
              </button>
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    // </div>
  );
};

export default DeliveryPersonLogin;