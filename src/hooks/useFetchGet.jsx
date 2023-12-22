import React, { useState } from "react";
import { useEffect } from "react";

const useFetchGet = (url, change, anotherChange) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(url, {
          credentials: "include",
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
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [url, change, anotherChange]);

  return { data, loading, error, errMsg, success };
};

export default useFetchGet;
