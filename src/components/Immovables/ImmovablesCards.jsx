import React, { useEffect } from "react";
import ImmovablesCard from "./ImmovablesCard";
import styles from "./Immovables.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchFavorites,
  immovablesFetch,
} from "./../../features/immovablesSlice";
import Lottie from "lottie-react";
import loader from "../animation/loader.json";
import {
  faMoneyCheckDollar,
  faArrowUp,
  faArrowDown,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";

const ImmovablesCards = () => {
  const immovables = useSelector((state) => state.immovables.immovablesList);
  const loading = useSelector((state) => state.immovables.loading);
  const token = useSelector((state) => state.user.token);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(immovablesFetch());
  }, [dispatch]);

  function filter(filter) {
    dispatch(immovablesFetch(filter));
  }
  const loadFavorites = () => {
    dispatch(fetchFavorites());
  };

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h1>Real Estate Rental Offers</h1>
        <div className={styles.priceBeds}>
          <div className={styles.price}>
            <FontAwesomeIcon
              icon={faMoneyCheckDollar}
              style={{ height: "20px" }}
            />
            <button
              className={styles.priceButton}
              onClick={() => filter({ price: -1 })}
            >
              <FontAwesomeIcon icon={faArrowUp} />
            </button>
            <button
              className={styles.priceButton}
              onClick={() => filter({ price: 1 })}
            >
              <FontAwesomeIcon icon={faArrowDown} />
            </button>
          </div>
          <div className={styles.beds}>
            <button
              className={styles.favoritesUser}
              onClick={loadFavorites}
              disabled={token ? "" : true}
            >
              <i className="ri-bookmark-fill"></i>
            </button>
            <button className={styles.favoritesUser} onClick={() => filter()}>
              <FontAwesomeIcon icon={faRotateRight} />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.cards} key={4}>
        {loading ? (
          <Lottie
            animationData={loader}
            style={{ margin: "auto", marginBottom: "1rem" }}
          />
        ) : (
          immovables.map((item) => {
            return <ImmovablesCard {...item} key={item._id} token={token} />;
          })
        )}
      </div>
    </div>
  );
};

export default ImmovablesCards;
