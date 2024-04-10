import { Link } from "react-router-dom";
import "./index.css";

const MovieCard = (props) => {
  const { movieDetails } = props;
  const { id, poster, title, rating } = movieDetails;
  return (
    <li className="movie-card">
      <Link className="nav" to={`/movie/${id}`}>
        <img
          className="poster"
          src={`https://image.tmdb.org/t/p/w500${poster}`}
          alt="poster"
        />
        <div className="title-container">
          <h1 className="title">{title}</h1>
          <p className="rating">Rating: <span className="rating-count">{rating}</span></p>
        </div>
      </Link>
    </li>
  );
};

export default MovieCard;
