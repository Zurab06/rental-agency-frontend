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
import { Link, useParams } from "react-router-dom";
import Lottie from "lottie-react";
import loader from "../animation/loader.json";
import { useState } from "react";
import { getInfoAboutUser } from "../../features/userSlice";
import Comments from "../Comments/Comments";
import moment from "moment/moment";
import {
  addUserOffer,
  fetchAllOffer,
  fetchLastOffer,
  fetchUserOffer,
} from "../../features/offerSlice";

const ImmovablesPage = () => {
  const id = useParams().id;
  const tomorrow = moment().add(1, "days").format(`YYYY-MM-DD`);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const loading = useSelector((state) => state.immovables.loading);
  const needDate = useSelector((state) => state.offer.lastDate);
  const offerLoading = useSelector((state) => state.offer.loading);
  const immovablesById = useSelector(
    (state) => state.immovables.immovablesById
  );
  const location = useSelector(
    (state) => state.immovables.immovablesById.location
  );
  const [img, setImg] = useState(0);

  const [startDate, setStartDate] = useState(tomorrow);
  const [endDate, setEndDate] = useState(
    moment(startDate).add(1, "days").format(`YYYY-MM-DD`)
  );
  useEffect(() => {
    dispatch(fetchImmovablesById(id));
    dispatch(getInfoAboutUser());
    dispatch(fetchUserOffer());
    dispatch(fetchAllOffer());
    dispatch(fetchLastOffer(id));
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
  if (loading || offerLoading || !needDate) {
    return (
      <div className={styles.main}>
        <Lottie animationData={loader} style={{ margin: "auto" }} />
      </div>
    );
  }

  const handleOrder = (start = startDate, end = endDate) => {
    dispatch(addUserOffer({ start, end, id }));
    dispatch(fetchUserOffer());
  };
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
            <div className={styles.date}>
              {!!needDate && (
                <>
                  <input
                    type="date"
                    min={needDate}
                    value={startDate}
                    onChange={(e) => {
                      setStartDate(e.target.value);
                      setEndDate(
                        moment(e.target.value)
                          .add(1, "days")
                          .format(`YYYY-MM-DD`)
                      );
                    }}
                  ></input>
                  <input
                    type="date"
                    min={moment(startDate).add(1, "days").format(`YYYY-MM-DD`)}
                    value={endDate}
                    onChange={(e) => {
                      setEndDate(e.target.value);
                    }}
                  ></input>
                </>
              )}

              <button
                onClick={() => handleOrder()}
                disabled={user.token ? "" : true}
              >
                {user.token ? (
                  <Link
                    to="/user/main"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    claim order
                  </Link>
                ) : (
                  "user must be registered"
                )}
              </button>
            </div>
          </div>
        </div>
        <div className={styles.description}>
          <h3>Description</h3>
          <h6 className={styles.text}>{immovablesById.description}</h6>
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
      <Comments />
    </div>
  );
};

export default ImmovablesPage;
