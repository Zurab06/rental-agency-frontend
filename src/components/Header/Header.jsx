import React from "react";
import styles from "./Header.module.css";
import logo from "../images/Logo_black.png";
import Authorization from "../Authorization/Authorization";

const Header = () => {
  return (
    <div className={styles.main}>
      <div className={styles.logo_bar}>
        <img src={logo} alt="" className={styles.logo}></img>
      </div>
      <div className={styles.center}></div>
      <div className={styles.signin}>
        <Authorization />
      </div>
    </div>
  );
};

export default Header;
