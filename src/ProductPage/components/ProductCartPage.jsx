import { useState, useEffect, useContext } from "react";
import "./productCartPage.css";
import useFetchGet from "../../hooks/useFetchGet";
import { NavContext } from "../../context/NavContext";
import StripeCheckout from "react-stripe-checkout";
import { useNavigate } from "react-router-dom";
import ProductCartItemPage from "./ProductCartItemPage";

const ProductCartPage = () => {
  const navigate = useNavigate();
  const [cartChange, setCartChange] = useState(false);

  const { data, loading, error, errMsg, success } = useFetchGet(
    "https://mern-shopping-backend-server.vercel.app/api/v1/carts",
    cartChange
  );

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
            amount:
              data.carts
                .map((c) => c.total)
                .reduce(function (accumulator, currentValue) {
                  return accumulator + currentValue;
                }, 0) * 100,
          }),
        }
      );

      const resData = await res.json();

      if (res.ok) {
        navigate("/success", {
          state: { stripeData: resData, carts: data.carts },
        });
      }
    };
    stripeToken && fetchData();
  }, [stripeToken, data, navigate]);

  return (
    <div className="productcart_container">
      <div className="p_detail_caption_box">
        <h5 className="p_detail_caption_box_title">Cart</h5>
        <div className="p_detail_caption_box_des">
          <h6 className="p_detail_caption_box_home">MERN Shop -</h6>
          <div className="p_detail_caption_box_main_title">Cart</div>
        </div>
      </div>
      <div className="productcart_wrapper">
        <table className="productcart_items">
          <tbody className="productcart_items_body">
            {data && data.carts.length === 0 && (
              <div
                style={{
                  fontSize: "18px",
                  backgroundColor: "green",
                  color: "white",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                No carts Found
              </div>
            )}

            {data && data.carts.length != 0 && (
              <>
                <tr className="productcart_item" style={{ border: "none" }}>
                  <th></th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th></th>
                  <th></th>
                </tr>

                {data &&
                  data.carts.map((c) => (
                    <ProductCartItemPage
                      key={c._id}
                      productImg={c.productImg}
                      productName={c.productName}
                      productPrice={c.productPrice}
                      id={c._id}
                      quantity={c.quantity}
                      total={c.total}
                      setCartChange={setCartChange}
                    />
                  ))}
              </>
            )}
          </tbody>
        </table>
      </div>
      {data && data.carts.length != 0 && (
        <div className="productcart_payment">
          <div className="productcart_total_box">
            <h5 className="productcart_total_title">Total -</h5>
            <p className="productcart_total_price">
              $
              {data &&
                data.carts
                  .map((c) => c.total)
                  .reduce(function (accumulator, currentValue) {
                    return accumulator + currentValue;
                  }, 0)}
            </p>
          </div>
          <div className="productcart_total_btn_box">
            <StripeCheckout
              name="Mern Shopping"
              billingAddress
              shippingAddress
              amount={
                data &&
                data.carts
                  .map((c) => c.total)
                  .reduce(function (accumulator, currentValue) {
                    return accumulator + currentValue;
                  }, 0) * 100
              }
              token={onToken}
              stripeKey="pk_test_51LE8tVAZh3YUC37Z95ucw8TE0SGkVPaXfqD0ix8BAldHdOVBH8WuchPE5zNqiD4oEXdlOQhqKT7STiA8mMFypmWm00ozPk8cxt"
            >
              <button className="productcart_total_btn">Order</button>
            </StripeCheckout>
          </div>
        </div>
      )}
    </div>
  );
};

// const ProductCartItemPage = (props) => {
//   const [removeLoading, setRemoveLoading] = useState(false);
//   const other = useContext(NavContext).toggleHandler;

//   const [quantity, setQuantity] = useState(props.quantity);

//   return (
//     <tr className="productcart_item" style={{ height: "15vh" }}>
//       <td className="productcart_data">
//         <img
//           src={`http://localhost:8000/${props.productImg}`}
//           alt=""
//           className="productcart_item_img"
//         />
//       </td>
//       <td>{props.productName}</td>
//       <td>${props.productPrice}</td>

//       <td>
//         <button
//           className="p_detail_box_des_container_cart_minus"
//           onClick={() => setQuantity(quantity === 1 ? 1 : quantity - 1)}
//         >
//           -
//         </button>
//         <h5 className="cart_quantity">{quantity}</h5>
//         <button
//           className="p_detail_box_des_container_cart_plus"
//           onClick={() => setQuantity(quantity + 1)}
//         >
//           +
//         </button>
//       </td>
//       <td>${props.total}</td>
//       <td>
//         <button
//           className="table_btn_update"
//           onClick={async () => {
//             const res = await fetch(
//               `https://mern-shopping-backend-server.vercel.app/api/v1/carts/${props.id}`,
//               {
//                 method: "PATCH",
//                 credentials: "include",
//                 headers: { "Content-type": "application/json" },
//                 body: JSON.stringify({
//                   total: `${props.productPrice}` * `${quantity}`,
//                   quantity: quantity,
//                 }),
//               }
//             );
//             if (res.ok) {
//               props.setCartChange((prev) => !prev);
//             }
//           }}
//         >
//           Update
//         </button>
//       </td>
//       <td>
//         <button
//           className="table_btn"
//           style={{ cursor: removeLoading && "wait" }}
//           onClick={async () => {
//             setRemoveLoading(true);
//             const res = await fetch(
//               `https://mern-shopping-backend-server.vercel.app/api/v1/carts/${props.id}`,
//               {
//                 method: "DELETE",
//                 credentials: "include",
//               }
//             );
//             if (res.ok) {
//               props.setCartChange((prev) => !prev);
//               other((prev) => !prev);
//               setRemoveLoading(false);
//             }
//             if (!res.ok) {
//               setRemoveLoading(false);
//             }
//           }}
//         >
//           Remove
//         </button>
//       </td>
//     </tr>
//   );
// };

export default ProductCartPage;
