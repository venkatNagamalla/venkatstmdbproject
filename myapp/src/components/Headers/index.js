import {useState} from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import {NavLink} from 'react-router-dom'
import { FaXmark } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import './index.css'

const Headers = () => {

    
    const [isMenuClicked,setIsMenuClicked] = useState(false)
    
    const handleClick = ()=> setIsMenuClicked(prevState => !prevState)

    const sideNav = isMenuClicked ? 'nav-item-container side-nav-active' : 'nav-item-container'
    
    const renderHeading = () => (
        <div className="side-logo">
            <h1 className="logo-side-text">MovieDb</h1>
            <hr/>
        </div>
    )

    return (
        <nav className="nav-container">
             <h1 className="logo-text"><NavLink className="nav-link" to="/">MovieDb</NavLink></h1>
             <div className={sideNav}>
                {renderHeading()}
                <ul className="nav-links-container">
                    <NavLink onClick={handleClick} className="nav-link" to="/"><li className="link">Popular</li></NavLink>
                    <NavLink onClick={handleClick} className="nav-link" to="/top-rated"><li className="link">Top Rated</li></NavLink>
                    <NavLink onClick={handleClick} className="nav-link" to="/upcoming-movies"><li className="link">Upcoming</li></NavLink>
                    <NavLink onClick={handleClick} className="nav-link" to="/search"><li className="link">Search<span className="search-icon" ><IoSearch className="icon" /></span></li> </NavLink>
                </ul>
             </div>
             <button className="menu-btn" onClick={handleClick}>
                 {isMenuClicked ? <FaXmark/>: <GiHamburgerMenu/>}
             </button>
        </nav>
    )
}

export default Headers