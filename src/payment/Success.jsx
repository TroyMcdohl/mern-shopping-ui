import "./success.css";
import { motion } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Success = () => {
  const location = useLocation();
  const data = location.state.stripeData;
  const cart = location.state.carts;

  console.log(cart);
  const [orderId, setOrderId] = useState();

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await fetch(
          "https://mern-shopping-backend-server.vercel.app/api/v1/orders",
          {
            method: "POST",
            credentials: "include",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
              products: cart.map((c) => ({
                productId: c.productId,
                quantity: c.quantity,
                productImg: c.productImg,
                productName: c.productName,
              })),
              total: cart
                .map((c) => c.total)
                .reduce(function (accumulator, currentValue) {
                  return accumulator + currentValue;
                }, 0),
              address: data.billing_details.address,
            }),
          }
        );
        const resData = await res.json();
        if (!res.ok) {
          console.log(resData);
        }

        setOrderId(resData.newOrder._id);
      } catch {}
    };
    data && createOrder();
  }, [cart, data]);

  return (
    <div className="success_container">
      <div className="success_wrapper">
        <motion.h5
          initial={{ x: "40vw", opacity: "0" }}
          animate={{ x: "0vw", opacity: "1" }}
          className="success"
        >
          Successful
        </motion.h5>
        <motion.p
          initial={{ x: "-40vw", opacity: "0" }}
          animate={{ x: "0vw", opacity: "1" }}
          className="success_des"
        >
          `Your order-id is <strong style={{ color: "blue" }}>{orderId}</strong>{" "}
          .You order is being prepared.Thanks for choosing ours.`
        </motion.p>
        <motion.div
          initial={{ y: "-40vw", opacity: "0" }}
          animate={{ y: "0vw", opacity: "1" }}
        >
          <Link to="/">Go To Home Page</Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Success;
