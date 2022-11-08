import React from "react";
import styles from "./Header.module.css";
import logo from "../images/Logo_black.png";
import Authorization from "../Authorization/Authorization";
import Lottie from "lottie-react";
import forest from "../animation/forest.json";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className={styles.main}>
      <Link to="/" className={styles.logo_bar}>
        <img src={logo} alt="" className={styles.logo}></img>
      </Link>
      <div className={styles.center}>
        <Lottie
          animationData={forest}
          style={{ width: "20%", height: "7.5vh" }}
        />
        <Lottie
          animationData={forest}
          style={{ width: "20%", height: "7.5vh" }}
        />
        <Lottie
          animationData={forest}
          style={{ width: "20%", height: "7.5vh" }}
        />
      </div>
      <div className={styles.signin}>
        <Authorization />
      </div>
    </div>
  );
};

export default Header;
