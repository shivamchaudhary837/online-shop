import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminHeader = () => {
  let navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("active-admin"));
  console.log(user);

  const adminLogout = () => {
    toast.success("logged out!!!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    sessionStorage.removeItem("active-admin");
    
    navigate("/user/admin/login")
    window.location.reload(true);
  };

  return (
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
      <li className="nav-item dropdown">
        <Link
          className="nav-link dropdown-toggle"
          to="#"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <b className="text-color">MyAccount</b>
        </Link>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          <li>
            <Link to="/addcategory" className="dropdown-item">
            <i class="fa-solid fa-plus fa-beat-fade" style={{margin:'2px'}}></i>
              Add Category
            </Link>
          </li>
          <li>
          
            <Link to="/addproduct" className="dropdown-item">
            <i class="fa-solid fa-plus fa-beat-fade" style={{margin:'2px'}}></i>
              Add Product
            </Link>
          </li>

          <li>
            <Link to="/user/admin/allorder" className="dropdown-item">
            <i class="fa-regular fa-folder-open fa-beat" style={{margin:'2px'}}></i>
              All Orders
            </Link>
          </li>
          {/* <li>
            <Link to="/user/admin/assigndelivery" className="dropdown-item">
              Assign Order Delivery
            </Link>
          </li> */}
        </ul>
      </li>
      <li className="nav-item">
        <Link
          to=""
          className="nav-link active"
          aria-current="page"
          onClick={adminLogout}
        >
           <i class="fa-sharp fa-solid fa-power-off" style={{marginRight:"4px"}}></i>
          <b className="text-color">Logout</b>
        </Link>
        <ToastContainer />
      </li>
    </ul>
  );
};

export default AdminHeader;
