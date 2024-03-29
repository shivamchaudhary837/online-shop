import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddProductForm = () => {
  const [categories, setCategories] = useState([]);

  const retrieveAllCategories = async () => {
    const response = await axios.get("http://localhost:8080/api/category/all");
    return response.data;
  };

  useEffect(() => {
    const getAllCategories = async () => {
      const allCategories = await retrieveAllCategories();
      if (allCategories) {
        setCategories(allCategories);
      }
    };

    getAllCategories();
  }, []);
  
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    quantity: "",
    categoryId: "",
  });

  const handleInput = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const callToast=(message)=>{
     
    toast.success(message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  const saveProduct = (e) => {
    e.preventDefault()

    const formData = new FormData();
    formData.append("image", selectedPhoto);
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("quantity", product.quantity);
    formData.append("categoryId", product.categoryId);

    axios
      .post("http://localhost:8080/api/product/add", formData)
      .then((resp) => {
        let result = resp.data.data;
        callToast("Product Added Successfully");
        setProduct({title: "", description: "", price: "",quantity: "",categoryId: "",photo: "",  
        });
        setCategories([]);
      })
      .catch((error) => {
        console.log("Error", error);
        alert("Error saving product");
      });
  };
  
  const handleImage=(e)=>{
    console.log("Imageeeeeee",e.target.files)
    console.log("checkk",selectedPhoto)
      setSelectedPhoto(e.target.files[0])
  }
  return (
    <div>
      <div class="mt-2 d-flex aligns-items-center justify-content-center">
        <div
          class="card form-card border-color card-color"
          style={{ width: "35rem" }}
        >
          <div className="card-header custom-bg text-color text-center">
            <h5 class="card-title">Add Product</h5>
          </div>
          <div class="card-body text-color">
            <form onSubmit={saveProduct}>
              <div class="mb-3">
                <label for="title" class="form-label">
                  <b>Product Title</b>
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  name="title"
                  onChange={handleInput}
                  value={product.title}
                  required
                />
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">
                  <b>Product Description</b>
                </label>
                <textarea
                  class="form-control"
                  id="description"
                  name="description"
                  rows="3"
                  onChange={handleInput}
                  value={product.description}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  <b>Category</b>
                </label>

                <select
                  name="categoryId"
                  onChange={handleInput}
                  className="form-control"
                >
                  <option value="">Select Category</option>

                  {categories.map((category) => {
                    return (
                      <option value={category.id}> {category.title} </option>
                    );
                  })}
                </select>
              </div>

              <div class="mb-3 mt-1">
                <label for="quantity" class="form-label">
                  <b>Product Quantity</b>
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="quantity"
                  name="quantity"
                  onChange={handleInput}
                  value={product.quantity}
                  required
                />
              </div>

              <div class="mb-3">
                <label for="price" class="form-label">
                  <b>Product Price</b>
                </label>
                <input
                  type="number"
                  class="form-control"
                  id="price"
                  name="price"
                  onChange={handleInput}
                  value={product.price}
                  required
                />
              </div>

              <div class="mb-3">
                <label for="formFile" class="form-label">
                  <b> Select Product Image</b>
                </label>
                <input
                  class="form-control"
                  type="file"
                  id="formFile"
                  name="photo"
                  value={product.photo}
                  onChange={handleImage}
                  required
                />
              </div>

              <button
                type="submit"
                class="btn bg-color custom-bg-text"
                // onClick={saveProduct}
              >
                Add Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;