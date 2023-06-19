import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "./adminlogin.css";
import carousel1 from "../images/image.png";


const AdminLoginPage = () => {
  let navigate = useNavigate();

  const [loginRequest, setLoginRequest] = useState({
    emailId: "",
    password: "",
    role: "Admin",
  });

  const [response, setResponse] = useState({});

  const handleUserInput = (e) => {
    setLoginRequest({ ...loginRequest, [e.target.name]: e.target.value });
  };

  const loginAction = (e) => {
    fetch("http://localhost:8080/api/user/admin/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginRequest),
    })
      .then((result) => {
        console.log("RESULT", result);
        result
          .json()
          .then((res) => {
            if (res && res.role === "Admin") {
              sessionStorage.setItem("active-admin", JSON.stringify(res));
              console.log("Working fine:)");

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
            } else {
              toast.error("Wrong Email Id or Password, Try Again", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }
          })
          .catch((error) => {
            console.error(error);
            // Handle the error here, such as displaying an error message to the user
            toast.error("Wrong Email Id or Password, Try Again", {
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
        toast.error("Wrong Email Id or Password, Try Again", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
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
    // <div className="admin-img">
      <div className="mt-2 d-flex aligns-items-center justify-content-center">
        <div
          className="card"
          style={{ width: "68rem" ,marginLeft:"2rem", marginTop:"4.7rem",height:"30rem",boxShadow: "0 13px 15px rgba(128, 20, 20, 0.13) ",backgroundColor:"white"}}
        > 
          

          <img src={carousel1} alt="" style={{width:"24rem",height:"21rem",marginTop:"5rem",marginLeft:"6rem"}}/>
          <div className="text">

<h3 className="villa" style={{marginLeft:"12.7rem",marginTop:"-6.8rem",fontStyle:"italic"}}> Villa</h3>
<h3 className="villa" style={{marginLeft:"15.4rem",marginTop:"-0.8rem" ,fontStyle:"italic"}}>Namkeen....</h3>
<h1 className="k" style={{ marginLeft: "44rem", fontStyle: "italic", marginTop:"-20rem"}}>
   Admin Login
 </h1>            
</div>

          <div className="card-body">
            <form id="loginForm" onSubmit={loginAction} noValidate  style={{marginLeft:"39rem",marginTop:"-16.3rem"}}>
              <div className="mb-3">
                <div className="form-floating" >
                  <input
                    type="email"
                    className="form-control"
                    id="emailId"
                    name="emailId"
                    placeholder="Email Id"
                    onChange={handleUserInput}
                    required
                    style={{ height: "3rem" ,maxWidth:"20rem",borderRadius: "5px 10px 0 15px"}}
                  />
                  <label htmlFor="emailId">Email Id *</label>
                  <div className="invalid-feedback">Please enter a valid email address.</div>
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
                    autoComplete="on"
                    required
                    style={{ height: "3rem", marginTop: "1rem" ,maxWidth:"20rem",borderRadius: "5px 10px 0 15px"}}
                  />
                  <label htmlFor="password">Password *</label>
                  <div className="invalid-feedback">Please enter a password.</div>
                </div>
              </div>

              <button
                type="submit"
                className="btn bg-color custom-bg-text"
                onClick={validateForm}
                style={{ marginLeft: "6.3rem", marginTop: "1.4rem",borderRadius: "5px 10px 0 15px",width:"8rem" }}
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

export default AdminLoginPage;