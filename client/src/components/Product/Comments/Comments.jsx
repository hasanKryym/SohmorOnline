import { useProduct } from "../../../context/Shop/Products/ProductsContext";
import "./Comments.css";
import { FaStar } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";

const Comments = () => {
  const { productReviews } = useProduct();

  return (
    <>
      <section className="comments_section">
        {productReviews.length !== 0 ? (
          productReviews.map((review) => {
            if (!review.comment) return;
            return (
              <div className="user_comment-container">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <h4
                    className="username"
                    style={{ display: "flex", gap: "0.5rem" }}
                  >
                    <span>
                      <FaRegUserCircle />
                    </span>
                    {review.username}{" "}
                    <span style={{ display: "flex", alignItems: "center" }}>
                      ({review.rating}{" "}
                      <FaStar style={{ color: "var(--vibrant-yellow)" }} />)
                    </span>
                  </h4>
                </div>
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
