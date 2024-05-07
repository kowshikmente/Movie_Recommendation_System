import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toastWarnNotify } from "../helpers/ToastNotify";

const IMG_API = "https://image.tmdb.org/t/p/w1280";
const defaultImage =
  "https://images.unsplash.com/photo-1581905764498-f1b60bae941a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80";

const MovieCard = ({ title, poster_path, overview, vote_average, id }) => {
  const { currentUser } = useContext(AuthContext);
  const [ratings, setRatings] = useState([]);
  const [reviews, setReviews] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    // Fetch ratings and reviews data from an API or use hardcoded data
    // For demonstration, I'll assume hardcoded data
    const dummyRatings = [5, 4, 3, 4.5, 5]; // Example ratings
    const dummyReviews = [
      { critic: "Critic 1", stars: 4 },
      { critic: "Critic 2", stars: 3.5 },
      { critic: "Critic 3", stars: 5 },
    ]; // Example reviews
    setRatings(dummyRatings);
    setReviews(dummyReviews);
  }, []);

  const StarRating = ({ stars }) => {
    const totalStars = 5;
    const filledStars = Math.round(stars * 2) / 2;
    const starIcons = [];

    for (let i = 0; i < totalStars; i++) {
      if (i < filledStars) {
        starIcons.push(<span key={i} className="star filled">&#9733;</span>);
      } else {
        starIcons.push(<span key={i} className="star">&#9733;</span>);
      }
    }

    return <div>{starIcons}</div>;
  };

  return (
    <div
      className="movie"
      onClick={
        () =>
          currentUser
            ? navigate("details/" + id)
            : toastWarnNotify("Please log in to see details")
      }
    >
      <img src={poster_path ? IMG_API + poster_path : defaultImage} alt="" />
      <div className="d-flex align-items-baseline justify-content-between p-1 text-white">
        <h5>{title}</h5>
        {currentUser && (
          <span
            className={`tag ${
              vote_average >= 8 ? "green" : vote_average >= 6 ? "orange" : "red"
            }`}
          >
            {vote_average}
          </span>
        )}
      </div>
      <div className="movie-ratings">
        <h2>Ratings</h2>
        <div className="ratings-graph">
          {ratings.map((rating, index) => (
            <div key={index} className="bar" style={{ height: `${rating * 20}%` }}></div>
          ))}
        </div>
      </div>
      <div className="movie-reviews">
        <h2>Reviews</h2>
        <div className="reviews-list">
          {reviews.map((review, index) => (
            <div key={index} className="review">
              <p>{review.critic}</p>
              <StarRating stars={review.stars} />
            </div>
          ))}
        </div>
      </div>
      <div className="movie-over">
        <h2>Overview</h2>
        <p>{overview}</p>
      </div>
    </div>
  );
};

export default MovieCard;
