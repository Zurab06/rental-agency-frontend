import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styles from "./Signin.module.css";
import { faUserPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { signInUser } from "../../../features/userSlice";

const Signin = ({ SetAuthStatus, show, setShow }) => {
  const [nickname, setNickname] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const HandleReset = () => {
    setNickname("");
    setLogin("");
    setPassword("");
  };

  const HandleSubmit = () => {
    dispatch(signInUser({ login, password, nickname }));
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
        <div className={styles.auth_modal} xs={3}>
          <div className={styles.modal_header}>
            <span>Войдите в аккаунт</span>
            <button className={styles.btn_close} onClick={() => setShow(!show)}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
          <div className={styles.modal_body}>
            <div className={styles.inp_auth}>
              <input
                placeholder="Login"
                onChange={(e) => setLogin(e.target.value)}
                value={login}
              ></input>
            </div>
            <div className={styles.inp_auth}>
              <input
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              ></input>
            </div>
          </div>
          <div className={styles.modal_footer}>
            <button className={styles.btn_reset} onClick={HandleReset}>
              reset
            </button>
            <button className={styles.btn_submit} onClick={HandleSubmit}>
              Sign in
            </button>
          </div>
          <div
            className={styles.singUp}
            onClick={() => {
              SetAuthStatus(true);
            }}
          >
            Registration
          </div>
        </div>
      )}
    </>
  );
};

export default Signin;
