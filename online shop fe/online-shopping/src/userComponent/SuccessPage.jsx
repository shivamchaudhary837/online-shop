import React from 'react'
// import { Link } from "react-router-dom";
import ProductCard from "../productComponent/ProductCard";
import {FaCheckCircle} from 'react-icons/fa'
import { icons } from 'react-icons'
import { useNavigate } from "react-router-dom";

const Successpage = () => {
  const navigate = useNavigate();
  return (
    <div className="main-container">
       <div className="congrats" style={{fontFamily:"'Kalam', cursive"}}>
       <h1 className="enlightment" style={{marginLeft:"44rem",marginTop:"6rem"}}>Hurry!!</h1>
       <h1 className="confirmation" style={{marginLeft:"32rem",marginTop:"1rem"}}>Your Order has been Placed</h1>

       {/* style={{fontSize:80}} */}
       </div>
       
      <FaCheckCircle className="check-icon" style={{marginLeft:"42.6rem",marginTop:"2.4rem",width:"11rem",height:"11rem",color:"green"}}  /> 

      <div className="thanks" style={{marginTop:"3rem",fontFamily:"'Kalam', cursive",marginLeft:"34.5rem"}}>
        <h2>Thank You for Your Purchase!!</h2>
      </div>

       <button
  className="btn "
  onClick={() => navigate("/")}
  style={{ width: "15%",height:"20%", padding: "0.5rem", border: "1px solid gray", borderRadius: "3px",marginTop:"1rem",marginLeft:"41.1rem" , backgroundColor:"#ec5610",fontStyle:"bold"}}

>
  Continue Shopping
</button>
       
    </div>
  )
}

export default Successpage;