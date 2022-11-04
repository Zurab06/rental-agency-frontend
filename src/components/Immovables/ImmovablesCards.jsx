import React from "react";
import ImmovablesCard from "./ImmovablesCard";
import styles from "./Immovables.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyCheckDollar,
  faArrowUp,
  faArrowDown,
  faBed,
} from "@fortawesome/free-solid-svg-icons";

const ImmovablesCards = () => {
  return (
    <main>
      <div className={styles.header}>
        <h1>Real Estate Rental Offers</h1>
        <div className={styles.priceBeds}>
          <div className={styles.price}>
            <FontAwesomeIcon
              icon={faMoneyCheckDollar}
              style={{ height: "20px" }}
            />
            <button className={styles.priceButton}>
              <FontAwesomeIcon icon={faArrowUp} />
            </button>
            <button className={styles.priceButton}>
              
              <FontAwesomeIcon icon={faArrowDown} />
            </button>
          </div>
          <div className={styles.beds}>
            <FontAwesomeIcon icon={faBed} />
            <button className={styles.priceButton}>
              <FontAwesomeIcon icon={faArrowUp} />
            </button>
            <button className={styles.priceButton}>
              
              <FontAwesomeIcon icon={faArrowDown} />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.cards}>
        <ImmovablesCard />
      </div>
    </main>
  );
};

export default ImmovablesCards;
