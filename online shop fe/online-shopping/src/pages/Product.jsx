import GetAllCategories from "../productComponent/GetAllCategories";
import CategoryNavigator from "../productComponent/CategoryNavigator";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../productComponent/ProductCard";
import { ToastContainer, toast } from "react-toastify";

const Product = () => {
  const { productId, categoryId } = useParams();

  let user = JSON.parse(sessionStorage.getItem("active-user"));

  const [quantity, setQuantity] = useState("");

  const [products, setProducts] = useState([]);

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
      "http://localhost:8080/api/product/id?productId=" + productId
    );

    return response.data;
  };

  useEffect(() => {
    const getProduct = async () => {
      const retrievedProduct = await retrieveProduct();

      setProduct(retrievedProduct);
    };

    const getProductsByCategory = async () => {
      const allProducts = await retrieveProductsByCategory();
      if (allProducts) {
        setProducts(allProducts);
      }
    };

    getProduct();
    getProductsByCategory();
  }, [productId]);

  const retrieveProductsByCategory = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/product/category?categoryId=" + categoryId
    );
    console.log(response.data);
    return response.data;
  };

  const saveProductToCart = (userId) => {
    fetch("http://localhost:8080/api/user/cart/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quantity: quantity,
        userId: userId,
        productId: productId,
      }),
    }).then((result) => {
      console.log("result", result);
      
      if(result!=null ){
      toast.success("Products added to Cart Successfully!!!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      }
      else{
        toast.success("Something went wrong", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      result.json().then((res) => {
        console.log("response", res);
      });
    });
  };

  const addToCart = (e) => {
    
    
    let value1=parseInt(quantity);
    let value2=parseInt(product.quantity)

    if(value2 === 0){
      toast.error("Out of Stock!!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
       
    }
    else if(value1 <= 0 || value1 > value2){
      

      toast.error("Enter Quantity in range", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
    }
    else if (user === null) {
      alert("Please login to buy the products!!!");
      //e.preventDefault();
    } else {
      saveProductToCart(user.id);
      setQuantity("");
      
      const getProduct = async () => {
        const retrievedProduct = await retrieveProduct();
    
        setProduct(retrievedProduct);
      };
      getProduct()
      //e.preventDefault();
    }

     e.preventDefault();
  };

  

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-2 mt-2">
          <GetAllCategories />
        </div>
        <div className="col-sm-3 mt-2 admin">
          <div className="card form-card border-color card-color">
            <img
              src={"http://localhost:8080/api/product/" + product.imageName}
              style={{
                maxHeight: "300px",
                maxWidth: "100%",
                width: "auto",
              }}
              className="card-img-top rounded mx-auto d-block m-2"
              alt="img"
            />
          </div>
        </div>
        <div className="col-sm-7 mt-2">
          <div className="card form-card border-color card-color">
            <div className="card-header custom-bg">
              <div className="d-flex justify-content-between">
                <h1 className="text-color">{product.title}</h1>
              </div>
            </div>

            <div className="card-body text-left text-color">
              <div className="text-left mt-3">
                <h3>Description :</h3>
              </div>
              <h4 className="card-text" style={{marginLeft:"1rem",marginTop:"1rem"}}>{product.description}</h4>
            </div>

            <div className="card-footer card-color">
              <div className="text-center text-color" style={{marginLeft:"43rem"}}>
                <p>
                  <span>
                    <h4>Price : &#8377;{product.price}</h4>
                  </span>
                </p>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <form className="row g-3" onSubmit={addToCart}>
                    <div className="col-auto" >
                      <input
                        type="number"
                        className="form-control"
                        id="addToCart"
                        placeholder="Enter Quantity..."
                        onChange={(e) => setQuantity(e.target.value)}
                        value={quantity}
                        required
                      />
                    </div>
                    <div className="col-auto" >
                      <input
                        type="submit"
                        className="btn bg-color custom-bg-text mb-3"
                        value="Add to Cart"
                      />
                      <ToastContainer />
                    </div>
                  </form>
                </div>

                <p className="ml-2 text-color" style={{marginRight:"2rem"}}>
                  <b>Stock : {product.quantity}</b>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-sm-2"></div>

        <div className="col-sm-10">
          <h2>Related Products:</h2>
          <div className="row row-cols-1 row-cols-md-4 g-4">
              
                {products.map((product) => {
                  return <ProductCard item={product} />;
                })}
              </div>
        </div>
      </div>
    </div>
  );
};

export default Product;