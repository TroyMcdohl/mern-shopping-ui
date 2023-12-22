import "./navbar.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useEffect, useState, useContext } from "react";
import Drawer from "./Drawer";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { NavContext } from "../context/NavContext";
import useFetchGet from "../hooks/useFetchGet";

const Navbar = () => {
  const currentUser = useContext(AuthContext).current_user;
  const navNumber = useContext(NavContext).toggle;

  const { data, loading, error, errMsg, success } = useFetchGet(
    "https://mern-shopping-backend-server.vercel.app/api/v1/carts",
    navNumber
  );

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const [navDrawer, setNavDrawer] = useState(false);

  const navDrawerHandler = () => {
    setNavDrawer((prev) => !prev);
  };

  return (
    <>
      {navDrawer && <Drawer drawerClose={setNavDrawer} />}
      <div className={navDrawer ? "nav_container active" : "nav_container"}>
        <div className="nav_wrapper">
          <div className="nav_left">
            <h4 className="nav_left_title">M-Shopping</h4>
          </div>
          {/* <div className="nav_center">
            <ul className="nav_center_items active">
              <li className="nav_center_item">Home</li>
              <li className="nav_center_item">Shop</li>
              <li className="nav_center_item">About</li>
            </ul>
          </div> */}
          <div className="nav_right">
            {currentUser && currentUser.otherDetail ? (
              <>
                <div className="nav_right_cart_icon">
                  {currentUser.otherDetail.role === "admin" && (
                    <div
                      className="toAdmin"
                      onClick={() => {
                        window.location.href =
                          "https://mern-shopping-adminpanel.herokuapp.com";
                      }}
                    >
                      Admin DashBoard
                    </div>
                  )}
                </div>
                <div className="nav_right_cart_icon">
                  <Link
                    to="/cart"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    <ShoppingCartOutlinedIcon />
                  </Link>
                  <span className="nav_right_cart_quantity">
                    {data && data.carts.length}
                  </span>
                </div>
                <div className="nav_right_profile_img">
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/userprofile"
                  >
                    <img
                      src={`http://localhost:8000/${currentUser.otherDetail.photo}`}
                      alt=""
                      className="nav_right_profile_photo"
                    />
                  </Link>

                  <Link
                    style={{
                      textDecoration: "none",
                      color: "white",
                    }}
                    to="/userpanel"
                  >
                    <img
                      src={`http://localhost:8000/${currentUser.otherDetail.photo}`}
                      alt=""
                      className="nav_right_profile_photo_responsive"
                    />
                  </Link>
                </div>
                <div className="nav_right_humburgur_bar">
                  <div
                    className={
                      navDrawer ? "nav_humburger active" : "nav_humburger"
                    }
                    onClick={navDrawerHandler}
                  >
                    <span className="nav_line"></span>
                    <span className="nav_line"></span>
                    <span className="nav_line"></span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  className="unauth_item"
                  to="/signup"
                >
                  Signup
                </Link>
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  className="unauth_item"
                  to="/login"
                >
                  Login
                </Link>
                <div className="nav_right_humburgur_bar">
                  <div
                    className={
                      navDrawer ? "nav_humburger active" : "nav_humburger"
                    }
                    onClick={navDrawerHandler}
                  >
                    <span className="nav_line"></span>
                    <span className="nav_line"></span>
                    <span className="nav_line"></span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
