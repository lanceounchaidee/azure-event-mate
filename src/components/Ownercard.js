import React from 'react';
import './Card.css';

const Card = ({ id, vname, address, sport, status,  bookings , onClick }) => {
//   const venueStatus = status ? 'Open' : 'Closed'; // Determine the venue status
const venueStatus = status ? 'Closed' : 'Open';
  return (
    <div className='VenueCard' onClick={onClick}>
      <i className='bx bx-bookmark'></i>
      <div className="CardContent">
        <h3 className="VenueName">{vname}</h3>
        <div className="displayStack">
          <p className="VenueAddress">{address}</p>
          <p className="VenueSport">{sport}</p>
          <p className="VenueSport">Status: {venueStatus}</p> 
        </div>
        <div className="ReservationList">
          <h3>Bookings:</h3>
          <ul>
            {bookings.map(booking => (
              <li key={booking._id}>
                Date: {new Date(booking.date).toLocaleDateString()}, 
                Start Time: {booking.startTime}, 
                End Time: {booking.endTime}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Card;
