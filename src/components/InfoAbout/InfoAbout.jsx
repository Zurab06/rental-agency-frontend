import styles from "./InfoAbout.module.css";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InfoAbout = () => {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.Content}>
          <h1>CRUD AGENCY</h1>
          <h3>
            We provide holiday property rental services.
            <br />
            CRUD is the best choise you can have.
          </h3>
          <h6>
            Ахч дез. <FontAwesomeIcon icon={faHouse} />
          </h6>
        </div>
      </div>
    </>
  );
};

export default InfoAbout;
