import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import AssignDeliveryToOrders from "./AssignDeliveryToOrders";

const AllOrders = () => {
  const [allOrderData, setAllOrderData] = useState([]);

  useEffect(() => {
    const getAllOrder = async () => {
      const allOrder = await retrieveAllOrder();
      if (allOrder) {
        setAllOrderData(allOrder);
      }
    };

    getAllOrder();
  }, []);

  const retrieveAllOrder = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/user/admin/allorder"
    );
    console.log(response.data);
    return response.data;
  };

  // const handleRow= ()=>{
  //   window.location.href="/user/admin/assigndelivery"
  // }

  return (
    <div className="mt-3">
      <div
        className="card form-card ms-2 me-2 mb-5 card-color border-color "
        style={{
          height: "45rem",
        }}
      >
        <div
          className="card-body"
          style={{
            overflowY: "auto",
          }}
        >
          <div className="table-responsive"  >
            <table className="table table-hover text-color text-center">
              <thead className="table-bordered border-color custom-bg text-color">
                <tr>
                  <th scope="col">Order Id</th>
                  <th scope="col">Product</th>
                  <th scope="col">Name</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Total Price</th>
                  <th scope="col">Customer Name</th>
                  <th scope="col">Street</th>
                  <th scope="col">City</th>
                  <th scope="col">Pin code</th>
                  <th scope="col">Mobile No.</th>
                  <th scope="col">Order Date</th>
                  <th scope="col">Delivery Date</th>
                  <th scope="col">Delivery Status</th>
                  <th scope="col">Delivery Person</th>
                </tr>
              </thead>
              <tbody  >
                {allOrderData.map((orderData) => (
                  
                    <tr >
                      <td>
                        <b>{orderData.orderId}</b>
                      </td>

                      <td>
                       
                      <Link  to={`/user/admin/assigndelivery/${orderData.orderId}`} >
                       
                        <img
                          src={`http://localhost:8080/api/product/${orderData.productImage}`}
                          className="img-fluid"
                          alt="product_pic"
                          style={{
                            maxWidth: "90px",
                          }}
                        />
                        </Link>
                        
                      </td>
                      <td>
                        <b>{orderData.productName}</b>
                      </td>
                      <td>
                        <b>{orderData.quantity}</b>
                      </td>
                      <td>
                        <b>{orderData.totalPrice}</b>
                      </td>
                      <td>
                        <b>{orderData.userName}</b>
                      </td>
                      <td>
                        <b>{orderData.address.street}</b>
                      </td>
                      <td>
                        <b>{orderData.address.city}</b>
                      </td>
                      <td>
                        <b>{orderData.address.pincode}</b>
                      </td>
                      <td>
                        <b>{orderData.userPhone}</b>
                      </td>
                      <td>
                        <b>{orderData.orderDate}</b>
                      </td>
                      <td>
                        <b>{orderData.deliveryDate}</b>
                      </td>
                      <td>
                        <b>{orderData.deliveryStatus}</b>
                      </td>
                      <td>
                        <b>{orderData.deliveryPersonName}</b>
                      </td>
                    </tr>
                  
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllOrders;
