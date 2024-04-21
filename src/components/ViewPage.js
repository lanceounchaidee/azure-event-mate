import React, { useEffect, useState } from 'react';
import Card from './Card';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function VenuesTable() {
  const [venues, setVenues] = useState([]);
  const [isBookmarkChecked, setIsBookmarkChecked] = useState(false);
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  const handleCardClick = (venueId) => {
    console.log('Clicked Card with ID:', venueId);
    navigate(`/venue/venue-details?venueid=${venueId}`);
  };

  const handleBookmarkChange = (e) => {
    setIsBookmarkChecked(e.target.checked);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/venue-list`);
        console.log(response.data);
        setVenues(response.data);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchData();
  }, [API_URL]);

  const [search, setSearch] = useState('');

  return (
    <div className='venueViewHost'>
      <div className='ViewPageBody'>
        <form className='searchForm'>
          <input className="searchInput" placeholder="Search Venues or Activities" onChange={(e) => setSearch(e.target.value)}/>
          <div className='bookmarkCheckbox'>
            <label>
              Bookmarked: {" "} 
              <input className="checkbox" type="checkbox" checked={isBookmarkChecked} onChange={handleBookmarkChange} />
            </label>
          </div>
        </form>
        <div className='theVenues'>
          {venues.filter((item) => {
            const matchesSearch = (
              item.v_name.toLowerCase().includes(search) ||
              item.sport.toLowerCase().includes(search) ||
              item.address.toLowerCase().includes(search)
            );

            const matchesBookmark = (
              !isBookmarkChecked ||
              (isBookmarkChecked && item.bookmark === 1)
            );

            return matchesSearch && matchesBookmark;
          })
          .map((venue) => (
            <Card
              key={venue._id}
              id={venue._id}
              vname={venue.v_name}
              address={venue.address}
              sport={venue.sport}
              bookmark = {venue.bookmarks?.length}
              onClick={() => handleCardClick(venue._id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default VenuesTable;
