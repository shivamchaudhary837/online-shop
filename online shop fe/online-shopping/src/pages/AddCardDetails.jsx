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
import carousel1 from "../images/imagee.png";

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

  const [totatPrice, setTotalPrice] = useState("");
  const [myCartData, setMyCartData] = useState([]);

  useEffect(() => {
    const getMyCart = async () => {
      const myCart = await retrieveMyyCart();
      if (myCart) {
        console.log("cart data is present :)");
        console.log(myCart.totalCartPrice);
        console.log(myCart.cartData);
        setTotalPrice(myCart.totalCartPrice);
        setMyCartData(myCart.cartData);
      }
    };

    getMyCart();
  }, []);

  const retrieveMyyCart = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/user/mycart?userId=" + user.id
    );
    console.log(response.data);
    return response.data;
  };

  const deleteProductFromCart = (cartId, e) => {
    const response = axios.get(
      "http://localhost:8080/api/user/mycart/remove?cartId=" + cartId
    );

    console.log(response);
    window.location.reload(true);
  };

  const deliveryDate=()=>{

    const currentDate = new Date();

    // Add three days to the current date
    const expectedDeliveryDate = new Date();
    expectedDeliveryDate.setDate(currentDate.getDate() + 4);
    
    const options = { day: "numeric", month: "short" };
    const formattedDeliveryDate = expectedDeliveryDate.toLocaleString("default", options);
    return formattedDeliveryDate;
  }
  return (
    <>
    <div className="pay_img">

      <div className="mt-2 pt-5 d-flex aligns-items-center justify-content-center">

      <div className="table-responsive">
            <table className="table table-hover bg-color-text text-center" style={{width:"80rem",marginLeft:"12rem",marginTop:"0rem"}}>
              <thead className="custom-bg table-bordered border-color">
                <tr style={{backgroundColor:"#7fc6cf",height:"3rem"}}>
                  <th scope="col">Product</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody className="text-color">
                {myCartData.map((cartData) => {
                  return (
                    <tr>
                      <td>
                        <img
                          src={
                            "http://localhost:8080/api/product/" +
                            cartData.productImage
                          }
                          class="img-fluid"
                          alt="product_pic"
                          style={{
                            maxWidth: "90px",
                          }}
                        />
                      </td>
                      <td>
                        <b>{cartData.productName}</b>
                      </td>
                      <td>
                        <b>{cartData.productDescription}</b>
                      </td>
                      <td>
                        <b>{cartData.quantity}</b>
                      </td>
                      <td>
                        <button
                          className="btn bg-color custom-bg-text btn-sm"
                          onClick={() => deleteProductFromCart(cartData.cartId)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                    
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        
        <div  >
            <h5  style={{marginLeft:"80rem"}}><b>Expected Delivery Date:</b> {deliveryDate()}</h5>
        </div>

        <div>
           <img src={carousel1} alt="" 
           style={{marginLeft:"70rem",marginTop:"3rem",width:"25rem",height:"25rem"}}/>
        </div>
    
        <div 
        className="card"
        style={{ width: "40rem" , marginTop: "-25rem",marginLeft:"19rem",boxShadow: "0 13px 15px rgba(128, 20, 20, 0.13)"}}>
    
          {/* <div className="card-header custom-bg text-color">
            <h5 className="card-title text-center">Payment Details</h5>
          </div> */}
          
            <div className="card-body text-color card-color">

          <div className="form-check">
            <h6 style={{fontStyle:"italic",marginLeft:"11rem",fontSize:"1.4rem"}}>Drop-Off Address</h6>
          
            <div className="address" style={{border:"1px solid black",width:"28rem",marginTop:"2.4rem",height:"6rem"}}>
            <input
            type="radio"
            style={{marginTop:"2rem",marginLeft:"1rem",width:"0.9rem"}}></input>
            <h6 style={{marginLeft:"2.3rem",marginTop:"-1.6rem"}}>{address.street} ,{address.city}</h6>
            {/* <h5></h5> */}
            <h6 style={{marginLeft:"2.3rem"}}>{address.pincode}</h6>
          </div>
         
           
      <div>
         <FaEdit className="icons edit" style={{width:"2.8rem",height:"2.8rem",marginLeft:"32.4rem",marginTop:"-8.1rem", color:"rgba(16, 65, 50, 0.87)"}}
      onClick={() => {
        setOpenModall(true);
      }}
      />
      </div>
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

      
     
  </>
  );
};




export default AddCardDetails;