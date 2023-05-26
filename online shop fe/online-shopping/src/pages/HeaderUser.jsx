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
    window.location.reload(true);
  };

  return (
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
      <li className="nav-item">
        <Link to="/user/mycart"  className="nav-link active" aria-current="page">
        {/* <img src="../images/e_logo.png"  width="100" height="120" /> */}
          <b className="text-color">My Cart</b>
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/user/myorder" className="nav-link active" aria-current="page">
          <b className="text-color">My Order</b>
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/user/myprofile" className="nav-link active" aria-current="page">
          <b className="text-color">My Profile</b>
          
        </Link>
      </li>

      <li className="nav-item">
        <Link
          to=""
          className="nav-link active"
          aria-current="page"
          onClick={userLogout}
        >
          <b className="text-color">Logout</b>
        </Link>

        

        <ToastContainer />
      </li>
    </ul>
  );
};

export default HeaderUser;
