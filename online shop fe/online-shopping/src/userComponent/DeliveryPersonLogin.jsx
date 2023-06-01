import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const DeliveryPersonLogin = () => {
  let navigate = useNavigate();
  
  const [loginRequest, setLoginRequest] = useState({
    emailId: "",
    password: "",
    role:"Delivery"
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
      });
    });
    e.preventDefault();
  };

  return (
    <div>
      <div className="mt-2 d-flex aligns-items-center justify-content-center" >
        <div className="card form-card border-color" style={{ width: "35rem" ,marginTop:"100px"}} >
          <div className="card-header custom-bg text-center" >
            <h4 className="card-title">Delivery Person Login</h4>
          </div>
          <div className="card-body">
            <form>
              <div className="mb-3">
                <label for="emailId" class="form-label custom-bg-text">
                  
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="emailId"
                  name="emailId"
                  onChange={handleUserInput}
                  value={loginRequest.emailId}
                  placeholder="Email Id"
                />
              </div>
              <div className="mb-3">
                <label for="password" className="form-label custom-bg-text">
                 
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  onChange={handleUserInput}
                  value={loginRequest.password}
                  autoComplete="on"
                  placeholder="Password"
                />
              </div>

              <button
                type="submit"
                className="btn bg-color custom-bg-text"
                onClick={loginAction}
              >
                Login
              </button>
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPersonLogin;
