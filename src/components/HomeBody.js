import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import bgimg from "../assets/pic5.jpg";
import { Button } from "./Button";
import './homeBody.css';
import ReservationsCard from "./ReservationsCard";
import axios from 'axios';
// eslint-disable-next-line
import UserCard from "./UserCard";

const HomeBody = () => {
    const [reservations, setReservations] = useState([]);
    const userId = window.localStorage.getItem("userId");
    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.post(`${API_URL}/user-reservation-details`, { userId: window.localStorage.getItem('userId') });
                console.log(response.data);
                setReservations(response.data);
            } catch (error) {
                console.error('Error fetching reservations:', error.message);
            }
        };

        fetchReservations();

    }, [userId, API_URL]); // Include dependencies userId and API_URL here

    return (
        <div className="homeContainer">
            <div className="bgImage" style={{ backgroundImage: `url(${bgimg})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '100%', position: 'absolute', zIndex: '-1' }} />
            <div className="theHome">
                <div className="homeText">
                    <h2>Book with EventMate</h2>
                    <p>EventMate is the perfect tool to help you plan your sporting events</p>
                    <Link to="/venues">
                        <Button className='buttons' buttonStyle="buttonOutline" buttonSize="buttonLarge">
                            RESERVE NOW
                        </Button>
                    </Link>
                </div>

                {userId != null &&<div className="profileContainer">
                  <UserCard/>
                </div>}
            </div>
        </div>
    )
}

export default HomeBody;
