import React, { useState } from 'react';
import axios from 'axios';
import { Button } from './Button';
const API_URL = process.env.REACT_APP_API_URL;


const AddVenueForm = ({ fetchData }) => {
  const [newVenue, setNewVenue] = useState({
    userId:window.localStorage.getItem("user_ID"),
    v_name: '',
    address: '',
    sport: '',
    total_capacity: '',
    total_cost: '',
    closed: false
  });

//   console.log(window.localStorage.getItem("user_ID"))
console.log(newVenue)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVenue(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/venue`, newVenue);
      alert('Venue added successfully');
      setNewVenue({
        userId:window.localStorage.getItem("user_ID"),
        v_name: '',
        address: '',
        sport: '',
        total_capacity: '',
        total_cost: '',
        closed: false
      });
    //   fetchData(); // Refresh venue list
    } catch (error) {
      console.error('Error:', error.message);
      alert('Failed to add venue');
    }
  };

  return (
    <div className="AddVenueForm">
      <h3>Add Venue</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Venue Name:
          <input type="text" name="v_name" value={newVenue.v_name} onChange={handleInputChange} required />
        </label>
        <label>
          Address:
          <input type="text" name="address" value={newVenue.address} onChange={handleInputChange} required />
        </label>
        <label>
          Sport:
          <input type="text" name="sport" value={newVenue.sport} onChange={handleInputChange} required />
        </label>
        <label>
          Total Capacity:
          <input type="number" name="total_capacity" value={newVenue.total_capacity} onChange={handleInputChange} required />
        </label>
        <label>
          Total Cost:
          <input type="number" name="total_cost" value={newVenue.total_cost} onChange={handleInputChange} required />
        </label>
        <label>
          Status:
          <input type="text" name="closed" value={newVenue.closed} onChange={handleInputChange} required />
        </label>
        
        <Button type="submit">Add Venue</Button>
      </form>
    </div>
  );
};

export default AddVenueForm;