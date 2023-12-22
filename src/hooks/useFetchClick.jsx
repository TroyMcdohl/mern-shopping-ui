import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const useFetchClick = (body, url, method, navigator, headers) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState();
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const clickHandler = async () => {
    try {
      setLoading(true);
      const res = await fetch(url, {
        method: method,
        credentials: "include",
        headers: headers || { "Content-type": "application/json" },
        body: body,
      });

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
        navigate(navigator);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return { clickHandler, data, loading, error, errMsg, success };
};

export default useFetchClick;
