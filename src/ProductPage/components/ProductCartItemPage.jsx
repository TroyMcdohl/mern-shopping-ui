import { NavContext } from "../../context/NavContext";
import { useState, useContext } from "react";

const ProductCartItemPage = (props) => {
  const other = useContext(NavContext).toggleHandler;

  const [quantity, setQuantity] = useState(props.quantity);
  const [cartUpdate, setCartUpdate] = useState(false);

  const updateBtnHandler = async () => {
    const res = await fetch(
      `https://mern-shopping-backend-server.vercel.app/api/v1/carts/${props.id}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          total: `${props.productPrice}` * `${quantity}`,
          quantity: quantity,
        }),
      }
    );
    if (res.ok) {
      setCartUpdate(true);
      setTimeout(() => {
        setCartUpdate(false);
      }, 2000);
      props.setCartChange((prev) => !prev);
    }
  };

  const removeBtnHandler = async () => {
    const res = await fetch(
      `https://mern-shopping-backend-server.vercel.app/api/v1/carts/${props.id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    if (res.ok) {
      props.setCartChange((prev) => !prev);
      other((prev) => !prev);
    }
    if (!res.ok) {
      console.log(await res.json());
    }
  };

  return (
    <>
      {cartUpdate && (
        <div className="addToCart_update_box">
          <div className="addToCart_update"> Cart updated</div>
        </div>
      )}

      <tr className="productcart_item" style={{ height: "15vh" }}>
        <td className="productcart_data">
          <img
            src={`http://localhost:8000/${props.productImg}`}
            alt=""
            className="productcart_item_img"
          />
        </td>
        <td>{props.productName}</td>
        <td>${props.productPrice}</td>

        <td>
          <button
            className="p_detail_box_des_container_cart_minus"
            onClick={() => setQuantity(quantity === 1 ? 1 : quantity - 1)}
          >
            -
          </button>
          <h5 className="cart_quantity">{quantity}</h5>
          <button
            className="p_detail_box_des_container_cart_plus"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </button>
        </td>
        <td>${props.total}</td>
        <td>
          <button className="table_btn_update" onClick={updateBtnHandler}>
            Update
          </button>
        </td>
        <td>
          <button className="table_btn" onClick={removeBtnHandler}>
            Remove
          </button>
        </td>
      </tr>
    </>
  );
};

export default ProductCartItemPage;
