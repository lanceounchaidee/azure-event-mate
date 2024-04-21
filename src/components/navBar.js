import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from "../assets/logo.png";
import { Button } from "./Button";
import './navBar.css';

function NavBar() {
    const [loggedIn, setLoggedIn] = useState(false);
    // const [username, setUsername] = useState(''); // Commented out unused state variable
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Check if user is logged in using local storage
        const storedUsername = window.localStorage.getItem('username');
        if (storedUsername) {
            // setUsername(storedUsername); // Commented out unused state variable
            setLoggedIn(true);
        } else {
            // setUsername(''); // Commented out unused state variable
            setLoggedIn(false);
        }
    }, []);
    

    useEffect(() => {
        // Extract username from query parameter
        const searchParams = new URLSearchParams(location.search);
        const usernameParam = searchParams.get('username');
        if (usernameParam) {
            // setUsername(usernameParam); // Commented out unused state variable
            setLoggedIn(true); // Update loggedIn state when username is present in URL
        }
    }, [location]);

    const handleLogout = () => {
        // Clear local storage
        window.localStorage.removeItem('username');
        // Update state
        // setUsername(''); // Commented out unused state variable
        setLoggedIn(false);
        // Redirect to login page
        navigate("/login");
    };
    

    return (
        <nav className="navBar">
            <div className="navBarContainer">
                <Link to='/' className="navBarLogo">
                    <img src={logo} width={146.85} height={55} alt='Logo' />
                </Link>
                <ul className="navMenu">
                    <li className="navItem">
                        <Link to="/" className="navLinks">
                            Home
                        </Link>
                    </li>
                    <li className="navItem">
                        <Link to="/venues" className="navLinks">
                            Venues/Activities
                        </Link>
                    </li>
                    <li className="navItem">
                        <Link to="/player-page" className="navLinks">
                            Players
                        </Link>
                    </li>
                </ul>
                <ul className="userPage">
                {loggedIn ? (
    <li>
        <Button buttonStyle='button' onClick={handleLogout}>Logout</Button>
    </li>
) : (
    <li>
        <Link to="/login">
            <Button buttonStyle='button'>Login</Button>
        </Link>
    </li>
)}

                </ul>
            </div>
        </nav>
    );
}

export default NavBar;
