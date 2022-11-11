import { addReview, getComments } from "../../features/commentSlice";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import React from "react";
import styles from "./Comments.module.css";
import { useEffect } from "react";
import Lottie from "lottie-react";
import loader from "../animation/loader.json";
const Comments = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getComments());
  }, [dispatch]);
  const { id } = useParams();

  const commentList = useSelector((state) =>
    state.comments.comments.filter((item) => item.reviewToPost._id === id)
  );
  const token = useSelector((state) => state.user.token);
  const loading = useSelector((state) => state.comments.loading);
  // Для input
  const [review, setReview] = useState("");

  // Для input-а звезд
  const [star, setStars] = useState(5);

  // if (!commentList) {
  //   return "Loading";
  // }

  // if (loading) {
  //   return "";
  // }

  const handleReview = (e) => {
    setReview(e.target.value);
  };

  const handleAddReview = () => {
    dispatch(addReview({ review, star, id }));
    dispatch(getComments());
    setReview("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2
            style={{
              margin: "auto",
              width: "fit-content",
              marginBottom: "1rem",
            }}
          >
            Reviews
          </h2>
        </div>
        <div className={styles.starsAndInputReview}>
          <div className={styles.inputAndButton}>
            <input
              className={styles.inputReview}
              id="outlined-basic"
              label="Отзыв"
              value={review}
              onChange={handleReview}
              placeholder="Tap here your review"
            />
            <button
              className={styles.button}
              variant="contained"
              onClick={handleAddReview}
              disabled={review && !!token ? "" : true}
            >
              Add
            </button>
          </div>
          <div>
            <span>Tap a star to rate </span>
            <Stack spacing={1}>
              <Rating
                precision={0.5}
                onChange={(event) => setStars(event.target.value)}
              />
            </Stack>
          </div>
        </div>
      </div>
      <div className={styles.commentList}>
        {loading ? (
          <Lottie
            animationData={loader}
            style={{ margin: "auto", width: "50vh", height: "50vh" }}
          />
        ) : (
          commentList.map((el) => {
            return (
              <div key={el._id}>
                <div className={styles.comment}>
                  {el.text}
                  <Rating
                    name="rating"
                    precision={0.5}
                    readOnly
                    value={el.stars}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Comments;
