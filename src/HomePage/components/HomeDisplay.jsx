import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./homeDisplay.css";
import { NavContext } from "../../context/NavContext";

const HomeDisplay = (props) => {
  return (
    <div className="homeDisplay_container">
      <div className="homeDisplay_wrapper">
        <h4 className="homeDisplay_title">Popular Fashion</h4>
        <div className="homeDisplay_card_wrapper">
          {props.data &&
            props.data.allProducts
              .slice(0, 6)
              .map((p) => (
                <HomeCard
                  images={p.images}
                  key={p._id}
                  id={p._id}
                  price={p.price}
                  name={p.name}
                  color={p.color}
                  size={p.size}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export const HomeCard = (props) => {
  const [touch, setTouch] = useState(false);
  const [cartProduct, setCartProduct] = useState();
  const [OK, setOK] = useState(false);
  const [addError, setAddError] = useState(false);
  const [errMsg, setErrMsg] = useState(false);
  const other = useContext(NavContext).toggleHandler;
  const [addLoading, setAddLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://mern-shopping-backend-server.vercel.app/api/v1/products/${props.id}/cart`,
        {
          credentials: "include",
        }
      );

      const resData = await res.json();

      if (res.ok) {
        const cartFind = resData.carts.map((c) => c.productId);

        setCartProduct(cartFind);
      }
    };
    fetchData();
  }, [props.id, OK]);

  return (
    <>
      {addError && (
        <div
          style={{
            position: "absolute",
            top: "60px",
            zIndex: "9999",
            padding: "10px",
            fontSize: "20px",
            backgroundColor: "red",
            color: "white",
            borderRadius: "10px",
          }}
        >
          {errMsg}
        </div>
      )}

      <div
        className="homeDisplay_card"
        onMouseEnter={() => setTouch(true)}
        onMouseLeave={() => setTouch(false)}
      >
        {!touch ? (
          <Link to={`/products/${props.id}`}>
            <img
              src={`https://https://mern-shopping-ui.vercel.app/${props.images[0]}`}
              alt=""
              className="homeDisplay_card_img"
            />
          </Link>
        ) : (
          <Link to={`/products/${props.id}`}>
            <img
              src={`https://mern-shopping-backend-server.vercel.app/${props.images[1]}`}
              alt=""
              className="homeDisplay_card_img_hover"
            />
          </Link>
        )}
        <h4
          className={
            !touch
              ? "homeDisplay_card_caption"
              : "homeDisplay_card_caption active"
          }
          style={{ cursor: addLoading && "wait" }}
          // onClick={async () => {
          //   setAddLoading(true);
          //   const res = await fetch(
          //     `https://mern-shopping-backend-server.vercel.app/api/v1/products/${props.id}/cart`,
          //     {
          //       method: "POST",
          //       credentials: "include",
          //       headers: { "Content-type": "application/json" },
          //       body: JSON.stringify({
          //         productId: props.id,
          //         productName: props.name,
          //         productImg: props.images[0],
          //         productPrice: props.price,
          //         quantity: props.quantity,
          //         total: props.price,
          //       }),
          //     }
          //   );

          //   const resData = await res.json();

          //   if (res.ok) {
          //     setOK(true);
          //     other((prev) => !prev);
          //     setAddLoading(false);
          //   }
          //   if (!res.ok) {
          //     setAddError(true);
          //     setErrMsg(resData.message);
          //     setTimeout(() => {
          //       setAddError(false);
          //     }, 3000);
          //     setAddLoading(false);
          //   }
          // }}
        >
          {props.tagName}
        </h4>
      </div>
    </>
  );
};

export default HomeDisplay;
