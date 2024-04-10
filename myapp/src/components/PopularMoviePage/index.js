import { useState, useEffect } from "react";
import LoaderView from "../LoaderView";
import FailureView from "../FailureView";
import MovieCard from "../MovieCard";
import "./index.css";

const apiKey = "e2ab8a4105df7b69787b3a32979db5f9";

const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  failure: "FAILURE",
  success: "SUCCESS",
};

const PopularMoviePage = () => {
  const [page,setPage] = useState(1)
  const [totalPages,setTotalPages] = useState()
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [popularMoviesList, setPopularMoviesList] = useState([]);

  const format = (obj) => ({
    id: obj.id,
    title: obj.title,
    rating: obj.vote_average,
    poster: obj.poster_path,
  });


  const getMovieDetails = async () => {
    setApiStatus(apiStatusConstants.inProgress);
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`;
    const response = await fetch(apiUrl);
    if (response.ok) {
      const data = await response.json();
      const totalPagesCount = data.total_pages
      const updatedData = data.results.map((eachMovie) => format(eachMovie));
      setApiStatus(apiStatusConstants.success);
      setTotalPages(totalPagesCount)
      setPopularMoviesList(updatedData)
    } else {
      setApiStatus(apiStatusConstants.failure);
    }
  };

  useEffect(() => {
    getMovieDetails();
  }, [page]);

  const renderFailureView = () => (
    <div className="failure-container">
      <FailureView />
      
      <button onClick={()=>{getMovieDetails()}} className="retry-btn">Retry!</button>
    </div>
  );

  const renderSuccessView =()=>(
    <ul className="movies-card-container">{popularMoviesList.map((eachMovie) => <MovieCard key={eachMovie.id} movieDetails={eachMovie} />)}</ul>
  )

  const onPageDecrement = () => {
    if (page > 1){
        setPage(prevPage => prevPage - 1 )
    }
  }

  const onPageIncrement = () => {
     if (page < totalPages){
        setPage(prevPage => prevPage + 1 )
     }
  }

  const renderLoaderView = () => (
    <div className="loader-container">
        <LoaderView/>
    </div>
  )

  const renderViews = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return renderLoaderView();
      case apiStatusConstants.failure:
        return renderFailureView();
      case apiStatusConstants.success:
        return renderSuccessView()
      default:
        return null;
    }
  };

  const renderPage = () => <div className="pagination-container">
     <div className="page-btn-container">
     <button onClick={onPageDecrement} className="arrow-btns">Prev</button> <p className="page-count">{page}</p> <button onClick={onPageIncrement} className="arrow-btns">Next</button>
     </div>
        <p className="total-pages-count">{totalPages} <span className="total-pages-text"> Pages</span> </p>
  </div>

  return <>
  {renderViews()}
  <hr/>
  {renderPage()}
  </>;
};

export default PopularMoviePage;
