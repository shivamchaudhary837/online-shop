import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
  };
  
  const searchInputStyle = {
    border: 'none',
    flex: 1,
    padding: '5px',
    fontSize: '16px',
  };
  
  const searchIconStyle = {
    margin: '10px',
    fontSize: '16px',
    color: '#888',
    cursor: 'pointer',
  };
  
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
              placeholder="Enter Product Title"
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

      <style jsx>{`
        .search-container {
          position: sticky;
          top: 0;
          background-color: #fff;
          z-index: 1;
        }

        .container {
          padding-top: 22px;
        }

        .search-results {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          padding: 0;
          margin-top: 10px;
        }

        .search-result-item {
          flex-basis: 33.33%;
          text-decoration: none;
          color: inherit;
        }

        .search-result-item-content {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          margin: 5px;
        }
      `}</style>
    </div>
  );
};

export default SearchBox;
