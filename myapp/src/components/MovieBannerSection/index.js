import "./index.css";

const MovieBannerSection = (props) => {
  const { movieDetails } = props;
  const {
    title,
    rating,
    releaseData,
    poster,
    banner,
    overview,
    runtime,
    genres,
  } = movieDetails;

  return (
    <div className="banner-container">
      <img
        className="banner"
        src={`https://image.tmdb.org/t/p/w500${banner}`}
        alt="banner"
      />
      <div className="poster-overview-container">
        <div className="movie-poster-container">
          <img
            className="movie-poster"
            src={`https://image.tmdb.org/t/p/w500${poster}`}
            alt="poster"
          />
          <div className="movie-desc-container">
            <h1 className="movie-title">{title}</h1>
            <p className="movie-rating">
              Rating : <span className="movie-rating-count">{rating}</span>
            </p>
            <div className="runtime-container">
              <p className="runtime">{runtime} min</p>
              <ul className="genres-container">
                {genres.map((eachGenre) => (
                  <li className="genre" key={eachGenre.id}>
                    {eachGenre.name}
                  </li>
                ))}
              </ul>
            </div>
            <p className="release-date-text">
              Released Date :{" "}
              <span className="release-date">{releaseData}</span>
            </p>
          </div>
        </div>
        <div className="overview-container">
          <h1 className="overview-heading">Overview</h1>
          <p className="overview-text">{overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieBannerSection;
