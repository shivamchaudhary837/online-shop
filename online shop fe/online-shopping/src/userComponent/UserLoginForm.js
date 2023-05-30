import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import  bg from "../images/bg_img.jpg"
// import "./UserLoginForm.css"

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
      result.json().then((res) => {
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
      }).catch((error) => {
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
 
  const loginWithGithub = () => {
    // Handle login with GitHub logic here
    // Redirect user to GitHub OAuth login page or use GitHub API for authentication
    // After successful login, handle the response and store user data
  };
  return (
    <>
    <div className="vertical-down container">

     

      <div className="mt-2 d-flex aligns-items-center justify-content-center">
        <div
          className="card form-card border-color custom-bg"
          style={{ width: "35rem" }}
          >
          <div className="card-header custom-bg text-center bg-color-text ">
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
                />
              </div>
              <div className="mb-3">
                <label for="password" className="form-label">
                  {/* <b>Password</b> */}
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
                />
              </div>
              <button
                type="submit"
                className="btn bg-color custom-bg-text"
                onClick={loginAction}
              >
                Login
              </button>
              
              <button
                className="btn bg-color custom-bg-text ml-2"
                onClick={loginWithGithub}

                style={{  marginLeft: '10px' }}
              >
                  Login via GitHub
              </button>
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
      
    </div>
    </>
  );
};

export default UserLoginForm;
