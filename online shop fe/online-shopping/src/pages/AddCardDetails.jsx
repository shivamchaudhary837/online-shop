import { useState,useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { icons } from 'react-icons'
import {FaEdit,FaWallet,FaMoneyBillWave, FaMoneyCheckAlt ,FaAwes} from 'react-icons/fa'
import { Link } from "react-router-dom";
import './addcard.css'
import Modal from "./Modal";
import Modall from "./Modall";

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
  
  const [openModal, setOpenModal] = useState(false);
  const [openModall , setOpenModall] = useState(false);

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
    <>
    <div className="pay_img">
    
      <div className="mt-2 pt-5 d-flex aligns-items-center justify-content-center">
        <div 
        className="card"
        style={{ width: "40rem" , marginTop: "5rem",marginLeft:"-27rem"}}>
    
          {/* <div className="card-header custom-bg text-color">
            <h5 className="card-title text-center">Payment Details</h5>
          </div> */}
          
          <div className="card-body text-color card-color">

          <div className="form-check">
            <h6 style={{fontStyle:"italic",marginLeft:"11rem",fontSize:"1.4rem"}}>Drop-Off Address</h6>
          
           <div className="street-div">
           <label htmlFor="street" className="street-label" style={{marginLeft:"-29rem",fontStyle:"bold"}}>
                  Street
                </label>
      <input
        className="form-check-input"
        placeholder="CONFIRM ADDRESS"
        value={address.street}
        style={{ width: "80%",height:"20%", padding: "0.5rem", borderRadius: "3px" ,backgroundColor:"whitesmoke",marginLeft:"0.1rem",marginTop:"1.8rem"}}
      />
           </div>


      <div className="city-div">
           <label htmlFor="city" className="city-label" style={{marginLeft:"-29rem",fontStyle:"bold",marginTop:"3.5rem"}}>
                  City                           
                </label>     
      <input
        className="form-check-input"
        placeholder="CONFIRM ADDRESS"
        value={address.city}
        style={{ width: "38.5%",height:"20%", padding: "0.5rem", borderRadius: "3px" ,backgroundColor:"whitesmoke",marginLeft:"0.1rem",marginTop:"2.5rem"}}
      />
      </div>

      <div className="pincode-div">
           <label htmlFor="pincode" className="pincode-label" style={{fontStyle:"bold"}}>
                  Pincode
                </label>
      <input
        className="form-check-input"
        placeholder="CONFIRM ADDRESS"
        value={address.pincode}
        style={{ width: "38.5%",height:"20%", padding: "0.5rem", borderRadius: "3px" ,backgroundColor:"whitesmoke",marginLeft:"1.3rem",marginTop:"0.4rem"}}
        

      />
      </div>
    
    {/* <Link to={`/user/AddressModification`}> */}
      <FaEdit className="icons edit" style={{width:"2.8rem",height:"2.8rem",marginLeft:"32.4rem",marginTop:"-10.1rem", color:"rgba(16, 65, 50, 0.87)"}}
      onClick={() => {
        setOpenModall(true);
      }}
      />
      {/* </Link>   */}
    
      {/* <label className="form-check-label" htmlFor="CONFORM ADDRESS">
       
      </label> */}
    </div>

          <div className="mb-3" style={{marginTop:"2rem"}}>
  <label htmlFor="paymentType" className="form-label" style={{marginLeft:"13.7rem"}}>
    <h6 style={{fontSize:"1.3rem",fontStyle:"italic"}}>Payment Type</h6>
  </label>
  <div>
    <div className="form-check" style={{marginLeft:"2.5rem",marginTop:"-0.5rem"}}>
      <input
        className="form-check-input"
        type="radio"
        name="paymentType"
        id="cod"
        value="cod"
        checked={paymentType === "cod"}
        onChange={(e) => setPaymentType(e.target.value)}
        
      />
      
      <label className="form-check-label" htmlFor="cod" style={{}}>
        Cash on Delivery
      </label>
      <FaMoneyBillWave style={{width:"2rem",marginLeft:1}} />
    </div>
    <div className="form-check" style={{marginLeft:"2.5rem",marginTop:"0rem"}}>
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
      <FaWallet style={{width:"2rem",marginLeft:1}}/>
    </div>
    
    
    
  </div>
</div>
<div className="xyz" style={{display: "flex"}}>  
            {/* <form > */}
               <input 
                type="submit"
                class="btn custom-bg-text bg-color"
                value={paymentType ==="wallet" ? "Pay " : "Proceed"}
                onClick={() => {
                  setOpenModal(true);
                }}
                style={{ marginTop:"2.7rem",marginLeft:"29.3rem",width:"7rem"}}
              />
               <ToastContainer />
            {/* </form> */}
            
            {paymentType === "wallet" && (
            <div className="mb-3"
              style={{display:"inline-block"}}
              >    
              
               <button className="btn " style={{marginTop:"-6rem",border:"none",marginLeft:"-3.3rem",fontSize:"2.5rem"}}  onClick={checkBalance}>
              <FaMoneyCheckAlt style={{ color:"rgba(16, 65, 50, 0.87)"}}/>
              </button>
            </div>
            )}

<div className="totalamount">
  <hr className="l1" style={{width:"550px",marginLeft:"-35rem"}}/>
<h5 style={{marginLeft:"-34.7rem",marginTop:"1.9rem"}}>Total Amount :  &#8377;{priceToPay}/-</h5>
</div>

            </div>
          </div>
          {openModal && <Modal closeModal={setOpenModal} />}
          {/* {openModal && <Modaladdress closeModall={setOpenModal} />} */}
          {openModall &&  <Modall closeModall={setOpenModall} />}
        </div>
      </div>
     
    </div>
   
  </>
  );
};




export default AddCardDetails;