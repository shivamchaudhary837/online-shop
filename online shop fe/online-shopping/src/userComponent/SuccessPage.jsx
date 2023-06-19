import React, { useEffect, useState } from 'react'
// import { Link } from "react-router-dom";
import ProductCard from "../productComponent/ProductCard";
import {FaCheckCircle} from 'react-icons/fa'
import { icons } from 'react-icons'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Successpage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("active-user"));

  const [myCartData, setMyCartData] = useState([]);
  
  useEffect(() => {
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
       <div>
       <button
  className="btn "
  onClick={() => navigate("/")}
  style={{ width: "15%",height:"20%", padding: "0.5rem", border: "1px solid gray", borderRadius: "3px",marginTop:"1rem",marginLeft:"41.1rem" , backgroundColor:"#ec5610",fontStyle:"bold"}}

>
  Continue Shopping
</button>
       </div>

       {/* <div className="table-responsive"  style={{marginTop:"25px"}}>
            <table className="table table-hover bg-color-text text-center">
              <thead className="custom-bg table-bordered border-color">
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Quantity</th>
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
                      
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div> */}
    </div>
  )
}

export default Successpage;