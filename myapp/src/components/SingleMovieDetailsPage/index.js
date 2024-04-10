import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import LoaderView from "../LoaderView";
import FailureView from "../FailureView";
import CastCard from '../CastCard'
import MovieBannerSection from "../MovieBannerSection";
import "./index.css";

const apiKey = "e2ab8a4105df7b69787b3a32979db5f9";

const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  failure: "FAILURE",
  success: "SUCCESS",
};

const SingleMovieDetailsPage = () => {
  const [movieDetails, setMovieDetails] = useState({});
  const [movieApiStatus, setMovieApiStatus] = useState(
    apiStatusConstants.initial
  );
  const [castDetails, setCastDetails] = useState([]);
  const [castApiStatus, setCastApiStatus] = useState(
    apiStatusConstants.initial
  );

  const { id } = useParams();

  const formatData = (obj) => ({
    id: obj.id,
    title: obj.original_title,
    rating: obj.vote_average,
    releaseData: obj.release_date,
    runtime: obj.runtime,
    overview: obj.overview,
    banner: obj.backdrop_path,
    poster: obj.poster_path,
    genres: obj.genres,
  });

  const getBannerDetails = async () => {
    setMovieApiStatus(apiStatusConstants.inProgress);
    const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`;
    const response = await fetch(apiUrl);
    if (response.ok) {
      const data = await response.json();
      const updatedData = formatData(data);
      setMovieDetails(updatedData);
      setMovieApiStatus(apiStatusConstants.success);
    } else {
      setMovieApiStatus(apiStatusConstants.failure);
    }
  };

  const getCastDetails = async () => {
    setCastApiStatus(apiStatusConstants.inProgress);
    const apiUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`;
    const response = await fetch(apiUrl);
    if (response.ok) {
      const data = await response.json();
      const castDetails = data.cast.map((eachCast) => ({
        id: eachCast.id,
        characterName: eachCast.character,
        name: eachCast.original_name,
        profile: eachCast.profile_path,
      }));
      setCastDetails(castDetails);
      setCastApiStatus(apiStatusConstants.success);
    } else {
      setCastApiStatus(apiStatusConstants.failure);
    }
  };

  useEffect(() => {
    getBannerDetails();
    getCastDetails();
  }, []);

  const renderLoaderView = () => (
    <div className="container">
      <LoaderView />
    </div>
  );

  const renderMovieFailureView = () => (
    <div className="container">
      <FailureView />
      <button
        className="retry-btn"
        onClick={() => {
          getBannerDetails();
        }}
        type="button"
      >
        Retry
      </button>
    </div>
  );

  const renderCastFailureView = () => (
    <div className="container">
      <FailureView />
      <button
        className="retry-btn"
        onClick={() => {
          getCastDetails();
        }}
        type="button"
      >
        Retry
      </button>
    </div>
  );

  const renderMovieDetails = () => (
    <div className="movie-banner-section">
         <MovieBannerSection movieDetails={movieDetails} />
    </div>
  );

  const renderTopSection = () => {
    switch (movieApiStatus) {
      case apiStatusConstants.inProgress:
        return renderLoaderView();
      case apiStatusConstants.failure:
        return renderMovieFailureView();
      case apiStatusConstants.success:
        return renderMovieDetails();
      default:
        return null;
    }
  };

  const renderCastDetails = () => (
     <>
       <h1 className="cast-text">Cast</h1>
       <ul className="cast-container">{castDetails.map((eachCast) => <CastCard key={eachCast.id} castDetails={eachCast}/>)}</ul>
     </>
  )

  const renderBottomSection = () => {
    switch (castApiStatus) {
      case apiStatusConstants.inProgress:
        return renderLoaderView();
      case apiStatusConstants.failure:
        return renderCastFailureView();
      case apiStatusConstants.success:
        return renderCastDetails();
      default:
        return null;
    }
  };

  return (
    <div className="sections-container">
      {renderTopSection()}
      {renderBottomSection()}
    </div>
  );
};

export default SingleMovieDetailsPage;
