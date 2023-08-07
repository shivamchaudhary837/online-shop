import { useState, useEffect } from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
 
import AllOrders from "./AllOrders";
import { useParams } from "react-router-dom";

const AssignDeliveryToOrders = (props) => {
  
   let pathOrderId=useParams()
   
 
  

  const [allOrderData, setAllOrderData] = useState([]);

  const [deliveryPersons, setDeliveryPersons] = useState([]);

  const [assignDelivery, setAssignDelivery] = useState({
    orderId: "",
    deliveryId: "",
  });

  useEffect(() => {
    // Update the assignDelivery state with the orderId
    setAssignDelivery((prevState) => ({
      ...prevState,
      orderId: pathOrderId.orderId.toString(), // Convert orderId to a string if necessary
    }));

    

  }, []);
  
  useEffect(() => {
    
    const getAllDeliveryPerson = async () => {
      const allDeliveryStatus = await retrieveAllDeliveryPerson();
      if (allDeliveryStatus) {
        setDeliveryPersons(allDeliveryStatus);
      }
    };

    getAllDeliveryPerson();
  }, []);

  const retrieveAllDeliveryPerson = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/user/deliveryperson/all"
    );
    return response.data;
  };

  

  useEffect(()=>{
    const getAllOrder = async () => {
    
      const allOrder = await retrieveAllOrder();
      console.log("ORDER",allOrder)
      if (allOrder) {
        setAllOrderData(allOrder);
      }
    };

        getAllOrder()
  },[])
  
  const retrieveAllOrder = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/user/admin/showorder?orderId=" + pathOrderId.orderId.toString()
    );
    console.log(response.data);
    return response.data;
  };

  

  const assignDeliveryToOrders = (e) => {
    fetch("http://localhost:8080/api/user/admin/order/assignDelivery", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(assignDelivery),
    }).then((result) => {
      console.log("result", result);

      result.json().then((res) => {
        console.log("response", res);
        
        setAllOrderData({
          orderId: "",
          deliveryId: "",
        });

        setAllOrderData(res);
      });
    });

    e.preventDefault();
  };

  
  const handleInput = (e) => {
    setAssignDelivery({ ...assignDelivery, [e.target.name]: e.target.value });
  };

  return (
    <div>

        <div>
        <div className="card form-card ms-2 me-2 mb-2 border-color card-color" style={{marginTop:"20px"}}>
          
           
         
          <div className="card-body text-color" >
            <form className="row g-3">
              <div className="col-auto">
                <label>
                  <b>Order Id</b>
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="orderIdBox"
                  placeholder="Enter Order Id..."
                  name="orderId"
                  value={assignDelivery.orderId}
                  onChange={handleInput}
                  
                />
              </div>

              <div className="col-auto">
                <label>
                  <b>Delivery Person</b>
                </label>
                <select
                  onChange={handleInput}
                  className="form-control"
                  name="deliveryId"
                >
                  <option value="">Select Delivery Person</option>

                  {deliveryPersons.map((person) => {
                    return (
                      <option value={person.id}> {person.firstName} </option>
                    );
                  })}
                </select>
              </div>

              <div class="col-auto">
                <button
                  type="submit"
                  class="btn bg-color custom-bg-text mt-4"
                  onClick={assignDeliveryToOrders}
                >
                  Assign Delivery Person
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div
        className="card form-card mt-1 ms-2 me-2 mb-2 card-color border-color"
        style={{
          height: "35rem",
        }}
      >
        
        <div
          className="card-body"
          style={{
            overflowY: "auto",
          }}
        >
          <form class="row g-3">
            
          </form>
          <div className="table-responsive">
            <table className="table table-hover text-center">
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
                  <th scope="col">Delivery Mobile No</th>
                </tr>
              </thead>
              <tbody class="text-color">
                {allOrderData.map((orderData) => {
                  return (
                    <tr>
                      <td>
                        <b>{orderData.orderId}</b>
                      </td>
                      <td>
                        <img
                          src={
                            "http://localhost:8080/api/product/" +
                            orderData.productImage
                          }
                          class="img-fluid"
                          alt="product_pic"
                          style={{
                            maxWidth: "90px",
                          }}
                        />
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
                      <td>
                        <b>{orderData.deliveryPersonContact}</b>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default AssignDeliveryToOrders;
