import React from "react";
import "./errorLoadingShow.css";

const useErrorLoadingShow = (props) => {
  return (
    <>
      {props.loading && (
        <div className="loading_box">
          <h5 className="loading_title">
            {props.loadingMsg ? props.loadingMsg : "loading..."}
          </h5>
        </div>
      )}
      {props.error && (
        <div className="error_box">
          <h5 className="error_title">{props.errMsg}</h5>
        </div>
      )}
      {props.success && (
        <div className="success_box">
          <h5 className="success_title">Successfully</h5>
        </div>
      )}
      {props.children}
    </>
  );
};

export default useErrorLoadingShow;
