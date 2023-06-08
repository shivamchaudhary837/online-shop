import React, { useEffect,useState } from "react";

import axios from "axios";
import { Link } from "react-router-dom";

const SearchBox = () => {
 
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/product/search/${keyword}`);
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

  return (
    <div className="container" style={{ marginTop: "22px" }}>
     <div>
      <input
        type="search"
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
      />
      </div>
      <div>
      {/* Render search results */}
      <ul className="search-results">
        {searchResults.map((result) => (

          <Link to={`/product/${result.id}/category/${result.category.id}`}>
          <li key={result.id}>{result.title}</li>
          <li key={result.imageName}>
          <img
              src={"http://localhost:8080/api/product/" + result.imageName}
              className="card-img-top rounded mx-auto d-block m-2"
              alt="img"
              style={{
                maxHeight: "270px",
                maxWidth: "100%",
                width: "40px",
                height:"40px"
              }}
          />
          </li>
          </Link>
        ))}
      </ul>

      <style jsx>{`
        .search-results {
          display: flex;
          flex-wrap: wrap;
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .search-results li {
          flex: 0 0 33.33%;
          padding: 8px;
        }
      `}</style>
      </div>
    </div>
  );
};

export default SearchBox;