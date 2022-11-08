import React from "react";
import styles from "./ImmovablesPage.module.css";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faCar,
  faCat,
  faBath,
  faAngleRight,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchImmovablesById } from "../../features/immovablesSlice";
import { useParams } from "react-router-dom";
import Lottie from "lottie-react";
import loader from "../animation/loader.json";
import { useState } from "react";
import { getInfoAboutUser, getOrder } from "../../features/userSlice";

const ImmovablesPage = () => {
  const dispatch = useDispatch();
  const [img, setImg] = useState(0);
  const id = useParams().id;
  const loading = useSelector((state) => state.immovables.loading);
  const immovablesById = useSelector(
    (state) => state.immovables.immovablesById
  );
  const location = useSelector(
    (state) => state.immovables.immovablesById.location
  );
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchImmovablesById(id));
    dispatch(getInfoAboutUser());
  }, [dispatch, id]);

  const changeImage = (type) => {
    if (type === "dec") {
      if (img === 0) {
        const newImg = immovablesById.image.length;
        setImg(newImg - 1);
      } else {
        setImg(img - 1);
      }
    }
    if (type === "inc") {
      if (img === immovablesById.image.length - 1) {
        setImg(0);
      } else {
        setImg(img + 1);
      }
    }
  };

  const handleOrder = (id) => {
    if (!!!user.order) {
      dispatch(getOrder(id));
      dispatch(fetchImmovablesById(id));
      dispatch(getInfoAboutUser());
    }
    dispatch(fetchImmovablesById(id));
    dispatch(getInfoAboutUser());
  };

  if (loading) {
    return (
      <div className={styles.main}>
        <Lottie animationData={loader} style={{ margin: "auto" }} />
      </div>
    );
  }

  return (
    <div className={styles.main}>
      <>
        <div className={styles.Carousel}>
          <div
            className={styles.icon}
            onClick={() => {
              changeImage("dec");
            }}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </div>
          <img
            src={`http://localhost:3001/${immovablesById.image[img]}`}
            alt=""
            className={styles.image}
          ></img>
          <div
            className={styles.icon}
            onClick={() => {
              changeImage("inc");
            }}
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </div>
        </div>
        <div className={styles.header}>
          <div className={styles.name_price}>
            <h5>{immovablesById.name}</h5>
            <h5>${immovablesById.price}/w</h5>
          </div>
          <div className={styles.icons}>
            <div>
              <div>
                <FontAwesomeIcon icon={faBed} />
                <span>{immovablesById.options.Baths}</span>
              </div>
              <div>
                <FontAwesomeIcon icon={faCar} />
                <span>{immovablesById.options.Garage}</span>
              </div>
              <div>
                <FontAwesomeIcon icon={faBath} />
                <span>{immovablesById.options.Beds}</span>
              </div>
              <div>
                <FontAwesomeIcon icon={faCat} /> <span>Yes</span>
              </div>
            </div>
            <button
              className={styles.rent}
              onClick={() => handleOrder(id)}
              disabled={immovablesById.isOwner || user.order ? true : ""}
            >
              {immovablesById.isOwner || user.order
                ? "Already in order"
                : "Rent"}
            </button>
          </div>
        </div>
        <div className={styles.description}>
          <h3>Description</h3>
          <h6 className={styles.text}>
            Years seed fruit you. Divided morning sea day Set earth. Grass
            without cattle. Spirit heaven. Also i grass give fowl wherein cattle
            spirit whales rule cattle. Earth fowl given own youre, fruit so.
            Shall was. Called firmament dry fruitful, set place. Earth given
            female man fruit, under thing may to greater moveth land sea, great
            be shall living greater and signs place night after whose us one,
            youll second our set had day in greater divided over female first
            face, fill form
          </h6>
        </div>
        <div className={styles.location}>
          <div className={styles.place}>
            <h3>Location</h3>
          </div>
          <div className={styles.yandex_map}>
            <YMaps>
              <div>
                <Map
                  defaultState={{
                    center: location.split(","),
                    zoom: 5,
                  }}
                  width={"100%"}
                  height={"50vh"}
                >
                  <Placemark geometry={location.split(",")} />
                </Map>
              </div>
            </YMaps>
          </div>
        </div>
      </>
    </div>
  );
};

export default ImmovablesPage;
