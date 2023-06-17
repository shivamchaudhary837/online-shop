import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import "./adduserform.css";

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

  const saveUser = (event) => {
    event.preventDefault();
    fetch("http://localhost:8080/api/user/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((result) => {
      toast.success("Registered Successfully!!!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      result
        .json()
        .then((res) => {
          console.log("response", res);
        })
        .catch((error) => {
          console.log("******", error);
          console.log(error);
        });
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
    <>
      <div className="img">
        <div className="mt-2 d-flex aligns-items-center justify-content-center ms-2 me-2 mb-2">
          <div
            className="card"
            style={{ width: "30rem", marginLeft: "39rem", marginTop: "3.5rem" }}
          >
            <div className="card-header">
              <h5 className="card-title" style={{ marginLeft: "12rem", fontStyle: "italic" }}>
                <b>Sign-Up</b>
              </h5>
            </div>
            <div className="card-body">
              <form
                id="addUserForm"
                className="needs-validation"
                onSubmit={saveUser}
                noValidate
              >
                <div className="form-floating mb-3 text-color">
                        <select
                          onChange={handleUserInput}
                          className="form-select"
                          name="role"
                          id="floatingRole"
                          value={user.role}
                          required
                        >
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
                    value={user.firstName}
                    required
                  />
                  <label htmlFor="floatingFirstName">First Name *</label>
                  <div className="valid-feedback"> Good</div>
                  <div className="invalid-feedback">Please enter a first name.</div>
                </div>

                <div className="form-floating mb-3 text-color">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingLastName"
                    name="lastName"
                    placeholder="Last Name"
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
                    onChange={handleUserInput}
                    value={user.street}
                    required
                  ></textarea>
                  <label htmlFor="floatingStreet">Street*</label>
                  <div className="invalid-feedback">Please enter street</div>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingCity"
                    name="city"
                    placeholder="City"
                    onChange={handleUserInput}
                    required
                  />
                  <label htmlFor="floatingCity">City*</label>
                  <div className="invalid-feedback">Please enter city</div>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="number"
                    className="form-control"
                    id="floatingPincode"
                    name="pincode"
                    placeholder="Pincode"
                    onChange={handleUserInput}
                    required
                  />
                  <label htmlFor="floatingPincode">Pincode*</label>
                  <div className="invalid-feedback">Please enter pincode</div>
                </div>

                <input
                  type="submit"
                  className="btn bg-color custom-bg-text"
                  value="Register"
                  style={{ marginLeft: "11.5rem" }}
                  onClick={validateForm}
                />

                <ToastContainer />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUserForm;
