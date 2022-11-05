import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styles from "./SignUp.module.css";
import {
  faUserPlus,
  faKey,
  faFont,
  faEye,
  faEyeSlash,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../../../features/userSlice";

const Signup = ({ SetAuthStatus, show, setShow }) => {
  const [nickname, setNickname] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const singUp = useSelector((state) => state.user.signUp);
  console.log(singUp);
  const dispatch = useDispatch();

  const HandleSubmit = () => {
    dispatch(signUpUser({ login, password, nickname }));
    SetAuthStatus(false);
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
              <button
                className={styles.btn_auth}
                onClick={() => {
                  SetAuthStatus(false);
                }}
              >
                Login
              </button>
              <button
                className={styles.btn_auth_active}
                onClick={() => {
                  SetAuthStatus(true);
                }}
              >
                Registration
              </button>
            </div>
            <div className={styles.auth_body}>
              <div className={styles.inputs}>
                <FontAwesomeIcon icon={faPerson} style={{ color: "grey" }} />
                <input
                  type="text"
                  placeholder="Fullname"
                  autocomplete="off"
                  onChange={(e) => setNickname(e.target.value)}
                  value={nickname}
                ></input>
              </div>
              <div className={styles.inputs}>
                <FontAwesomeIcon icon={faFont} style={{ color: "grey" }} />
                <input
                  type="text"
                  placeholder="login"
                  autocomplete="off"
                  onChange={(e) => setLogin(e.target.value.split(" ").join(""))}
                  value={login}
                ></input>
              </div>
              <div className={styles.inputs}>
                <FontAwesomeIcon icon={faKey} style={{ color: "grey" }} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  autocomplete="off"
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
              <button onClick={HandleSubmit}>Sing up</button>
              <span onClick={() => setShow(!show)}>close</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;
