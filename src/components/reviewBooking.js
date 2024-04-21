import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate /*, Link, Form */ } from "react-router-dom"; // Commented out unused imports
import { Button } from "./Button";
import withAuth from './withAuth';

function ReviewBooking(){

    const bookingParams = new URLSearchParams(window.location.search);
    const userEmail = window.localStorage.username;
    const API_URL = process.env.REACT_APP_API_URL;
    const id = bookingParams.get('venueid');
    const startTime = bookingParams.get("startTime");
    const endTime = bookingParams.get("endTime");
    const date = bookingParams.get('date');
    const navigate = useNavigate();

    const [venueData, setVenueData] = useState({});
    const [venueName, setVenueName] = useState("");
    const [venueCost, setVenueCost] = useState("");

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.post(`${API_URL}/venue-details`, { venueId: id });
            setVenueData(response.data);
        } catch (error) {
            console.error('Error fetching venue details:', error.message);
        }
    }, [API_URL, id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        if (venueData) {
            setVenueName(venueData.v_name);
            setVenueCost(venueData.total_cost);
        }
    }, [venueData]);

    const finishReview = () => {
        navigate(`/payment?venueid=${id}&startTime=${startTime}&endTime=${endTime}&date=${date}`);
        //alert("Venue booked!");
    };

    return (
        <div className="reviewBookingBody">
            <div className="reviewBookingContainer">
                <h2>Review Booking</h2>
                <form className="reviewBookingForm">
                    <h3>Venue</h3>
                    <div className="venueName"> {venueName} </div>
                    <h3>Date and Time</h3>
                    <div className="venueDates"> {startTime} - {endTime} </div>
                    <div className="venueDates"> {date} </div>
                    <h3>Cost</h3>
                    <div className="venueCost"> ${venueCost} </div>
                    <h3>Email</h3>
                    <div className="userReviewEmail"> {userEmail} </div>
                    <br></br>
                    <Button className="bookRevervationBtn" onClick={finishReview}> Book It! </Button>
                </form>
            </div>
        </div>
    );
}

export default withAuth(ReviewBooking);
