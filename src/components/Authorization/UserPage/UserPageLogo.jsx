import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./UserPage.module.css";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const UserPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {}, [dispatch]);

  return (
    <>
      <Link to="/user/main">
        <div className={styles.user_logo}>
          <FontAwesomeIcon icon={faUser} />
        </div>
      </Link>
    </>
  );
};

export default UserPage;
