import React from "react";
import styles from "./Immovables.module.css";
import {
  faBed,
  faCar,
  faCat,
  faBath,
} from "@fortawesome/free-solid-svg-icons";
import 'remixicon/fonts/remixicon.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ImmovablesCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <img
          src="https://homepress.stylemixthemes.com/wp-content/uploads/2019/03/townhome-12-1399x899.jpg"
          alt=""
        />
      </div>
      <div className={styles.card_text}>
        <span className={styles.link}>House on the Arcadia</span>
        <span>$1,200/mo</span>
      </div>
      <div className={styles.icons}>
        <div>
          <FontAwesomeIcon icon={faBed} /> <span>1</span>
        </div>
        <div>
          <FontAwesomeIcon icon={faCar} /> <span>2</span>
        </div>
        <div>
          <FontAwesomeIcon icon={faBath} /> <span>1</span>
        </div>
        <div>
          <FontAwesomeIcon icon={faCat} /> <span>Yes</span>
        </div>
      </div>
      <div className={styles.button}>
        <div>
          <button className={styles.favorites}>
            <i className='ri-bookmark-fill'>
            Favorites
            </i>
          </button>
        </div>
        <div>
          <button className={styles.more}>More...</button>
        </div>
      </div>
    </div>
  );
};

export default ImmovablesCard;
