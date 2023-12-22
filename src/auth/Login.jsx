import "./login.css";
import ErrorLoadingShow from "../hooks/ErrorLoadingShow";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState();
  const [success, setSuccess] = useState(false);

  const clickHandler = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "https://mern-shopping-backend-server.vercel.app/api/v1/users/login",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      const resData = await res.json();

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
        setData(resData);
        setTimeout(() => {
          setSuccess(false);
        }, 2000);

        localStorage.setItem("current_user", JSON.stringify(resData));
        navigate(0);
      }
    } catch (err) {}
  };

  return (
    <>
      <ErrorLoadingShow
        loading={loading}
        error={error}
        loadingMsg="Logging in Please Wait..."
        success={success}
        errMsg={errMsg}
      />
      <div className="auth_container">
        <div className="auth_wrapper">
          <h5 className="auth_title">Login</h5>
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
            <button className="auth_input_btn" onClick={clickHandler}>
              Login
            </button>

            <Link
              to="/forgotpassword"
              style={{ color: "white", cursor: "pointer" }}
            >
              Forgot Password
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
