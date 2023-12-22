import { Link } from "react-router-dom";
import "./drawer.css";

const Drawer = (props) => {
  return (
    <div className="drawer_container">
      <ul className="drawer_items">
        <li
          className="drawer_item"
          onClick={() => {
            props.drawerClose(false);
          }}
        >
          <Link style={{ textDecoration: "none", color: "white" }} to="/">
            Home
          </Link>
        </li>
        <li
          className="drawer_item"
          onClick={() => {
            props.drawerClose(false);
          }}
        >
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to="/products"
          >
            Shop
          </Link>
        </li>
        <li
          className="drawer_item"
          onClick={() => {
            props.drawerClose(false);
          }}
        >
          About
        </li>
      </ul>
    </div>
  );
};

export default Drawer;
