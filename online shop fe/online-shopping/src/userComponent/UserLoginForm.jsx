import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import bg from "../images/bg_img.jpg";
// import "./UserLoginForm.css"
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import axios from "axios";

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
    fetch("http://localhost:8080/api/user/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginRequest),
    }).then((result) => {
      console.log("result", result);
      result
        .json()
        .then((res) => {
          console.log(res);

          if (res.role === "Admin") {
            console.log("Working fine:)");
            sessionStorage.setItem("active-admin", JSON.stringify(res));
          } else if (res.role === "Customer") {
            sessionStorage.setItem("active-user", JSON.stringify(res));
          } else if (res.role === "Delivery") {
            sessionStorage.setItem("active-delivery", JSON.stringify(res));
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
          toast.error("Wrong Email Id or Password,Try Again", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    });

    e.preventDefault();
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
    
           user.firstName=details.given_name;
           user.lastName=details.family_name;
           user.emailId=details.email;
           user.password="";
           user.role="Customer"
           setUser(user);

           axios.get("http://localhost:8080/api/user/email/"+user.emailId)
                .then((res)=>{

                  if(res.data){
                    sessionStorage.setItem("active-user", JSON.stringify(res.data));
                      navigate("/home");
                      window.location.reload(true);
                  }
                  else{

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
                })
           
           
  };
  return (
    <>
      <div className="vertical-down container">
        <div className="mt-2 d-flex aligns-items-center justify-content-center">
          <div
            className="card form-card border-color card-color"
            style={{ width: "25rem" }}
          >
            <div className="card-header custom-bg text-center bg-color-text " 
             
            >
              <h4 className="card-title">User Login</h4>
            </div>
            <div className="card-body">
              <form>
                <div className="mb">
                  <label for="emailId" className="form-label">
                    {/* <b>Email Id </b> */}
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="emailId"
                    name="emailId"
                    placeholder="Email ID"
                    onChange={handleUserInput}
                    value={loginRequest.emailId}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label for="password" className="form-label">
                  </label>
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
                  />
                </div>
              
                 <div className="d-flex justify-content-between align-items-center">
                  <button
                    type="submit"
                    className="btn bg-color custom-bg-text"
                    onClick={loginAction}
                    style={{ marginTop: "1px" }}
                  >
                    Login
                  </button>
                  <button
                    
                  >
                    <GoogleOAuthProvider clientId="668976964137-tljnqvmeh5jq54u9ldevost06cn878pl.apps.googleusercontent.com">
                      <GoogleLogin
                        onSuccess={(credentialResponse) => {
                          const details = jwt_decode(
                            credentialResponse.credential
                          );
                          console.log("", "detail of user", details);
                          // console.log(credentialResponse);
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
      </div>
    </>
  );
}
export default UserLoginForm;