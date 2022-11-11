import React from "react";
import styles from "./Comment.module.css";
import { Rating } from "@mui/material";
const Comment = () => {
  return (
    <div className={styles.main}>
      <div className={styles.item1}>
        <div>
          <div className={styles.maincont}>
            User <Rating defaultValue={5} readOnly precision={0.5} />
          </div>
          <div>very good site, i aprecciate to developers</div>
        </div>
      </div>
      <div className={styles.item1}>
        <div>
          <div className={styles.maincont}>
            User <Rating defaultValue={5} readOnly precision={0.5} />
          </div>
          <div>very good site, i aprecciate to developers</div>
        </div>
      </div>
      <div className={styles.item1}>
        <div>
          <div className={styles.maincont}>
            User <Rating defaultValue={5} readOnly precision={0.5} />
          </div>
          <div>very good site, i aprecciate to developers</div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
