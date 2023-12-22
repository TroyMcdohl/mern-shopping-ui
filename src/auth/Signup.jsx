import "./signup.css";
import ErrorLoadingShow from "../hooks/ErrorLoadingShow";
import useFetchClick from "../hooks/useFetchClick";
import { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const { clickHandler, data, loading, error, errMsg, success } = useFetchClick(
    JSON.stringify({
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    }),
    "https://mern-shopping-backend-server.vercel.app/api/v1/users/signup",
    "POST",
    "/login"
  );

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
          <h5 className="auth_title">Signup</h5>
          <div className="auth_signup_form">
            <div className="auth_input_box">
              <label htmlFor="" className="auth_input_label">
                Name
              </label>
              <input
                type="text"
                className="auth_input"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="auth_input_box">
              <label htmlFor="" className="auth_input_label">
                Email
              </label>
              <input
                type="text"
                className="auth_input"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="auth_input_box">
              <label htmlFor="" className="auth_input_label">
                Password
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
              Signup
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
