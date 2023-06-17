import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './searchbox.css';

const SearchBox = () => {
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/product/search/${keyword}`
        );
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (keyword !== "") {
      fetchData();
    } else {
      setSearchResults([]);
    }
  }, [keyword]);

  const searchInputContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '5px',
    // width:'500px',
    marginLeft:'-50px',
    marginTop:'3px',
  };
  
  const searchInputStyle = {
    border: 'none',
    flex: 1,
    padding: '5px',
    fontSize: '16px',
    // marginLeft:'-30px',
    width:'550px',
  };
  
  const searchIconStyle = {
    margin: '10px',
    fontSize: '22px',
    color: '#888',
    cursor: 'pointer',
  };

  const backbtn =() => {
    window.history.back();
  }
  
  return (
    <div className="search-container">
      <div className="container" style={{ marginTop: "22px" }}>
        <div className="container" style={{ marginTop: "22px" }}>
          <div style={searchInputContainerStyle}>
            <input
              type="search"
              onChange={(e) => setKeyword(e.target.value)}
              value={keyword}
              style={searchInputStyle}
              placeholder="Search for items..."
              
            />
            <i
              className="fa-solid fa-magnifying-glass"
              style={searchIconStyle}
            ></i>
          </div>
        </div>
      </div>
      <div className="search-results">
        {/* Render search results */}
        {searchResults.map((result) => (
          <Link
            key={result.id}
            to={`/product/${result.id}/category/${result.category.id}`}
            className="search-result-item"
          >
            <div className="search-result-item-content">
              <div>
                <img
                  src={"http://localhost:8080/api/product/" + result.imageName}
                  className="card-img-top rounded mx-auto d-block m-2"
                  alt="img"
                  style={{
                    maxHeight: "270px",
                    maxWidth: "100%",
                    width: "40px",
                    height: "40px",
                  }}
                />
              </div>
              <div>{result.title}</div>
            </div>
          </Link>

        ))}
      </div>

      <div className="footer-btn">
        <button className="back-btn"
        onClick={()=>{
          backbtn()
        }}>
          BACK
        </button>
      </div>
    </div>
  );
};

export default SearchBox;