// // VenuesTable.js
// import React, { useEffect, useState } from 'react';
// import OwnerCard from './Ownercard';
// import { Link, Route, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Button } from './Button';
// import withAuth from './withAuth';
// import bgimg from "../assets/backgroundImage.jpg";
// // import './Ownerview.css';

// const OwnerView = () => {
//   const [venues, setVenues] = useState([]);
//   const navigate = useNavigate();
//   const isAdmin = window.localStorage.getItem('role') === 'Admin';
//   const isOrganizer = window.localStorage.getItem('role') === 'Organizer';
//   const API_URL = process.env.REACT_APP_API_URL;

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(`${API_URL}/venue-list`);
//       setVenues(response.data);
//     } catch (error) {
//       console.error('Error:', error.message);
//     }
//   };

//   const handleCardClick = (venueId) => {
//     console.log('Clicked Card with ID:', venueId);
//     navigate(`/venue/venue-details?venueid=${venueId}`);
//   };

//   const handleAddVenueButtonClick = () => {
//     navigate('/venuecreationform');
//     window.location.reload();
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const [search, setSearch] = useState('');
//   console.log(search);

//   if (!isAdmin && !isOrganizer) {
//     return (<p>NOT ALLOWED</p>);
//   }

//   return (
//     <div className='venueViewHost'>
//       <img className="bgImage" src={bgimg}/>
//       <div className='Search'>
//         <form className='searchForm'>
//           <input className="searchInput" placeholder="Search Venues" onChange={(e) => setSearch(e.target.value)}/>
//           <div className="ChildRight2">
//             <Button className="changePasswordButton" buttonStyle='button' onClick={handleAddVenueButtonClick}> Add Venue/Activity </Button> 
//           </div>
//         </form>
//       </div>
//       <div className='OwnerViewTitle'>
//         <h1>Venue Owner View</h1>
//       </div>
//       <div className='ChildContainer'>
//         <div className="ChildLeft">
//           <h3>Venues:</h3>
//           {venues.filter((item) => {
//             return search.toLowerCase() === '' ? item 
//               : 
//               (item.v_name.toLowerCase().includes(search)
//               ||
//               item.sport.toLowerCase().includes(search)
//               ||
//               item.address.toLowerCase().includes(search));
//           })
//           .map((venue) => (
//             <OwnerCard
//               key={venue._id}
//               id={venue._id}
//               vname={venue.v_name}
//               address={venue.address}
//               sport={venue.sport}
//               status={venue.closed}
//               onClick={() => handleCardClick(venue._id)}
//               bookings={venue.bookings} // Pass the bookings directly from the venue object
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default withAuth(OwnerView);


// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import withAuth from './withAuth';
// import bgimg from "../assets/backgroundImage.jpg";
// // import './Ownerview.css';
// import OwnerCard from './Ownercard';
// import { Button } from "./Button";


// const OwnerView = () => {
//   const [venues, setVenues] = useState([]);
//   const [newVenue, setNewVenue] = useState({
//     v_name: '',
//     address: '',
//     sport: '',
//     total_capacity: '',
//     total_cost: '',
//     closed: false
//   });
//   const navigate = useNavigate();
//   const isAdmin = window.localStorage.getItem('role') === 'Admin';
//   const isOrganizer = window.localStorage.getItem('role') === 'Organizer';
//   const API_URL = process.env.REACT_APP_API_URL;

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(`${API_URL}/venue-list`);
//       setVenues(response.data);
//     } catch (error) {
//       console.error('Error:', error.message);
//     }
//   };

//   const handleCardClick = (venueId) => {
//     console.log('Clicked Card with ID:', venueId);
//     navigate(`/venue/venue-details?venueid=${venueId}`);
//   };

