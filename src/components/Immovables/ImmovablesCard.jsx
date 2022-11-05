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

const ImmovablesCard = (props) => {
  return (
    <div className={styles.card} key={props._id}>
      <div className={styles.image}>
        <img
          src={`http://localhost:3001/${props.image[0]}`}
          alt=""
        />
      </div>
      <div className={styles.card_text}>
        <span className={styles.link}>{props.name}</span>
        <span>${props.price}</span>
      </div>
      <div className={styles.icons}>
        <div>
          <FontAwesomeIcon icon={faBed} /> <span>{props.options.Baths}</span>
        </div>
        <div>
          <FontAwesomeIcon icon={faCar} /> <span>{props.options.Garage}</span>
        </div>
        <div>
          <FontAwesomeIcon icon={faBath} /> <span>{props.options.Beds}</span>
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




