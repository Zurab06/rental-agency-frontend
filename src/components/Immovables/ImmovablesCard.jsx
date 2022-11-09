import React, { useEffect } from "react";
import styles from "./Immovables.module.css";
import { faBed, faCar, faCat, faBath } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "remixicon/fonts/remixicon.css";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite } from "../../features/userSlice";
import { Link } from "react-router-dom";
import { fetchImmovablesById } from "../../features/immovablesSlice";

const ImmovablesCard = (props) => {
  const favorites = useSelector((state) => state.user.favorites);
  const dispatch = useDispatch();
  function addUserFavorite(favorite) {
    dispatch(addFavorite(favorite));
  }
  const handleImmovablesById = (id) => {
    dispatch(fetchImmovablesById(id));
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(addFavorite());
    }
  }, [dispatch]);
  const isFavorite = favorites.includes(props._id);
  return (
    <div className={styles.card} key={props._id}>
      <div className={styles.image}>
        <img src={`http://localhost:3001/${props.image[0]}`} alt="" />
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
          <button
            className={isFavorite ? styles.isfavorites : styles.favorites}
            onClick={() => addUserFavorite(props._id)}
            disabled={props.token ? "" : true}
          >
            <i className="ri-bookmark-fill">Favorites</i>
          </button>
        </div>
        <div>
          <button
            className={styles.more}
            onClick={() => {
              handleImmovablesById(props._id);
            }}
          >
            <Link to={`/immovables/${props._id}`}>More...</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImmovablesCard;
