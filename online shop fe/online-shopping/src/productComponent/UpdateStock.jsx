import React from "react";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import userEvent from "@testing-library/user-event";

const UpdateStock = () => {
  const {productId} = useParams();
  const [stock,setStock]=useState('');

  

  const [product, setProduct] = useState({
    id: "",
    title: "",
    description: "",
    quantity: "",
    price: "",
    imageName: "",
    category: { id: "", title: "" },
  });

  const retrieveProduct = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/product/"+productId
    );

    return response.data;
  };

  const addProduct=async (stocks)=>{
    const res=await axios.post("http://localhost:8080/api/product/update/"+productId,
    stocks);

    return res.data;
  }

  useEffect(() => {
    const getProduct = async () => {
      const retrievedProduct = await retrieveProduct();

      setProduct(retrievedProduct);
    };

    getProduct();
    console.log("hello product",product)
  }, [stock]);

  
  const handleStock=(e)=>{
       
       try{
       const result=addProduct(stock)
       console.log("stocks:",stock)
       console.log("update-p",result)
       }
       catch(error){
        alert("Something went wrong",error)
       }

       
       //e.preventDefault()
  }


  return (
    <div  className="card form-card ms-2 me-2 mb-2 border-color card-color" style={{marginTop:"20px"}}>

           <div className="card-body text-color" >
            <form class="row g-3">
              <div class="col-auto">
                <label>
                  <b>Enter Stocks</b>
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="orderIdBox"
                  placeholder="Stock"
                  name="orderId"
                  onChange={(e)=>setStock(e.target.value)}
                  value={stock}
                  max={100}
                  required
                />
              </div>

              <div class="col-auto">
                <button
                  type="submit"
                  class="btn bg-color custom-bg-text mt-4"
                  onClick={handleStock}
                >
                 UpdateStock
                </button>
              </div>
            </form>
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
          <form class="row g-3"></form>
          <div className="table-responsive">
            <table className="table table-hover text-center">
              <thead className="table-bordered border-color custom-bg text-color">
                <tr>
                  
                  <th scope="col">Title</th>
                  <th scope="col">Image</th>
                  <th scope="col">Stock</th>
                  <th scope="col"> Price</th>
                 
                </tr>
              </thead>
              <tbody class="text-color">
               
                  
                    <tr>
                      <td>
                        <b>{product.title}</b>
                      </td>
                      <td>
                        <img
                          src={
                            "http://localhost:8080/api/product/" +product.imageName
                          }
                          class="img-fluid"
                          alt="product_pic"
                          style={{
                            maxWidth: "90px",
                          }}
                        />
                      </td>
                      <td>
                        <b>{product.quantity}</b>
                      </td>
                      <td>
                        <b>{product.price}</b>
                      </td>
                    </tr>
                  
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateStock;
