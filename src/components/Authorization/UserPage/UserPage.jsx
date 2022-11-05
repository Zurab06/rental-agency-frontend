import React, { useState } from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./UserPage.module.css";
import { useDispatch } from "react-redux";
import { userLogout } from "../../../features/userSlice";
const UserPage = () => {
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(userLogout());
  };
  return (
    <>
      <div className={styles.user_logo} onClick={() => setShow(!show)}>
        <FontAwesomeIcon icon={faUser} />
      </div>
      {show && (
        <div className={styles.modal_background}>
          <div className={styles.user_modal}>
            <div className={styles.user_header}>
              <h2>PROFILE</h2>
            </div>
            <div className={styles.user_body}>
              <div className={styles.info_user}>
                <span>Full name </span>
                <span>Full name </span>
              </div>
              <div className={styles.info_order}>
                <span>your order: </span>
                <span>Full name </span>
              </div>
            </div>
            <div className={styles.user_footer}>
              <span onClick={handleLogOut}>Log out</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserPage;
