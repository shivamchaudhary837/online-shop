import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const GetAllCategories = () => {
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

  return (
    <div className="list-group form-card card-color">
      <Link
        to="/home/all/product/categories"
        className="list-group-item list-group-item-action custom-bg custom-bg-text"
      >
        <b style={{color:"black"}}>All Categories</b>
      </Link>

      {categories.map((category) => {
        return (
          <Link
            to={`/home/product/category/${category.id}/${category.title}`}
            className="list-group-item list-group-item-action text-color card-color"
          >
            <b>{category.title}</b>
          </Link>
        );
      })}
    </div>
  );
};

export default GetAllCategories;
