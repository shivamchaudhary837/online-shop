import React, { useEffect, useState } from 'react'
import ProductCard from "../productComponent/ProductCard";
import {FaCheckCircle} from 'react-icons/fa'
import { icons } from 'react-icons'
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

const Successpage = () => {
  

  const location = useLocation();
  const navigate = useNavigate();


  const [orderList,setOrderList] = useState([]);

  
  useEffect(()=>{
      setOrderList(location.state.res)
      console.log("******check2222",orderList)
  },[orderList])


  const handleShoppingBtn=()=>{
    navigate("/")
    //console.log("******Checkingggg",orderList)
  }

  const deliveryDate=()=>{

    const currentDate = new Date();

    // Add 4 days to the current date
    const expectedDeliveryDate = new Date();
    expectedDeliveryDate.setDate(currentDate.getDate() + 4);
    
    const options = { day: "numeric", month: "short" };
    const formattedDeliveryDate = expectedDeliveryDate.toLocaleString("default", options);
    return formattedDeliveryDate;
  }
  return (
    <div className="main-container">
       <div className="congrats" style={{fontFamily:"'Kalam', cursive"}}>
       <h1 className="enlightment" style={{marginLeft:"44rem",marginTop:"6rem"}}>Hurry!!</h1>
       <h1 className="confirmation" style={{marginLeft:"32rem",marginTop:"1rem"}}>Your Order has been Placed</h1>
       {orderList.map((orders) => {
                  return (
                    <>
                       <h5 style={{marginLeft:"35rem"}}>#{orders.orderId} </h5>
                        
                       <h5 style={{marginLeft:"47rem",marginTop:"-2rem"}}> ,Expected Delivery by {deliveryDate()}</h5>
                    </>
                  )
                })}

       {/* style={{fontSize:80}} */}
       </div>
       
      <FaCheckCircle className="check-icon" style={{marginLeft:"42.6rem",marginTop:"2.4rem",width:"11rem",height:"11rem",color:"green"}}  /> 

      <div className="thanks" style={{marginTop:"3rem",fontFamily:"'Kalam', cursive",marginLeft:"34.5rem"}}>
        <h2>Thank You for Your Purchase!!</h2>
      </div>
          
      <div>
       <button
            className="btn "
            onClick={handleShoppingBtn}
            style={{ width: "15%",height:"20%", padding: "0.5rem", marginBottom:"20px",
            border: "1px solid gray", borderRadius: "3px",marginTop:"1rem",marginLeft:"41.1rem" , backgroundColor:"#7fc6cf",fontStyle:"bold"}}

           >
              Continue Shopping
          </button>
       </div>
    </div>
  )
}

export default Successpage;