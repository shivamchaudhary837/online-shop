import Header from "./pages/Header";
import AddProductForm from "./productComponent/AddProductForm";
import { Routes, Route } from "react-router-dom";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import AddCategoryForm from "./productComponent/AddCategoryForm";
import HomePage from "./pages/HomePage";
import Product from "./pages/Product";
import AddUserForm from "./userComponent/AddUserForm";
import UserLoginForm from "./userComponent/UserLoginForm";
import MyCart from "./userComponent/MyCart";
import AddCardDetails from "./pages/AddCardDetails";
import MyOrder from "./userComponent/MyOrder";
import AllOrders from "./userComponent/AllOrders";
import SearchOrder from "./userComponent/SearchOrder";
import RegisterAdminForm from "./userComponent/RegisterAdminForm";
import AdminLoginPage from "./userComponent/AdminLoginPage";
import AddDeliveryPerson from "./userComponent/AddDeliveryPerson";
import DeliveryPersonLogin from "./userComponent/DeliveryPersonLogin";
import AssignDeliveryToOrders from "./userComponent/AssignDeliveryToOrders";
import MyDeliveries from "./userComponent/MyDeliveries";
import MyProfile from "./userComponent/MyProfile";
import ProductDetail from "./productComponent/ProductDetail";
import SuccessPage from "./userComponent/SuccessPage";
import AddressModification from "./userComponent/AddressModification";
import SearchBox from './pages/SearchBox'
import UpdateStock from "./productComponent/UpdateStock";
import Modal from "./pages/Modal";
import Modall from "./pages/Modall";

function App() {
  return (
    <div>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/home/all/product/categories" element={<HomePage />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="addproduct" element={<AddProductForm />} />
        <Route path="addcategory" element={<AddCategoryForm />} />
        <Route path="/product" element={<Product />} />
        <Route path="/user/register" element={<AddUserForm />} />
        <Route path="/user/login" element={<UserLoginForm />} />
        <Route path="/user/admin/register" element={<RegisterAdminForm />} />
        <Route path="/user/admin/login" element={<AdminLoginPage />} />

        <Route path="/user/deliveryperson/register"
          element={<AddDeliveryPerson />}
        />
        <Route
          path="/user/deliveryperson/login"
          element={<DeliveryPersonLogin />}
        />
        <Route
          path="/home/product/category/:categoryId/:categoryName"
          element={<HomePage />}
        />
        <Route
          path="/product/:productId/category/:categoryId"
          element={<Product />}
        />
        <Route path="/user/mycart" element={<MyCart />} />
        <Route path="/user/order/payment" element={<AddCardDetails />} />
        <Route path="/user/myorder" element={<MyOrder />} />
        <Route path="/user/AddressModification" element={<AddressModification/>}/>
        <Route path="/user/myprofile" element={<MyProfile/>} />

        <Route path="/user/admin/allorder" element={<AllOrders />} />
        <Route path="/user/admin/searchOrder/:orderId" element={<SearchOrder />} />
        <Route
          path="/user/admin/assigndelivery/:orderId"
          element={<AssignDeliveryToOrders />}
        />
        <Route path="/user/delivery/myorders" element={<MyDeliveries />} />
        <Route path="/user/product/productdetail/:productId" element={<ProductDetail/>} />

        <Route path="/user/order/payment/successpage" element={<SuccessPage/>} />
        <Route path="/search" element={<SearchBox/>}/>

        <Route path="/updatestock/:productId" element={<UpdateStock/>}/>

        <Route path="/user/order/payment/modal" element={<Modal />} />
        <Route path="/user/order/payment/modall" element={<Modall/>} />

      </Routes>

      
    </div>
  );
}

export default App;