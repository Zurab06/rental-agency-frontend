import { addReview, getComments } from "../../features/commentSlice";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import React from "react";
import styles from "./Comments.module.css";
import { useEffect } from "react";

const Comments = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getComments());
  }, []);
  const { id } = useParams();

  const loading = useSelector(state => state.comments.loading)

  const commentList = useSelector(state => state.comments.comments.filter(item => item.reviewToPost._id === id))
  // Для input
  const [review, setReview] = useState("");
  
  // Для input-а звезд
  const [star, setStars] = useState(5);
  
  // if(!commentList) {
  //   return 'Loading'
  // }

  // if(loading){
  //   return ''
  // }

  const handleReview = (e) => {
    setReview(e.target.value);
  };

  const handleAddReview = () => {
    dispatch(addReview({ review, star, id }));
    dispatch(getComments())
    setReview("");
  };

  return (
    <div className={styles.container}>
      <div>
        <h2>Reviews</h2>
      </div>
      {commentList.map((el) => {
        return (
        
          <div key={el._id}>
            <div className={styles.comment}>{el.text}
            <Rating
            name="rating"
            // defaultValue={rating}
            precision={0.5} readOnly
            value={el.stars}
          /></div>
            
          </div>
        );
      })}
      
      <div className={styles.starsAndInputReview}>
        <span>Tap a star to rate </span>
        <Stack spacing={1}>
          <Rating
            precision={0.5}
            onChange={(event) => setStars(event.target.value)}
          />
        </Stack>
        <span>Your review</span>
        <div className={styles.inputAndButton}>
          <input
            className={styles.inputReview}
            id="outlined-basic"
            label="Отзыв"
            value={review}
            onChange={handleReview}
          />
          <Button
            className={styles.button}
            variant="contained"
            onClick={handleAddReview}
            disabled={!review}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Comments;
