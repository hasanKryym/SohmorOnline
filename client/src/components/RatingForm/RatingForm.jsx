import React, { useState } from "react";
import "./RatingForm.css";
import { useProduct } from "../../context/Shop/Products/ProductsContext";

const RatingForm = ({ closeRatingForm, productId }) => {
  const { userReview, setUserReview } = useProduct();
  const [rating, setRating] = useState(userReview.rating);
  const [comment, setComment] = useState(userReview.comment);
  const { addReview } = useProduct();

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!rating && !comment) return;

    if (productId) {
      const response = await addReview({ productId, rating, comment });
      if (response.success) {
        setUserReview({ rating, comment });
        closeRatingForm();
      }
    }
  };

  return (
    <>
      <div style={{ top: "20vh" }} className="blur-bg">
        <div className="rating-form-container">
          <h2>Rate this product</h2>
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((index) => (
              <span
                key={index}
                className={index <= rating ? "star-filled" : "star-empty"}
                onClick={() => handleRatingChange(index)}
              >
                &#9733;
              </span>
            ))}
          </div>
          <form onSubmit={handleSubmit}>
            <textarea
              className="comment-input"
              placeholder="Leave a comment..."
              value={comment}
              onChange={handleCommentChange}
            />
            <div className="buttons_container">
              <button className="custom-button" type="submit">
                Submit
              </button>
              <button
                className="secondary-button"
                onClick={() => closeRatingForm()}
                type="button"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RatingForm;
