import React from 'react'
import './Modal.css'
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Modal = ({closeModal}) => {
    const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("active-user"));
  const priceToPay = location.state.priceToPay;

  const [card, setCard] = useState({
    cardName: "",
    cardNumber: "",
    validThrough: "",
    cvv: "",
  });

  const handleCardInput = (e) => {
    setCard({ ...card, [e.target.name]: e.target.value });
  };

  const [orderStatus, setOrderStatus] = useState(null);

  const payAndOrder = () => {
    const requestData = {
      userId: user.id,
      priceToPay: priceToPay,
      paymentType: paymentType,
    };
    fetch("http://localhost:8080/api/user/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    }).then((result) => {
      console.log("result", result);
      result.json().then((res) => {
        console.log(res);

        if (res === "Order Failed") {
          setOrderStatus("failed");
        } else {
          setOrderStatus("success");
        }
      });
    });
  };

  const payForOrder = () => {
    payAndOrder();
    
    toast.success("Products Ordered Sucessfully!!!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  
    navigate("/user/order/payment/successpage");
    window.location.reload(true);
  };

  const [paymentType,setPaymentType] = useState("wallet");

  const [balance, setBalance] = useState(0);

  useEffect(() => {
    // Fetch user's balance
    fetch(`http://localhost:8080/api/user/checkwalletbalance?userId=${user.id}`)
      .then((response) => response.text())
      .then((data) => {
        setBalance(parseInt(data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user.id]);

  
  

  const [address, setAddress] = useState({
    
      street: "",
      city: "",
      pincode: "",
    
  });

  useEffect(() => {
    const getMyAddress = async () => {

      const addressResult = await retrieveUser();

      if (addressResult) {
        console.log("my profile is present");
      }
      setAddress(addressResult);
    };
    
    getMyAddress();

  }, []);

 
  const retrieveUser = async () => {
    const res = await axios.get(
      "http://localhost:8080/api/user/address/" + user.id
    );
    console.log(res.data);
    return res.data;
  };
  
  // const [openModal, setOpenModal] = useState(false);
  

  const checkBalance = () => {
    // Show balance in a toast
    toast.info(`Wallet Balance: $${balance}`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="modalBackground">
      <div className="modalcontainer">
          <div className="title-close-btn">
          <button onClick={() => closeModal(false)}> X </button>
          </div>
          
          <div className="title">
              <h2>Are You Sure....</h2>
              
              <h4>You want to Continue</h4>
          </div>
          {/* <div className="body">
              <p>hello </p>
          </div> */}
          <div className="footer" >
              <button onClick={() =>payForOrder()}>Yes</button>
              <button id="cancelbtn" onClick={() => closeModal(false)}>No</button>
              
          </div>
      </div>
    </div>
  )
}

export default Modal