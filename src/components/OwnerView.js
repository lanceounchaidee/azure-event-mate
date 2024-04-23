import React, { useEffect, useState } from 'react';
import axios from 'axios';
import withAuth from './withAuth';
import bgimg from "../assets/backgroundImage.jpg";
import OwnerCard from './Ownercard';
import { useNavigate } from 'react-router-dom';
import './OwnerView.css';


const OwnerView = () => {
  const [venues, setVenues] = useState([]);
  const navigate = useNavigate();
  const isAdmin = window.localStorage.getItem('role') === 'Admin';
  const isOrganizer = window.localStorage.getItem('role') === 'Organizer';
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/venue-list`);
        setVenues(response.data);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchData();
  }, [API_URL]); // Added API_URL as a dependency

  const [search, setSearch] = useState('');

  if (!isAdmin && !isOrganizer) {
    return (<p>NOT ALLOWED</p>);
  }

  const handleCardClick = (venueId) => {
    console.log('Clicked Card with ID:', venueId);
    navigate(`/venue/venue-details?venueid=${venueId}`);
  };

  return (
    <div className='venueViewHost'>
      <img className="bgImage" src={bgimg} alt="Background"/>
      <div className='Search'>
        <form className='searchForm'>
          <input className="searchInput" placeholder="Search Venues" onChange={(e) => setSearch(e.target.value)}/>
        </form>
      </div>
      <div className='OwnerViewTitle'>
        <h1>Venue Owner View</h1>
      </div>
      <div className='ChildContainer'>
          <div className="venueGrid">
            {venues.filter((item) => {
              return search.toLowerCase() === '' ? item 
                : 
                (item.v_name.toLowerCase().includes(search)
                ||
                item.sport.toLowerCase().includes(search)
                ||
                item.address.toLowerCase().includes(search));
            })
            .map((venue) => (
              <OwnerCard
                key={venue._id}
                id={venue._id}
                vname={venue.v_name}
                address={venue.address}
                sport={venue.sport}
                status={venue.closed}
                onClick={() => handleCardClick(venue._id)}
                bookings={venue.bookings} // Pass the bookings directly from the venue object
              />
            ))}
          </div>
        </div>
      </div>
  );
};

export default withAuth(OwnerView);
