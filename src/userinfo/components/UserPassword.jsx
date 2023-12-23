import "./userPassword.css";
import UserPanel from "./UserPanel";
import useFetchClick from "../../hooks/useFetchClick";
import { useState } from "react";

const UserPassword = () => {
  const [oldPwd, setOldPwd] = useState();
  const [newPwd, setNewPwd] = useState();
  const [confirmPwd, setConfirmPwd] = useState();

  const { clickHandler, errMsg, data } = useFetchClick(
    JSON.stringify({
      oldPassword: oldPwd,
      newPassword: newPwd,
      confirmPassword: confirmPwd,
    }),
    "https://mern-shopping-backend-server.vercel.app/api/v1/users/updatepassword",
    "PATCH",
    "/"
  );

  return (
    <div className="profileInfo_container">
      <div className="profileInfo_wrapper">
        <UserPanel />
        <div className="profilePassword_right">
          <h5 className="profilePassword_title">Password Management</h5>
          <div className="profilePassword_form">
            <div className="profilePassword_input_box">
              <label htmlFor="" className="profilePassword_input_label">
                Old Password
              </label>
              <input
                type="password"
                className="profilePassword_input"
                onChange={(e) => setOldPwd(e.target.value)}
              />
            </div>

            <div className="profilePassword_input_box">
              <label htmlFor="" className="profilePassword_input_label">
                New Password
              </label>
              <input
                type="password"
                className="profilePassword_input"
                onChange={(e) => setNewPwd(e.target.value)}
              />
            </div>

            <div className="profilePassword_input_box">
              <label htmlFor="" className="profilePassword_input_label">
                Confirm Password
              </label>
              <input
                type="password"
                className="profilePassword_input"
                onChange={(e) => setConfirmPwd(e.target.value)}
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

export default UserPassword;
