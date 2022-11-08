import React from "react";
import styles from "./ImmovablesPage.module.css";
import Comments from '../Comments/Comments'
const ImmovablesPage = () => {
  return (
    <div className={styles.main}>
      <img
        src="https://media.tenor.com/NZqiUoAnAFsAAAAC/cat-computer.gif"
        alt="я джифка"
      />
      <div>Ассадин и Зураб активно работают над этой страницей..</div>
      <div>или нет...</div>
      <div>конечно нет, я на коментах. и вообще я собираюсь стать гэнгста рэпероми жить улице, damn  this shit </div>
      <Comments/>
    </div>
  );
};

export default ImmovablesPage;