//   const handleAddVenueButtonClick = () => {
//     navigate('/venuecreationform');
//     window.location.reload();
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewVenue(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(`${API_URL}/add-activity`, newVenue);
//       alert('Venue added successfully');
//       setNewVenue({
//         v_name: '',
//         address: '',
//         sport: '',
//         total_capacity: '',
//         total_cost: '',
//         closed: false
//       });
//       fetchData(); // Refresh venue list
//     } catch (error) {
//       console.error('Error:', error.message);
//       alert('Failed to add venue');
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const [search, setSearch] = useState('');

//   if (!isAdmin && !isOrganizer) {
//     return (<p>NOT ALLOWED</p>);
//   }

//   return (
//     <div className='venueViewHost'>
//       <img className="bgImage" src={bgimg}/>
//       <div className='Search'>
//         <form className='searchForm'>
//           <input className="searchInput" placeholder="Search Venues" onChange={(e) => setSearch(e.target.value)}/>
//           <div className="ChildRight2">
//             <Button buttonStyle="button" className="changePasswordButton" onClick={handleAddVenueButtonClick}> Add Venue/Activity </Button> 
//           </div>
//         </form>
//       </div>
//       <div className='OwnerViewTitle'>
//         <h1>Venue Owner View</h1>
//       </div>
//       <div className='ChildContainer'>
//         <div className="ChildLeft">
//           <h3>Venues:</h3>
//           {venues.filter((item) => {
//             return search.toLowerCase() === '' ? item 
//               : 
//               (item.v_name.toLowerCase().includes(search)
//               ||
//               item.sport.toLowerCase().includes(search)
//               ||
//               item.address.toLowerCase().includes(search));
//           })
//           .map((venue) => (
//             <OwnerCard
//               key={venue._id}
//               id={venue._id}
//               vname={venue.v_name}
//               address={venue.address}
//               sport={venue.sport}
//               status={venue.closed}
//               onClick={() => handleCardClick(venue._id)}
//               bookings={venue.bookings} // Pass the bookings directly from the venue object
//             />
//           ))}
//         </div>
//       </div>

//       {/* Form for adding venue */}
//       <div className="AddVenueForm">
//         <h3>Add Venue</h3>
//         <form onSubmit={handleSubmit}>
//           <label>
//             Venue Name:
//             <input type="text" name="v_name" value={newVenue.v_name} onChange={handleInputChange} required />
//           </label>
//           <label>
//             Address:
//             <input type="text" name="address" value={newVenue.address} onChange={handleInputChange} required />
//           </label>
//           <label>
//             Sport:
//             <input type="text" name="sport" value={newVenue.sport} onChange={handleInputChange} required />
//           </label>
//           <label>
//             Total Capacity:
//             <input type="number" name="total_capacity" value={newVenue.total_capacity} onChange={handleInputChange} required />
//           </label>
//           <label>
//             Total Cost:
//             <input type="number" name="total_cost" value={newVenue.total_cost} onChange={handleInputChange} required />
//           </label>
//           <button type="submit">Add Venue</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default withAuth(OwnerView);

import React, { useEffect, useState } from 'react';
import { Link,Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import withAuth from './withAuth';
import bgimg from "../assets/backgroundImage.jpg";
import AddVenueForm from './AddVenueForm'; // Import the AddVenueForm component

import OwnerCard from './Ownercard';
import { Button } from "./Button";

const OwnerView = () => {
  const [venues, setVenues] = useState([]);
  const navigate = useNavigate();
  const isAdmin = window.localStorage.getItem('role') === 'Admin';
  const isOrganizer = window.localStorage.getItem('role') === 'Organizer';
  const API_URL = process.env.REACT_APP_API_URL;

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/venue-list`);
      setVenues(response.data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleCardClick = (venueId) => {
    console.log('Clicked Card with ID:', venueId);
    navigate(`/venue/venue-details?venueid=${venueId}`);
  };

  const gotoAddVenue = () => navigate("/AddVenueForm");
  const handleAddVenueButtonClick = () => {
    navigate('/AddVenueForm'); // Navigate to the Add Venue page
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [search, setSearch] = useState('');

  if (!isAdmin && !isOrganizer) {
    return (<p>NOT ALLOWED</p>);
  }

  return (
    <div className='venueViewHost'>
      <img className="bgImage" src={bgimg}/>
      <div className='Search'>
        <form className='searchForm'>
          <input className="searchInput" placeholder="Search Venues" onChange={(e) => setSearch(e.target.value)}/>
          <div className="ChildRight2">
            <Button className="changePasswordButton" onClick={gotoAddVenue}> Add Venue/Activity </Button> 
          </div>
        </form>
      </div>
      <div className='OwnerViewTitle'>
        <h1>Venue Owner View</h1>
      </div>
      <div className='ChildContainer'>
        <div className="ChildLeft">
          <h3>Venues:</h3>
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

      {/* Add Venue form */}
      {/* <Route path="/add-venue">
        <AddVenueForm fetchData={fetchData} />
      </Route> */}
    </div>
  );
};

export default withAuth(OwnerView);

