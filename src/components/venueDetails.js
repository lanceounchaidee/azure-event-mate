import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VenueDetails = () => {
  const venueParams = new URLSearchParams(window.location.search);
  const id = venueParams.get('venueid');
  // eslint-disable-next-line
  const navigate = useNavigate();

  const [venueData, setVenueData] = useState({});
  const API_URL = process.env.REACT_APP_API_URL; // Define API_URL here

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${API_URL}/venue-details`, { venueId: id });
        setVenueData(response.data);
      } catch (error) {
        console.error('Error fetching venue details:', error.message);
      }
    };

    fetchData();
  }, [id, API_URL]);

  useEffect(() => {
    if (venueData && venueData.v_name) {
      console.log(venueData);
    }
  }, [venueData]);

  return (
    <div>
      {/* JSX code for rendering the Venue Details component */}
    </div>
  );
};

export default VenueDetails;
