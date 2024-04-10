
import {Routes,Route} from 'react-router-dom'

import Headers from './components/Headers'
import PopularMoviePage from './components/PopularMoviePage'
import TopRatedPage from './components/TopRatedPage'
import UpcomingMoviePage from './components/UpcomingMoviePage'
import SingleMovieDetailsPage from './components/SingleMovieDetailsPage'
import SearchPage from './components/SearchPage'
import './App.css'

const App = () => (
   <>
     <Headers/>
     <div className="bg-container">
        <Routes>
           <Route exact path="/" element={<PopularMoviePage/>}/>
           <Route exact path="/top-rated" element={<TopRatedPage/>}/>
           <Route exact path="/Upcoming-movies" element={<UpcomingMoviePage/>}/>
           <Route exact path="/movie/:id" element={<SingleMovieDetailsPage/>}/>
           <Route exact path="/search" element={<SearchPage/>}/>
        </Routes>
     </div>
   </>
)

export default App