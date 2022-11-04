import React, { useState } from "react";
import Signin from "../Singin/Signin";
import Signup from "../singup/Signup";

const Status = () => {
  const [authStatus, SetAuthStatus] = useState(true);
  const [show, setShow] = useState(false);
  return authStatus ? (
    <Signup setShow={setShow} SetAuthStatus={SetAuthStatus} show={show} />
  ) : (
    <Signin setShow={setShow} SetAuthStatus={SetAuthStatus} show={show} />
  );
};

export default Status;
