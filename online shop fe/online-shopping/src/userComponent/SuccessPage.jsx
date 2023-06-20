import React, { useEffect, useState } from 'react'
import ProductCard from "../productComponent/ProductCard";
import {FaCheckCircle} from 'react-icons/fa'
import { icons } from 'react-icons'
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

const Successpage = () => {
  

  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("active-user"));

  const [orderList,setOrderList] = useState([]);

  const [myCartData, setMyCartData] = useState([]);
  
  useEffect(()=>{
      setOrderList(location.state.res)
      console.log("******check2222",orderList)
  },[orderList])

  useEffect(() => {
    console.log("******this",orderList)

    const getMyCart = async () => {
      const myCart = await retrieveMyCart();
      if (myCart) {
        console.log("cart data is present :)");
        console.log("totalPrice",myCart.totalCartPrice);
        console.log(myCart.cartData);
        setMyCartData(myCart.cartData);
      }
    };

    getMyCart();
  }, []);

  const retrieveMyCart = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/user/mycart?userId=" + user.id
    );
    console.log(response.data);
    console.log("userId",user.id)
    return response.data;
  };

  const handleShoppingBtn=()=>{
    navigate("/")
    //console.log("******Checkingggg",orderList)
  }

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
       

       <div className="table-responsive"  style={{margin:"25px"}}>
            <table className="table table-hover bg-color-text text-center">
              <thead className="custom-bg table-bordered border-color">
                <tr>
                  <th scope="col">Order Id</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Product Image</th>
                  <th scope="col">Expected Date</th>
                </tr>
              </thead>
              <tbody className="text-color">
                {orderList.map((orders) => {
                  return (
                    <tr>
                       
                      <td>
                        <b>{orders.orderId}</b>
                      </td>
                      <td>
                        <b>{orders.product.title}</b>
                      </td>
                      
                      <td>
                        <img
                          src={
                            "http://localhost:8080/api/product/" +
                            orders.product.imageName
                          }
                          class="img-fluid"
                          alt="product_pic"
                          style={{
                            maxWidth: "90px",
                          }}
                        />
                      </td> 
                         
                         <td>
                           <b> {deliveryDate()}</b>
                         </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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