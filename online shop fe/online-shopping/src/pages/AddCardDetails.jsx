import { useState,useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const AddCardDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("active-user"));
  const priceToPay = location.state.priceToPay;

  const [card, setCard] = useState({
    cardName: "",
    cardNumber: "",
    validThrough: "",
    cvv: "",
  });

  const handleCardInput = (e) => {
    setCard({ ...card, [e.target.name]: e.target.value });
  };

  

  const payAndOrder = () => {
    const requestData = {
      userId: user.id,
      priceToPay: priceToPay,
      paymentType: paymentType,
    };
    fetch("http://localhost:8080/api/user/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    }).then((result) => {
      console.log("result", result);
      result.json().then((res) => {
        console.log(res);

        
      });
    });
  };

  const payForOrder = () => {
    payAndOrder();
    toast.success("Products Ordered Sucessfully!!!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    navigate("/home");
  };

  const [paymentType,setPaymentType] = useState("wallet");

  const [balance, setBalance] = useState(0);

  useEffect(() => {
    // Fetch user's balance
    fetch(`http://localhost:8080/api/user/checkwalletbalance?userId=${user.id}`)
      .then((response) => response.text())
      .then((data) => {
        setBalance(parseInt(data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user.id]);

  const checkBalance = () => {
    // Show balance in a toast
    toast.info(`Wallet Balance: $${balance}`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div>
      <div class="mt-2 pt-5 d-flex aligns-items-center justify-content-center">
        <div class="card form-card t-5  border-color" style={{ width: "25rem" }}>
    
          <div className="card-header bg-color custom-bg-text">
            <h5 class="card-title text-center">Payment Details</h5>
          </div>
          
          <div class="card-body text-color custom-bg">
          <div className="mb-3">
  <label htmlFor="paymentType" className="form-label">
    <b>Payment Type</b>
  </label>
  <select
    className="form-control"
    id="paymentType"
    name="paymentType"
    onChange={(e) => setPaymentType(e.target.value)}
    value={paymentType}
    required
  >
    <option value="cod">Cash on Delivery</option>
    <option value="wallet">Wallet Pay</option>
  </select>
</div>
{paymentType === "wallet" && (
            <div className="mb-3">
              <button className="btn custom-bg-text bg-color" onClick={checkBalance}>
                Check Balance
              </button>
            </div>
          )}
            <form onSubmit={payForOrder}>

              <input
                type="submit"
                class="btn custom-bg-text bg-color"
                value={paymentType ==="wallet" ? "Pay" + priceToPay : "Proceed"}
              />

              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCardDetails;
