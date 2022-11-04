import React, { useState } from "react";
import { faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./UserPage.module.css";
import { useDispatch } from "react-redux";
import { userLogout } from "../../../features/userSlice";
const UserPage = () => {
  const [show, setShow] = useState("false");

  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(userLogout());
  };
  return (
    <>
      <div className={styles.user_logo} onClick={() => setShow(!show)}>
        <FontAwesomeIcon icon={faUser} />
      </div>
      <div className={styles.auth_modal} xs={3}>
        <div className={styles.modal_header}>
          <span>Ваш аккаунт</span>
          <button className={styles.btn_close} onClick={handleLogOut}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <div className={styles.modal_body}></div>
        <div className={styles.modal_footer}></div>
      </div>
    </>
  );
};

export default UserPage;
