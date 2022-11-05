import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styles from "./Signin.module.css";
import {
  faUserPlus,
  faKey,
  faFont,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { signInUser } from "../../../features/userSlice";

const Signin = ({ SetAuthStatus, show, setShow }) => {
  const [nickname, setNickname] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const HandleSubmit = () => {
    dispatch(signInUser({ login, password, nickname }));
    setShow(false);
    setLogin("");
    setPassword("");
    setNickname("");
  };

  return (
    <>
      <div className={styles.user_logo} onClick={() => setShow(!show)}>
        <FontAwesomeIcon icon={faUserPlus} />
      </div>
      {show && (
        <div className={styles.modal_background}>
          <div className={styles.auth_modal}>
            <div className={styles.auth_header}>
              <button className={styles.btn_auth_active}>Login</button>
              <button
                className={styles.btn_auth}
                onClick={() => {
                  SetAuthStatus(true);
                }}
              >
                Registration
              </button>
            </div>
            <div className={styles.auth_body}>
              <div className={styles.inputs}>
                <FontAwesomeIcon icon={faFont} style={{ color: "grey" }} />
                <input
                  type="text"
                  placeholder="login"
                  value={login}
                  onChange={(e) => setLogin(e.target.value.split(" ").join(""))}
                ></input>
              </div>
              <div className={styles.inputs}>
                <FontAwesomeIcon icon={faKey} style={{ color: "grey" }} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  onChange={(e) =>
                    setPassword(e.target.value.split(" ").join(""))
                  }
                  value={password}
                ></input>
                <FontAwesomeIcon
                  icon={showPassword ? faEye : faEyeSlash}
                  style={{ color: "grey", margin: "auto" }}
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
            </div>
            <div className={styles.auth_footer}>
              <button onClick={HandleSubmit}>Sing in</button>
              <span onClick={() => setShow(!show)}>close</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Signin;
