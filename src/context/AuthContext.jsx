import React from "react";

export const AuthContext = React.createContext({
  current_user: null,
});

export const AuthContextProvider = (props) => {
  return (
    <AuthContext.Provider
      value={{
        current_user: JSON.parse(localStorage.getItem("current_user")),
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
