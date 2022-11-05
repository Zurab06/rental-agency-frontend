import React, { useEffect } from "react";
import ImmovablesCard from "./ImmovablesCard";
import styles from "./Immovables.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import { immovablesFetch } from "./../../features/immovablesSlice";
import {
  faMoneyCheckDollar,
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";

const ImmovablesCards = () => {
  const immovables = useSelector((state) => state.immovables.immovablesList);
  const loading = useSelector((state) => state.immovables.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(immovablesFetch());
  }, [dispatch]);

  function filter(filter) {
    dispatch(immovablesFetch(filter));
  }

  if (loading) {
    return "загрузка";
  }

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
            <button className={styles.favoritesUser}>
              <i className="ri-bookmark-fill"></i>
            </button>
          </div>
        </div>
      </div>
      <div className={styles.cards} key={4}>
        {immovables.map((item) => {
          return <ImmovablesCard {...item} key={item._id} />;
        })}
      </div>
    </div>
  );
};

export default ImmovablesCards;
