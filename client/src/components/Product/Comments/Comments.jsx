import { useProduct } from "../../../context/Shop/Products/ProductsContext";
import "./Comments.css";

const Comments = () => {
  const { productReviews } = useProduct();
  console.log(productReviews);

  return (
    <>
      <section className="comments_section">
        {productReviews.length !== 0 ? (
          productReviews.map((review) => {
            if (!review.comment) return;
            return (
              <div className="user_comment-container">
                <h4 className="username">{review.username}</h4>
                <p className="user_comment">{review.comment}</p>
              </div>
            );
          })
        ) : (
          <p>No comments!</p>
        )}
      </section>
    </>
  );
};

export default Comments;
