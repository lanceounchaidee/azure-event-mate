import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import img from "../assets/HomeImage.jpg";
import bgimg from "../assets/backgroundImage.jpg";
import { Button } from "./Button";
import axios from 'axios';
import ReservationsCard from "./ReservationsCard";

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
    }, [API_URL, userId]); 
    

    return (
        <div className="homeContainer">
            <img className="bgImage" src={bgimg} alt="Background" />
            <img className="homeImg" src={img} alt="Home" style={{ maxWidth: "50em" }} />
            <div className="theHome">
                <div className="homeBodyButtons">
                    <Link to="/venues">
                        <Button className='buttons' buttonStyle="buttonOutline" buttonSize="buttonLarge">
                            RESERVE NOW
                        </Button>
                    </Link>
                </div>

                {userId && (
                    <div className="ChildLeft">
                        <h3>Reservations:</h3>
                        {reservations.length > 0 && (
                            <div className='ReservationSearch'>
                                <input className="searchInput" placeholder="Search Reservations" />
                            </div>
                        )}
                        {reservations.map((reservation) => (
                            <ReservationsCard
                                key={reservation._id}
                                id={reservation._id}
                                vname={reservation.v_name}
                                start_datetime={(reservation.date && reservation.startTime) ? `${reservation.date.split("T")[0]} ${reservation.startTime}` : ''}
                                end_datetime={(reservation.date && reservation.endTime) ? `${reservation.date.split("T")[0]} ${reservation.endTime}` : ''}
                                value_paid={'Paid'}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default HomeBody;
