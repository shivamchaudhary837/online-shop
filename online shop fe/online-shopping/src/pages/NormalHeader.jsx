import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import axios for making API requests

const NormalHeader = () => {
  

  

  return (
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-5">

      <li className="nav-item">
        <Link to="/search" className="nav-link active" aria-current="page">
          
          <i class="fa-solid fa-magnifying-glass fa-beat" style={{marginRight:"5px"}}></i>
          <b className="text-color">Search</b>
        </Link>
      </li>
      
      
      <li className="nav-item">
        <Link to="/user/register" className="nav-link active" aria-current="page">
          <b className="text-color">Register</b>
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/user/login" className="nav-link active" aria-current="page">
          <b className="text-color">Login </b>
        </Link>
      </li>
    </ul>
  );
};
export default NormalHeader;