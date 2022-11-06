import React, { useEffect, useState } from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./UserPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getInfoAboutUser, userLogout } from "../../../features/userSlice";
const UserPage = () => {
  const [show, setShow] = useState(false);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(userLogout());
  };

  useEffect(() => {
    dispatch(getInfoAboutUser());
  }, [dispatch]);

  // const userInfo = () => {
  // dispatch(getInfoUser());
  // };

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
                <span>{user.nickname}</span>
              </div>
              <div className={styles.info_order}>
                <span>your order: </span>
                <span>{user.order.name} </span>
                <button> {user.order._id} </button>
              </div>
            </div>
            <div className={styles.user_footer}>
              <span onClick={handleLogOut}>Log out</span>
              <span onClick={() => setShow(false)}>close</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserPage;
