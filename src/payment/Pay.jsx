import "./success.css";
import { useState, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";

const Pay = () => {
  const [stripeToken, setStripeToken] = useState(null);

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://mern-shopping-backend-server.vercel.app/api/v1/checkout/payment",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            tokenId: stripeToken.id,
            amount: 2000,
          }),
        }
      );
      if (!res.ok) {
        console.log(await res.json());
      }
    };
    stripeToken && fetchData();
  }, [stripeToken]);

  return (
    <div className="success_container">
      <div className="success_wrapper">
        <StripeCheckout
          name="Mern Shopping"
          billingAddress
          shippingAddress
          description="Your total is $30"
          amount={2000}
          token={onToken}
          stripeKey="pk_test_51LE8tVAZh3YUC37Z95ucw8TE0SGkVPaXfqD0ix8BAldHdOVBH8WuchPE5zNqiD4oEXdlOQhqKT7STiA8mMFypmWm00ozPk8cxt"
        />
      </div>
    </div>
  );
};

export default Pay;
