import { Link, useNavigate } from "react-router-dom";
import "./userPanel.css";

const UserProfile = () => {
  const navigate = useNavigate();
  const clickHandler = async () => {
    try {
      const res = await fetch(
        "https://mern-shopping-backend-server.vercel.app/api/v1/users/logout",
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-type": "application/json" },
        }
      );

      const resData = await res.json();

      if (res.ok) {
        navigate(0);
        localStorage.removeItem("current_user");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="profileInfo_left">
      <h4 className="profileInfo_title">User Info And Detail</h4>
      <ul className="profileInfo_facts">
        <li className="profileInfo_fact">
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to="/userprofile"
          >
            User Information
          </Link>
        </li>
        <li className="profileInfo_fact">
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to="/userpassword"
          >
            User Password
          </Link>
        </li>
        <li className="profileInfo_fact" onClick={clickHandler}>
          Logout
        </li>
      </ul>
    </div>
  );
};

export default UserProfile;
