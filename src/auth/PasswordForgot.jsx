import "./passwordForgot.css";
import "./login.css";
import ErrorLoadingShow from "../hooks/ErrorLoadingShow";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PasswordForgot = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState();
  const [success, setSuccess] = useState(false);

  const clickHandler = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "https://mern-shopping-backend-server.vercel.app/api/v1/users/forgotpassword",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            email: email,
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

        navigate("/verify", {
          state: {
            email: resData.email,
          },
        });
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
                Email
              </label>
              <input
                type="text"
                className="auth_input"
                onChange={(e) => setEmail(e.target.value)}
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

export default PasswordForgot;
