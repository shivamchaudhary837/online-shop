import { useState,useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import {FaEdit} from 'react-icons/fa'

const AddCardDetails = () => {
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
    <div>
      <div class="mt-2 pt-5 d-flex aligns-items-center justify-content-center">
        <div class="card form-card t-5  border-color" style={{ width: "30rem" , marginTop: "7rem"}}>
    
          <div className="card-header bg-color custom-bg-text">
            <h5 class="card-title text-center">Address Confirmation</h5>
          </div>
          
          <div class="card-body text-color custom-bg">

          <div className="form-check">
      <input
        className="form-check-input"
        placeholder="CONFIRM ADDRESS"
        value={address.street+", "+address.city+", "+address.pincode}
        style={{ width: "80%",height:"20%", padding: "0.5rem", border: "3px solid darkgreen", borderRadius: "3px" ,backgroundColor:"lightgray",marginLeft:"0.1rem"}}
        

      />
    
    <Link to={`/user/myprofile?`}><FaEdit className="icons edit" style={{width:"2.8rem",height:"2.8rem",marginLeft:"2rem",marginTop:"-0.1rem", color:"rgba(16, 65, 50, 0.87)"}}/></Link>  
    
    {/* <button
  className="btn btn-primary btn-sm ml-auto"
  onClick={() => navigate("/edit-address")}
  style={{ width: "20%",height:"20%", padding: "0.5rem", border: "1px solid gray", borderRadius: "3px",marginTop:"0.3rem",marginLeft:"1rem" }}

>
  Edit
</button> */}

      
      <label className="form-check-label" htmlFor="CONFORM ADDRESS">
       
      </label>
    </div>

          <div className="mb-3" style={{marginTop:"2rem"}}>
  <label htmlFor="paymentType" className="form-label" style={{marginLeft:"1.6rem"}}>
    <b>Payment Type</b>
  </label>
  <div>
    <div className="form-check" style={{marginLeft:"2.5rem"}}>
      <input
        className="form-check-input"
        type="radio"
        name="paymentType"
        id="cod"
        value="cod"
        checked={paymentType === "cod"}
        onChange={(e) => setPaymentType(e.target.value)}
        
      />
      <label className="form-check-label" htmlFor="cod">
        Cash on Delivery
      </label>
    </div>
    <div className="form-check" style={{marginLeft:"2.5rem"}}>
      <input
        className="form-check-input"
        type="radio"
        name="paymentType"
        id="wallet"
        value="wallet"
        checked={paymentType === "wallet"}
        onChange={(e) => setPaymentType(e.target.value)}
      />
      
      <label className="form-check-label" htmlFor="wallet">
        Wallet Pay
      </label>
    </div>
    
    
    
  </div>
</div>
<div className="xyz" style={{display: "flex"}}>  
{paymentType === "wallet" && (
            <div className="mb-3"
              style={{display:"inline-block"}}
              >
              
              
              <button className="btn custom-bg-text bg-color" style={{marginLeft:"1.6rem",marginTop:"1rem",width:"10rem"}}  onClick={checkBalance}>
                Check Balance
              </button>
            </div>
          )}
          
             <form onSubmit={payForOrder}>
            
              
              
              <input 
                type="submit"
                class="btn custom-bg-text bg-color"
                value={paymentType ==="wallet" ? "PAY  IT" : "Proceed"}
                
                style={{display: "flex", flexDirection: "row" ,marginTop:"1.05rem",
                marginLeft:"5.4rem",width:"10rem",paddingInline:"3.2rem"}}
              />
               
              <ToastContainer />
            </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};




export default AddCardDetails;