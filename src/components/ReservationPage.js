import React, { useState, useEffect } from "react";
import ReservationsCard from "./ReservationsCard";
import axios from 'axios';
import './ReservationPage.css'; // Import the CSS file

const Reservations = () => {
    const [reservations, setReservations] = useState([]);
    const userId = window.localStorage.getItem("userId");
    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.post(`${API_URL}/user-reservation-details`, { userId: window.localStorage.getItem('userId') });
                setReservations(response.data);
            } catch (error) {
                console.error('Error fetching reservations:', error.message);
            }
        };

        if (userId) {
            fetchReservations();
        }
    }, [userId, API_URL]); // Include dependencies userId and API_URL here

    return (
    <div className="ReservationBody">
        <div className="ReservationViewTitle">
            <h1>Reservations:</h1>
        </div>
        <div className="ReservationsGrid"> {/* Apply the CSS class to the container */}
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
                    className="ReservationsCard" // Apply the CSS class to each card
                />
            ))}
        </div>
    </div> 
    );
};

export default Reservations;
