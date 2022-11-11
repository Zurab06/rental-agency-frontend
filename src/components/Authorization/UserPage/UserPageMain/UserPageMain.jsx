import React from "react";
import styles from "./UserPageMain.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getInfoAboutUser, userLogout } from "../../../../features/userSlice";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import {
  fetchUserOffer,
  removeUserOffer,
} from "../../../../features/offerSlice";

const UserPageMain = () => {
  const user = useSelector((state) => state.user);
  const immovables = useSelector((state) => state.immovables);
  const offer = useSelector((state) => state.offer);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInfoAboutUser());
    dispatch(fetchUserOffer());
  }, [dispatch]);

  const handleLogOut = () => {
    dispatch(userLogout());
  };
  getInfoAboutUser();
  const handleRemoveOrder = (id) => {
    dispatch(removeUserOffer(id));
  };

  if (!!user.loading && offer.loading && immovables.loading) {
    return "";
  }
  const confirmed = offer.offerList.filter((item) => item.isСonfirm);
  const unconfirmed = offer.offerList.filter((item) => !item.isСonfirm);

  return (
    <div className={styles.main}>
      <div className={styles.user_info}>
        <div className={styles.user_card}>
          <div className={styles.user_header}>
            <div className={styles.user_avatar}>
              <img
                src={
                  user.image
                    ? ` ${user.image}`
                    : "data:image/jpeg;base64,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"
                }
                alt=""
              />
              <input type="file" className={styles.btn_avatar}></input>
            </div>
            <div className={styles.user_name}>
              <h5>
                <b>Welcome, {user.nickname}!</b>
              </h5>
              <h6 style={{ marginTop: "1rem" }}>We look forward </h6>
              <h6>to productive cooperation.</h6>
              <div className={styles.user_footer}>
                <Link
                  to="/"
                  onClick={handleLogOut}
                  style={{ textDecoration: "none" }}
                >
                  Log out {`:(`}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.order_info}>
        <div className={styles.comfirmed}>
          <div className={styles.comfirmed_header}>
            <h3>Confirmed orders</h3>
          </div>
          <div className={styles.comfirmed_body}>
            <div className={styles.body_info_header}>
              <div>name</div>
              <div>date</div>
              <div>page</div>
              <div>action</div>
            </div>
            {confirmed.map((item) => {
              return (
                <div className={styles.body_order_info} key={item._id}>
                  <div className={styles.name}>{item._immovablesId.name}</div>
                  <div className={styles.date}>
                    <div>{item.start}</div>
                    <div>to</div>
                    <div>{item.end}</div>
                  </div>
                  <div className={styles.link}>
                    <Link to={`/immovables/${item._immovablesId._id}`}>
                      Link
                    </Link>
                  </div>

                  <div className={styles.action}>
                    <button
                      style={{ margin: "auto", border: "none" }}
                      onClick={() => handleRemoveOrder(item._id)}
                    >
                      remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.comfirmed_footer}></div>
        </div>
        <div className={styles.uncomfirmed}>
          <div className={styles.comfirmed_header}>
            <h3>Unconfirmed orders</h3>
          </div>
          <div className={styles.body_info_header}>
            <div>name</div>
            <div>date</div>
            <div>page</div>
            <div>action</div>
          </div>
          {unconfirmed.map((item) => {
            return (
              <div className={styles.body_order_info} key={item._id}>
                <div className={styles.name}>{item._immovablesId.name}</div>
                <div className={styles.date}>
                  <div>{item.start}</div>
                  <div>to</div>
                  <div>{item.end}</div>
                </div>
                <div className={styles.link}>
                  <Link to={`/immovables/${item._immovablesId._id}`}>Link</Link>
                </div>

                <div className={styles.action}>
                  <button style={{ margin: "auto", border: "none" }}>
                    <Link to={`/user/payment/${item._id}`}>confirm</Link>
                  </button>
                  <button
                    style={{ margin: "auto", border: "none" }}
                    onClick={() => handleRemoveOrder(item._id)}
                  >
                    remove
                  </button>
                </div>
              </div>
            );
          })}
          <div className={styles.comfirmed_footer}></div>
        </div>
      </div>
    </div>
  );
};

export default UserPageMain;
