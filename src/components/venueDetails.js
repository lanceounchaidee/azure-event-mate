import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from './Button';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import { useNavigate } from 'react-router-dom';
import SplitLayout from './SplitLayout';
import ReservationsCard from './ReservationsCard';
import basketball from "../assets/basketball.png";
import soccer from "../assets/soccer.png";
import football from "../assets/football.png";
import sports from "../assets/sports.png";

const VenueDetails = () => {
  const venueParams = new URLSearchParams(window.location.search);
  const id = venueParams.get('venueid');
  const navigate = useNavigate();

  const [venueData, setVenueData] = useState({});
  const [venueName, setVenueName] = useState("");
  const [venueAddress, setVenueAddress] = useState("");
  const [venueSport, setVenueSport] = useState("");
  const [venueUserId, setVenueUserId] = useState();
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
  const [venueReservationId, setVenueReservationId] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [search, setSearch] = useState('');
  const [closed, setClosed] = useState(false);
  const isAdmin = window.localStorage.getItem('role') === 'Admin';
  const isOrganizer = window.localStorage.getItem('role') === 'Organizer';
  const isUser = window.localStorage.getItem('role') === 'Attendee';
  const [disabled, setDisabled] = useState(false);
  const [image, setImage] = useState("");
  const [mapURL, setMapURL] = useState("");
  const API_URL = process.env.REACT_APP_API_URL;

  const fetchData = async () => {
    try {
      const response = await axios.post(`${API_URL}/venue-details`, { venueId: id });
      setVenueData(response.data);
    } catch (error) {
      console.error('Error fetching venue details:', error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    if (venueData && venueData.v_name) {
      console.log(venueData);
      setVenueName(venueData.v_name);
      setVenueSport(venueData.sport);
      setVenueAddress(venueData.address);
      setClosed(venueData.closed);
      setVenueUserId(venueData.user_id);
      const sportType = venueData.sport.toLowerCase();
      /*
      if (sportType === "basketball") {
        setImage(basketball);
      } else if (sportType === "soccer") {
        setImage(soccer);
      } else if (sportType === "football") {
        setImage(football);
      }
      else {
        setImage(sports);
      }
      */
    }
  }, [venueData]);

  /*
  const fetchTimes = async () => {
    try {
      const response = await axios.post('/venue-reservation-times', { venue_id: id });
      setVenueReservationTimes(response.data);
    } catch (error) {
      console.error('Error fetching venue reservation times:', error.message);
    }
  };
  */

  const fetchReservations = async () => {
    try {
      const response = await axios.post(`${API_URL}/reservation-details`, { venueId: id });
      setReservations(response.data.bookings);
    } catch (error) {
      console.error('Error fetching reservations:', error.message);
    }
  };

  useEffect(() => {
    //fetchTimes();
    fetchReservations();
  }, [id]);

  const handleReservationButtonClick = (reservation) => {
    setSelectedReservation((prevReservation) =>
      prevReservation === reservation ? null : reservation
    );
  };

  const handleBookButtonClick = () => {
    let userId = window.localStorage.getItem("userId");
    if(userId == null){
      alert("Please login to continue!");
      navigate(`/login`);
      window.location.reload();
    }else{
      navigate(`/review-booking?venueid=${id}&startTime=${selectedReservation.startTime}&endTime=${selectedReservation.endTime}&date=${selectedReservation.date}`)
    }
  }
  const handleSignout = () => {
    window.localStorage.clear();
    navigate("/");
    window.location.reload();
  };
  const handleBookmarkButtonClick = async () => {
      if(window.localStorage.getItem("userId") == null){
        alert("Please login to bookmark the venue!");
      }else{
        console.log(id);
        const response = await fetch(`${API_URL}/bookmark-venue/`,{
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                      // "Authorization": window.localStorage.getItem("token"),
                  },
                  body: JSON.stringify({ venueId: id}),
        });
        console.log(response);
        if(response.status === 200){
          alert("Successfully bookmarked your Venue");
        }else if(response.statusText == "Unauthorized"){
          alert("Session Time out. Please login to continue");
          handleSignout();
        }else{
          console.log(response)
          alert("Unable to bookmark your Venue at this time. Please try later!")
        }
    }

  }

  return (
    <div className='venueDetailsBody'>
      <SplitLayout>
        <div className='venueDetailsImage' id='theImage'>
          { image && <img src={image} alt="image" className="mapImg"></img> }
        </div>
          <div className='venueDetails'>
            <div className='imageURL'>
              <div className="bookmark">
                <Button onClick={()=>handleBookmarkButtonClick()}> Bookmark </Button>
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
                    disabled={disabled}
                  >
                    {reservation.startTime} - {reservation.endTime} {(reservation.date)}
                  </Button>
                ))}
              </div>
              }
            </div>
            {!closed && 
            <div className='detail'>
                <Button onClick={() => handleBookButtonClick()}> Book It! </Button>
            </div>}
          </div>
          {
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
          }
          
        
      </SplitLayout>
    </div>
  );
};

export default VenueDetails;