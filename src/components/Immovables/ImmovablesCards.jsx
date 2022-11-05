import React, { useEffect } from "react";
import ImmovablesCard from "./ImmovablesCard";
import styles from "./Immovables.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector,  useDispatch  } from 'react-redux';
import { immovablesFetch } from './../../features/immovablesSlice';
import {  faMoneyCheckDollar,
  faArrowUp,
  faArrowDown,
  faBed,
} from "@fortawesome/free-solid-svg-icons";

const ImmovablesCards = () => {
  const Immovables = useSelector(state=>state.immovables)
  const loading = useSelector(state=>state.loading)
  const dispatch = useDispatch()
  useEffect(()=> {
dispatch(immovablesFetch())
  }, [dispatch])
  if(loading) {
return 'загрузка'
  }
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
