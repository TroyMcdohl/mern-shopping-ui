import React from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ErrorLoadingShow from "../hooks/ErrorLoadingShow";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState();
  const [success, setSuccess] = useState(false);

  const token = useParams().token;

  const clickHandler = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://mern-shopping-backend-server.vercel.app/api/v1/users/resetpassword/${token}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            newPassword: password,
            confirmPassword: confirmPassword,
          }),
        }
      );

      const resData = await res.json();

      console.log(resData);

      if (!res.ok) {
        setError(true);
        setErrMsg(resData.message);
        setLoading(false);
        setTimeout(() => {
          setError(false);
        }, 2000);
      }

      if (res.ok) {
        setSuccess(true);
        setLoading(false);

        setTimeout(() => {
          setSuccess(false);
        }, 2000);
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <ErrorLoadingShow
        loading={loading}
        error={error}
        success={success}
        errMsg={errMsg}
      />
      <div className="auth_container">
        <div className="auth_wrapper">
          <h5 className="auth_title">Forgot Password</h5>
          <div className="auth_form">
            <div className="auth_input_box">
              <label htmlFor="" className="auth_input_label">
                New Password
              </label>
              <input
                type="password"
                className="auth_input"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="auth_input_box">
              <label htmlFor="" className="auth_input_label">
                Confirm Password
              </label>
              <input
                type="password"
                className="auth_input"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button className="auth_input_btn" onClick={clickHandler}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
