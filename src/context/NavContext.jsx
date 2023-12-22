import React from "react";
import { useState } from "react";

export const NavContext = React.createContext({
  navCartChange: false,
});

export const NavContextProvider = (props) => {
  const [toggle, setToggle] = useState(false);

  const toggleHandler = () => setToggle((prev) => !prev);

  return (
    <NavContext.Provider value={{ toggleHandler, toggle }}>
      {props.children}
    </NavContext.Provider>
  );
};

export default NavContext;
