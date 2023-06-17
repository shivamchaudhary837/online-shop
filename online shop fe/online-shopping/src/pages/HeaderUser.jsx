import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HeaderUser = () => {
  let navigate = useNavigate();

  const userLogout = () => {
    toast.success("logged out!!!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    sessionStorage.removeItem("active-user");
    navigate("/home")
    window.location.reload(true);

  };

  return (
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
      <li className="nav-item">
        <Link to="/search" className="nav-link active" aria-current="page">
          <b className="text-color">Search</b>
          <i class="fa-solid fa-magnifying-glass fa-beat" style={{marginLeft:"5px"}}></i>
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/user/mycart" className="nav-link active" aria-current="page">
          {/* <img src="../images/e_logo.png"  width="100" height="120" /> */}
          <i className="fa-solid fa-cart-shopping" style={{ marginLeft: "14px", margin: '4px' }}></i>
          {/* <i class="fa-solid fa-cart-shopping fa-beat"></i> */}
          <b className="text-color" style={{ marginRight: "4px" }}>Cart</b>

        </Link>
      </li>
      <li className="nav-item dropdown">

        <Link
          className="nav-link dropdown-toggle"
          to="#"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {/* <Link to="/user/mycart" className="dropdown-item">
              My Cart
            </Link> */}
          <i className="fa-solid fa-user" style={{ margin: "2px" }}></i>
          <b className="text-color" style={{ marginLeft: "4px" }}>MyAccount</b>
        </Link>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          <li>
            {/* <Link to="/user/mycart" className="dropdown-item">
              My Cart
            </Link> */}
          </li>
          <li>
            <Link to="/user/myprofile" className="dropdown-item">
            <i class="fa-solid fa-user fa-beat" style={{margin:'4px'}}></i>
              {/* <i className="fa-solid fa-user" style={{margin:"4px"}}></i> */}
              My Profile
            </Link>

          </li>
          <li>
            <Link to="/user/myorder" className="dropdown-item">
            {/* <i className="fa-sharp fa-regular fa-folder-open" style={{margin:"4px"}}></i> */}
            <i class="fa-regular fa-folder-open fa-beat"style={{margin:'4px'}}></i>
              My Orders

            </Link>
          </li>
          <li>
            <li className="nav-item">

              <Link
                to=""
                className="nav-link active"
                aria-current="page"
                onClick={userLogout} style={{ marginLeft: '6.5px', marginTop: "-4.5px" }}
              >
                {/* <i className="fa-sharp fa-light fa-unlock-keyhole"></i> */}
                {/* <b className="text-color" style={{margin:'6px'}}>Logout</b> */}
                <i className="fa-sharp fa-solid fa-power-off" style={{margin:"4px"}}></i>
                {/* <i class="fa-solid fa-power-off fa-beat" style={{margin:'4px'}}></i> */}
                Logout
              </Link>

              <ToastContainer />
            </li>
          </li>


        </ul>
      </li>

    </ul>
  );
};

export default HeaderUser;