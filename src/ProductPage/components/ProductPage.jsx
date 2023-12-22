import "./productPage.css";
import { HomeCard } from "../../HomePage/components/HomeDisplay";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useFetchGet from "../../hooks/useFetchGet";

const ProductPage = (props) => {
  const location = useLocation();

  const { data, loading, error, errMsg, success } = useFetchGet(
    `https://mern-shopping-backend-server.vercel.app/api/v1/products`
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const queryHandler = (e) => {
    props.queryValue(e.target.id);
  };

  const querySelectHandler = (e) => {
    props.sortValueChange(e.target.value);
  };

  return (
    <div className="productpage_container">
      <div className="p_detail_caption_box">
        <h5 className="p_detail_caption_box_title">Shop</h5>
        <div className="p_detail_caption_box_des">
          <h6 className="p_detail_caption_box_home">MERN Shop -</h6>
          <div className="p_detail_caption_box_main_title">Shopping</div>
        </div>
      </div>

      <div className="productpage_wrapper">
        <div className="productpage_left">
          <ul className="productpage_left_items">
            <h4 className="productpage_left_item">Categories</h4>
            <li
              className="productpage_left_item"
              id="all"
              onClick={queryHandler}
            >
              All({data && data.allProducts.length})
            </li>

            <li
              className="productpage_left_item"
              id="dress"
              onClick={queryHandler}
            >
              Dress(
              {data &&
                data.allProducts.filter((p) => p.kind === "dress").length}
              )
            </li>
            <li
              className="productpage_left_item"
              id="jacket"
              onClick={queryHandler}
            >
              Jacket(
              {data &&
                data.allProducts.filter((p) => p.kind === "jacket").length}
              )
            </li>
            <li
              className="productpage_left_item"
              id="shirt"
              onClick={queryHandler}
            >
              T-Shirt(
              {data &&
                data.allProducts.filter((p) => p.kind === "shirt").length}
              )
            </li>
            <li
              className="productpage_left_item"
              id="sport-shirt"
              onClick={queryHandler}
            >
              Sport-Shirt(
              {data &&
                data.allProducts.filter((p) => p.kind === "sport-shirt").length}
              )
            </li>
          </ul>
        </div>
        <div className="productpage_right">
          <div className="productpage_right_caption">
            <h6 className="productpage_right_des">Show All Results</h6>
            <div className="productpage_right_filter">
              <select
                name=""
                id=""
                className="productpage_right_select"
                onChange={querySelectHandler}
              >
                <option value="price" className="productpage_right_option">
                  low price
                </option>
                <option value="-price" className="productpage_right_option">
                  hight price
                </option>
              </select>
            </div>
          </div>
          <div className="productpage_right_card">
            {props.products &&
              props.products.allProducts.map((p) => (
                <HomeCard
                  images={p.images}
                  key={p._id}
                  id={p._id}
                  price={p.price}
                  name={p.name}
                  color={p.color}
                  size={p.size}
                  tagName={p.tagname}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
