import "./userProfile.css";
import UserPanel from "./UserPanel";
import { useContext, useState, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const currentUser = useContext(AuthContext).current_user.otherDetail;

  const imgRef = useRef();

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [fileUpload, setFileUpload] = useState(currentUser.photo);

  const form = new FormData();
  form.append("photo", fileUpload);
  form.append("name", name);
  form.append("email", email);

  const clickHandler = async () => {
    const res = await fetch(
      "https://mern-shopping-backend-server.vercel.app/api/v1/users/updateme",
      {
        method: "PATCH",
        credentials: "include",
        headers: { "Access-Control-Allow-Origin": "*" },
        body: form,
      }
    );

    const resData = await res.json();

    if (res.ok) {
      localStorage.setItem("current_user", JSON.stringify(resData));
      navigate(0);
    }
  };

  return (
    <div className="profileInfo_container">
      <div className="profileInfo_wrapper">
        <UserPanel />
        <div className="profilePassword_right">
          <h5 className="profilePassword_title">Profile Management</h5>
          <div className="profilePassword_form">
            <div className="profilePassword_input_box">
              <img
                src={`https://mern-shopping-backend-server.vercel.app/${currentUser.photo}`}
                alt=""
                className="profile_pic"
                onClick={() => {
                  imgRef.current.click();
                }}
              />
              <input
                type="file"
                className="img_input"
                style={{ display: "none" }}
                ref={imgRef}
                onChange={(e) => {
                  setFileUpload(e.target.files[0]);
                }}
              />
            </div>

            <div className="profilePassword_input_box">
              <label htmlFor="" className="profilePassword_input_label">
                Name
              </label>
              <input
                type="text"
                className="profilePassword_input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="profilePassword_input_box">
              <label htmlFor="" className="profilePassword_input_label">
                Email
              </label>
              <input
                type="text"
                className="profilePassword_input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              className="profilePassword_input_btn"
              onClick={clickHandler}
            >
              Change
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
