import { useEffect, useState, useRef, useContext } from "react";
import { useLocation } from "react-router-dom";
import "./productDetailPage.css";

import StarRateIcon from "@mui/icons-material/StarRate";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import useFetchGet from "../../hooks/useFetchGet";
import { useParams, useNavigate } from "react-router-dom";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { NavContext } from "../../context/NavContext";
import { AuthContext } from "../../context/AuthContext";

const ProductDetail = (props) => {
  const [drawerAdditional, setDrawerAdditional] = useState(false);
  const [drawerReview, setDrawerReview] = useState(false);
  const [changeImg, setChangeImg] = useState();
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [reviewDelSuccess, setReviewDelSuccess] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [errMsgReview, setErrMsgReview] = useState();
  const [errReview, setErrReview] = useState(false);
  const [avgReview, setAvgReview] = useState();
  const [cartLoading, setCartLoading] = useState(false);
  const [cartSuccess, setCartSuccess] = useState(false);
  const [cartErr, setCartErr] = useState(false);
  const [cartErrData, setCartErrData] = useState();

  const currentUser = useContext(AuthContext).current_user;

  const navigate = useNavigate();

  const other = useContext(NavContext).toggleHandler;

  const location = useLocation();
  const pid = useParams().pid;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const ratingRef = useRef();
  const reviewRef = useRef();

  const { data, loading, error, errMsg, success } = useFetchGet(
    `https://mern-shopping-backend-server.vercel.app/api/v1/products/${pid}/review`,
    reviewSuccess,
    reviewDelSuccess
  );

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://mern-shopping-backend-server.vercel.app/api/v1/reviews/productavg`,
        {
          credentials: "include",
        }
      );

      const resData = await res.json();

      const avgReviewOneProduct =
        resData && resData.filter((avgr) => avgr._id === pid);

      setAvgReview(avgReviewOneProduct[0]);
    };
    fetchData();
  }, [reviewSuccess, reviewDelSuccess, pid]);

  const addToCartHandler = async () => {
    setCartLoading(true);
    const res = await fetch(
      `https://mern-shopping-backend-server.vercel.app/api/v1/products/${props.product.product.id}/cart`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          productId: props.product.product._id,
          productName: props.product.product.name,
          productImg: props.product.product.images[0],
          productPrice: props.product.product.price,
          quantity: props.product.product.quantity,
          total: props.product.product.price,
        }),
      }
    );

    const resData = await res.json();

    if (res.ok) {
      other((prev) => !prev);
      setCartLoading(false);
      setCartSuccess(true);
      setTimeout(() => {
        setCartSuccess(false);
      }, 2000);
    }
    if (!res.ok) {
      setCartLoading(false);
      setCartErr(true);
      setTimeout(() => {
        setCartErr(false);
      }, 2000);
      setCartErrData(resData.message);
    }
  };

  return (
    <>
      <div className="p_detail_container">
        {props.product && (
          <div className="p_detail_wrapper">
            <div className="p_detail_caption_box">
              <h5 className="p_detail_caption_box_title">Shop</h5>
              <div className="p_detail_caption_box_des">
                <h6 className="p_detail_caption_box_home">MERN Shop -</h6>
                <div className="p_detail_caption_box_main_title">
                  {props.product.product.name}
                </div>
              </div>
            </div>
            <div className="p_detail_box">
              {cartSuccess && (
                <div className="add_to_cart_success_box">
                  <div className="add_to_cart_success">
                    Add to Cart Successfully
                  </div>
                </div>
              )}
              {cartErr && (
                <div className="add_to_cart_success_box">
                  <div
                    className="add_to_cart_success"
                    style={{ backgroundColor: "red" }}
                  >
                    {cartErrData}
                  </div>
                </div>
              )}
              <div className="p_detail_box_left">
                <div className="p_detail_box_img_container">
                  <div className="p_detail_box_img_container_top">
                    <img
                      src={
                        changeImg
                          ? changeImg
                          : `https://mern-shopping-backend-server.vercel.app/${props.product.product.images[0]}`
                      }
                      alt=""
                      className="p_deatil_box_img_container_top_img"
                    />
                  </div>
                  <div className="p_detail_box_img_container_bot">
                    {props.product.product.images.map((pimg) => (
                      <img
                        src={`https://mern-shopping-backend-server.vercel.app/${pimg}`}
                        alt=""
                        className="p_detail_box_img_container_bot_img"
                        onClick={(e) => {
                          setChangeImg(e.target.src);
                        }}
                        key={pimg}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="p_detail_box_right">
                <div className="p_detail_box_des_container">
                  <h4 className="p_detail_box_des_container_title">
                    {props.product.product.name}
                  </h4>
                  <p className="p_detail_box_des_container_title">
                    $ {props.product.product.price}
                  </p>
                  <p className="p_detail_box_des_container_para">
                    {props.product.product.des}
                  </p>

                  {currentUser ? (
                    <button
                      style={{
                        border: "none",
                        padding: "5px",
                        backgroundColor: "blue",
                        color: "white",
                        cursor: "pointer",
                        borderRadius: "10%",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        margin: "5px",
                        alignItems: "center",
                      }}
                      className="p_detail_box_des_container_para"
                      onClick={addToCartHandler}
                    >
                      Add To Cart
                    </button>
                  ) : (
                    <button
                      style={{
                        border: "none",
                        padding: "5px",
                        backgroundColor: "blue",
                        color: "white",
                        cursor: "pointer",
                        borderRadius: "10px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      className="p_detail_box_des_container_para"
                      onClick={() => navigate("/login")}
                    >
                      Add To Cart
                    </button>
                  )}

                  <div className="p_detail_box_des_container_drawer_box">
                    {drawerAdditional ? (
                      <div
                        className="p_detail_drawer_symbol"
                        onClick={() => setDrawerAdditional(false)}
                      >
                        -
                      </div>
                    ) : (
                      <div
                        className="p_detail_drawer_symbol"
                        onClick={() => setDrawerAdditional(true)}
                      >
                        +
                      </div>
                    )}

                    <div className="p_detail_drawer_des">
                      Additional Information
                    </div>
                  </div>
                  <table
                    className={
                      !drawerAdditional
                        ? "p_detail_drawer_container"
                        : "p_detail_drawer_container active"
                    }
                  >
                    <tbody style={{ width: "100%", margin: "auto" }}>
                      <tr>
                        <th>Size</th>
                        <td>{props.product.product.size}</td>
                      </tr>
                      <tr>
                        <th>Color</th>
                        <td>{props.product.product.color}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="p_detail_box_des_container_drawer_box">
                    {drawerReview ? (
                      <div
                        className="p_detail_drawer_symbol"
                        onClick={() => setDrawerReview(false)}
                      >
                        -
                      </div>
                    ) : (
                      <div
                        className="p_detail_drawer_symbol"
                        onClick={() => setDrawerReview(true)}
                      >
                        +
                      </div>
                    )}

                    <div className="p_detail_drawer_des">Review</div>
                  </div>
                  <div
                    className={
                      !drawerReview
                        ? "p_detail_drawer_review_container"
                        : "p_detail_drawer_review_container active"
                    }
                  >
                    <div className="review_form_wrapper">
                      <h4 className="avg_review">
                        Average Review :
                        <span
                          style={{
                            backgroundColor: "green",
                            color: "white",
                            padding: "5px",
                            borderRadius: "5px",
                            margin: "5px",
                          }}
                        >
                          {avgReview ? avgReview.averageReview : "0"}
                        </span>
                      </h4>
                      {errReview && (
                        <div
                          style={{
                            zIndex: "9999",
                            padding: "10px",
                            fontSize: "15px",
                            backgroundColor: "red",
                            color: "white",
                            borderRadius: "10px",
                          }}
                        >
                          !!!{errMsgReview}
                        </div>
                      )}
                      <div className="all_reviews">
                        <Swiper
                          spaceBetween={50}
                          slidesPerView={1}
                          onSlideChange={() => {}}
                          onSwiper={(swiper) => {}}
                        >
                          {data && data.reviews.length > 0 ? (
                            data.reviews.map((r) => (
                              <SwiperSlide key={r._id}>
                                <div className="one_review">
                                  {data.onereview.length > 0 &&
                                    data.onereview[0]._id === r._id && (
                                      <div
                                        style={{
                                          position: "absolute",
                                          top: "0",
                                          right: "0",
                                          cursor: "pointer",
                                        }}
                                        onClick={async () => {
                                          const res = await fetch(
                                            `https://mern-shopping-backend-server.vercel.app/api/v1/reviews/${data.onereview[0]._id}`,
                                            {
                                              method: "DELETE",
                                              credentials: "include",
                                            }
                                          );

                                          if (!res.ok) {
                                            console.log(await res.json());
                                          }
                                          if (res.ok) {
                                            setReviewDelSuccess(
                                              (prev) => !prev
                                            );
                                          }
                                        }}
                                      >
                                        <CancelOutlinedIcon />
                                      </div>
                                    )}
                                  <div className="one_review_top">
                                    <img
                                      src={`https://mern-shopping-backend-server.vercel.app/${r.user.photo}`}
                                      alt=""
                                      className="one_review_img"
                                    />
                                    <h5 className="one_review_name">
                                      {r.user.name}
                                    </h5>
                                  </div>
                                  <div className="one_review_bot">
                                    <div className="one_review_rate">
                                      {r.rating === 1 && (
                                        <>
                                          <StarRateIcon />
                                        </>
                                      )}
                                      {r.rating === 2 && (
                                        <>
                                          <StarRateIcon />
                                          <StarRateIcon />
                                        </>
                                      )}
                                      {r.rating === 3 && (
                                        <>
                                          <StarRateIcon />
                                          <StarRateIcon />
                                          <StarRateIcon />
                                        </>
                                      )}
                                      {r.rating === 4 && (
                                        <>
                                          <StarRateIcon />
                                          <StarRateIcon />
                                          <StarRateIcon />
                                          <StarRateIcon />
                                        </>
                                      )}
                                      {r.rating === 5 && (
                                        <>
                                          <StarRateIcon />
                                          <StarRateIcon />
                                          <StarRateIcon />
                                          <StarRateIcon />
                                          <StarRateIcon />
                                        </>
                                      )}
                                    </div>
                                    <h6 className="one_review_des">
                                      {r.review}
                                    </h6>
                                  </div>
                                </div>
                              </SwiperSlide>
                            ))
                          ) : (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",

                                height: "30vh",
                              }}
                            >
                              No reviews found
                            </div>
                          )}
                        </Swiper>
                      </div>

                      <div className="review_form_input_box">
                        <label htmlFor="" className="review_form_label">
                          Ratings
                        </label>
                        <select
                          name=""
                          id=""
                          className="review_choose"
                          ref={ratingRef}
                        >
                          <option value="1" className="review_number">
                            1
                          </option>
                          <option value="2" className="review_number">
                            2
                          </option>
                          <option value="3" className="review_number">
                            3
                          </option>
                          <option value="4" className="review_number">
                            4
                          </option>
                          <option value="5" className="review_number">
                            5
                          </option>
                        </select>
                      </div>
                      <div className="review_form_input_box">
                        <label htmlFor="" className="review_form_label">
                          Your Review
                        </label>
                        <textarea
                          type="text"
                          className="review_form_input"
                          ref={reviewRef}
                          placeholder="text your though here"
                        />
                      </div>
                      {currentUser ? (
                        <button
                          className="review_btn"
                          onClick={async () => {
                            const res = await fetch(
                              `https://mern-shopping-backend-server.vercel.app/api/v1/products/${props.product.product._id}/review/`,
                              {
                                method: "POST",
                                credentials: "include",
                                headers: { "Content-type": "application/json" },
                                body: JSON.stringify({
                                  rating: ratingRef.current.value,
                                  review: reviewRef.current.value,
                                }),
                              }
                            );

                            const resData = await res.json();

                            if (!res.ok) {
                              setErrMsgReview(resData.message);
                              setErrReview(true);
                              setTimeout(() => {
                                setErrReview(false);
                              }, 3000);
                            }
                            if (res.ok) {
                              setReviewSuccess((prev) => !prev);
                            }

                            ratingRef.current.value = 1;
                            reviewRef.current.value = "";
                          }}
                        >
                          Submit
                        </button>
                      ) : (
                        <button
                          className="review_btn"
                          onClick={() => navigate("/login")}
                        >
                          Submit
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetail;
