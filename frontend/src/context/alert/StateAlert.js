
import React, { useState } from "react";
import alertcontext from "./alertContext";

const AlertState = (props) => {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({ msg: message, type });

    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  return (
    <alertcontext.Provider value={{ alert, showAlert }}>
      {props.children}
    </alertcontext.Provider>
  );
};

export default AlertState;
