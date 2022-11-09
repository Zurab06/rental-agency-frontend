import React, { useEffect, useState } from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./UserPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getInfoAboutUser,
  removeOrder,
  userLogout,
} from "../../../features/userSlice";
import { Link } from "react-router-dom";
import { faBed, faCar, faCat, faBath } from "@fortawesome/free-solid-svg-icons";
import {
  fetchImmovablesById,
  immovablesFetch,
} from "../../../features/immovablesSlice";
const UserPage = () => {
  const [show, setShow] = useState(false);
  const user = useSelector((state) => state.user);
  const immovables = useSelector((state) => state.immovables);

  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(userLogout());
  };

  useEffect(() => {
    dispatch(getInfoAboutUser());
  }, [dispatch]);

  if (user.loading && immovables.loading) {
    return "";
  }
  const handleRemoveOrder = (id) => {
    dispatch(removeOrder(id));
    dispatch(getInfoAboutUser());
    dispatch(fetchImmovablesById(id));
    dispatch(immovablesFetch());
  };
  const handleShow = (id) => {
    dispatch(getInfoAboutUser());
    setShow(!show);
    if (typeof id !== "string") {
      dispatch(fetchImmovablesById(id._id));
    }
  };
  return (
    <>
      <div className={styles.user_logo} onClick={() => handleShow(user.order)}>
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
                <img
                  src="https://www.meme-arsenal.com/memes/29fc6b5c40ed07718cc2f8e58b375296.jpg"
                  alt="ты"
                  style={{
                    width: "6.5rem",
                    height: "6.5rem",
                    borderRadius: "1rem",
                    background: "black",
                    padding: "0.1rem",
                  }}
                ></img>
                <span
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <b>Welcome to our team,{user.nickname}.</b>
                  We look forward to productive cooperation!
                </span>
              </div>
              <div className={styles.info_order}>
                <span className={styles.info_title}>YOUR ORDER: </span>
                {user.order !== null && typeof user.order !== "string" && (
                  <>
                    <div className={styles.show_info}>
                      <img
                        src={`http://localhost:3001/${immovables.immovablesById.image[0]}`}
                        style={{
                          width: "8rem",
                          height: "6rem",
                          borderRadius: "1rem",
                        }}
                        alt=""
                      ></img>
                      <div className={styles.info_more}>
                        <div className={styles.order_name}>
                          <div>name:</div>
                          <div>{user.order.name}</div>
                        </div>
                        <div className={styles.order_options}>
                          <div>options: </div>
                          <div className={styles.icons}>
                            <div>
                              <FontAwesomeIcon icon={faBed} />{" "}
                              <span>{user.order.options.Baths}</span>
                            </div>
                            <div>
                              <FontAwesomeIcon icon={faCar} />{" "}
                              <span>{user.order.options.Garage}</span>
                            </div>
                            <div>
                              <FontAwesomeIcon icon={faBath} />{" "}
                              <span>{user.order.options.Beds}</span>
                            </div>
                            <div>
                              <FontAwesomeIcon icon={faCat} /> <span>Yes</span>
                            </div>
                          </div>
                        </div>
                        <div className={styles.order_name}>
                          <div>date:</div>
                          <div>
                            {user.orderDate.start +
                              "    to   " +
                              user.orderDate.end}
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className={styles.btn_info}>
                      <Link
                        to={`/immovables/${user.order._id}`}
                        onClick={() => setShow(false)}
                      >
                        details...
                      </Link>
                    </button>
                    <button
                      className={styles.btn_info}
                      onClick={() => handleRemoveOrder(user.order._id)}
                    >
                      Remove order
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className={styles.user_footer}>
              <span onClick={() => setShow(false)}>close</span>
              <span onClick={handleLogOut}>Log out</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserPage;
