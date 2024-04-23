import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from './Button';
import { useNavigate } from 'react-router-dom';
import SplitLayout from './SplitLayout';
import ReservationsCard from './ReservationsCard';

const VenueDetails = () => {
  const venueParams = new URLSearchParams(window.location.search);
  const id = venueParams.get('venueid');
  const navigate = useNavigate();
  // eslint-disable-next-line
  const [venueReservationTimes, setVenueReservationTimes] = useState([{
    startTime: "1:00 PM",
    endTime: "3:00 PM",
    date: "04-23-2024"
  },{
    startTime: "11:00 AM",
    endTime: "12:30 PM",
    date: "04-22-2024"
  },{
    startTime: "9:00 AM",
    endTime: "10:30 AM",
    date: "04-21-2024"
  },{
    startTime: "1:00 PM",
    endTime: "3:00 PM",
    date: "04-24-2024"
  },]);
  // eslint-disable-next-line
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [venueData, setVenueData] = useState({});
  const [venueName, setVenueName] = useState("");
  const [venueAddress, setVenueAddress] = useState("");
  const [venueSport, setVenueSport] = useState("");
  const [reservations, setReservations] = useState([]);
  const [closed, setClosed] = useState("");
  // eslint-disable-next-line
  const [search, setSearch] = useState(""); // Define search state
  // eslint-disable-next-line
  const [disabled, setDisabled] = useState(false); // Define disabled state
  const API_URL = process.env.REACT_APP_API_URL;

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
      setVenueName(venueData.v_name);
      setVenueSport(venueData.sport);
      setVenueAddress(venueData.address);
      setClosed(venueData.closed);
    }
  }, [venueData]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.post(`${API_URL}/reservation-details`, { venueId: id });
        setReservations(response.data.bookings);
      } catch (error) {
        console.error('Error fetching reservations:', error.message);
      }
    };

    fetchReservations();
  }, [id, API_URL]);

  const handleBookButtonClick = () => {
    let userId = window.localStorage.getItem("userId");
    if (userId === null) {
      alert("Please login to continue!");
      navigate(`/login`);
      window.location.reload();
    } else {
      navigate(`/review-booking?venueid=${id}&startTime=${selectedReservation.startTime}&endTime=${selectedReservation.endTime}&date=${selectedReservation.date}`)
    }
  };

  const handleSignout = () => {
    window.localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  const handleBookmarkButtonClick = async () => {
    if (window.localStorage.getItem("userId") === null) {
      alert("Please login to bookmark the venue!");
    } else {
      console.log(id);
      const response = await fetch(`${API_URL}/bookmark-venue/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ venueId: id }),
      });
      console.log(response);
      if (response.status === 200) {
        alert("Successfully bookmarked your Venue");
      } else if (response.statusText === "Unauthorized") {
        alert("Session Time out. Please login to continue");
        handleSignout();
      } else {
        console.log(response)
        alert("Unable to bookmark your Venue at this time. Please try later!")
      }
    }
  };

  // Define handleReservationButtonClick function
  const handleReservationButtonClick = (reservation) => {
    setSelectedReservation(reservation);
  };

  return (
    <div className='venueDetailsBody'>
    <SplitLayout>
      <div className='venueDetailsImage' id='theImage'>
      </div>
        <div className='venueDetails'>
          <div className='imageURL'>
            <div className="bookmark">
              <Button onClick={handleBookmarkButtonClick}> Bookmark </Button>
            </div>
            
            <h2 className='venueDetailsTitle'>{venueName}</h2>
          </div>
          <div className="openCloseDetail">
            {closed &&
              <p className="closeDetails">Closed</p>
            }
            {!closed &&
              <p className="openDetails">Open</p>
            }
          </div>
          <div className='small-details'>
            
            <div className='detail'>Sport: {venueSport}</div>
            <div className='detail'>Address: {venueAddress}</div>
          </div>
          
          <div className='timeslots'>
            <h4>Time Slots</h4>
            { !closed && 
            <div>
              {venueReservationTimes.map((reservation) => (
                <Button
                  key={reservation.startTime}
                  buttonStyle={selectedReservation === reservation ? 'buttonPrimary' : 'buttonOutline'}
                  onClick={() => handleReservationButtonClick(reservation)}
                  disabled={disabled} // Assuming disabled is defined elsewhere
                >
                  {reservation.startTime} - {reservation.endTime} {(reservation.date)}
                </Button>
              ))}
            </div>
            }
          </div>
          {!closed && 
          <div className='detail'>
              <Button onClick={handleBookButtonClick}> Book It! </Button>
          </div>}
        </div>
        <div className="ChildLeft">
          <h3>Reservations:</h3>
          <div className='ReservationSearch'>
            <input className="searchInput" placeholder="Search Reservations" onChange={(e) => setSearch(e.target.value)}/>
          </div>
          {reservations.map((reservation) => (
              <ReservationsCard
                key={reservation._id}
                id={reservation._id}
                vname={venueName}
                start_datetime={(reservation.date.split("T")[0] + " " + reservation.startTime)}
                end_datetime={reservation.endTime}
                value_paid={'Paid'}
              />
          ))}
        </div>
      
    </SplitLayout>
  </div>
  );
};
  
export default VenueDetails;
